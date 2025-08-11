'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { createClient } from '@/lib/supabase/client';
import { Roadmap, Concept, ConceptDependency, UserProgress } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import { ArrowLeft, BookOpen, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import ConceptModal from './ConceptModal';
import Link from 'next/link';

interface RoadmapClientProps {
  roadmap: Roadmap;
  concepts: Concept[];
  dependencies: ConceptDependency[];
  userProgress: UserProgress[];
  user: User;
}

interface ConceptNode extends Node {
  data: {
    concept: Concept;
    isCompleted: boolean;
    isUnlocked: boolean;
  };
}

export default function RoadmapClient({
  roadmap,
  concepts,
  dependencies,
  userProgress,
  user,
}: RoadmapClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  // Create a set of completed concept IDs for quick lookup
  const completedConceptIds = useMemo(
    () => new Set(userProgress.map((progress) => progress.concept_id)),
    [userProgress]
  );

  const handleBackToDashboard = useCallback(() => {
    setIsNavigatingBack(true);
    router.push('/dashboard');
  }, [router]);

  // Function to check if a concept is unlocked (strict linear progression)
  const isConceptUnlocked = useCallback(
    (conceptId: string): boolean => {
      // Sort concepts by creation order to establish a linear sequence
      const orderedConcepts = [...concepts].sort((a, b) => 
        new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
      );
      
      // Find the index of the current concept in the ordered list
      const conceptIndex = orderedConcepts.findIndex(c => c.id === conceptId);
      
      if (conceptIndex === -1) return false;
      
      // First concept is always unlocked
      if (conceptIndex === 0) return true;
      
      // Check if ALL previous concepts are completed
      for (let i = 0; i < conceptIndex; i++) {
        if (!completedConceptIds.has(orderedConcepts[i].id)) {
          return false;
        }
      }
      
      return true;
    },
    [concepts, completedConceptIds]
  );

  // Create a linear layout for sequential progression
  const getNodePosition = useCallback((conceptId: string, allConcepts: Concept[]) => {
    // Sort concepts by creation order to establish the sequence
    const orderedConcepts = [...allConcepts].sort((a, b) => 
      new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
    );
    
    const conceptIndex = orderedConcepts.findIndex(c => c.id === conceptId);
    
    // Create a winding path layout
    const nodeWidth = 400;
    const nodeHeight = 200;
    const nodesPerRow = 3; // Number of nodes per row
    
    const row = Math.floor(conceptIndex / nodesPerRow);
    const col = conceptIndex % nodesPerRow;
    
    // Alternate direction for each row (snake pattern)
    const actualCol = row % 2 === 0 ? col : (nodesPerRow - 1 - col);
    
    return {
      x: actualCol * nodeWidth + 200,
      y: row * nodeHeight + 100
    };
  }, []);

  // Create nodes from concepts
  const initialNodes: ConceptNode[] = useMemo(() => {
    return concepts.map((concept) => {
      const isCompleted = completedConceptIds.has(concept.id);
      const isUnlocked = isConceptUnlocked(concept.id);
      
      // Use linear layout positioning
      const { x, y } = getNodePosition(concept.id, concepts);

      return {
        id: concept.id,
        type: 'default',
        position: { x, y },
        data: {
          concept,
          isCompleted,
          isUnlocked,
          label: (
            <div
              className={`flex items-start space-x-4 p-6 min-w-0 transition-all duration-200 ${
                isCompleted
                  ? 'bg-yellow-50 border-yellow-400 shadow-md'
                  : isUnlocked
                  ? 'bg-white border-yellow-200 shadow'
                  : 'bg-gray-100 border-gray-400 opacity-80'
              } rounded-2xl border-2 w-80 min-h-[110px]`}
              style={{ boxShadow: isCompleted || isUnlocked ? '0 4px 24px 0 rgba(0,0,0,0.04)' : undefined }}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
              ) : isUnlocked ? (
                <BookOpen className="h-8 w-8 text-yellow-400 flex-shrink-0 mt-1" />
              ) : (
                <Lock className="h-8 w-8 text-gray-400 flex-shrink-0 mt-1" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-bold text-lg text-gray-900 leading-tight mb-2">{concept.title}</div>
                {concept.short_description && (
                  <div className="text-sm text-gray-500 leading-relaxed">
                    {concept.short_description}
                  </div>
                )}
              </div>
            </div>
          ),
        },
        style: {
          border: 'none',
          borderRadius: 22,
          background: 'transparent',
          boxShadow: 'none',
          cursor: isUnlocked ? 'pointer' : 'not-allowed',
          opacity: isUnlocked ? 1 : 0.7,
        },
      };
    });
  }, [concepts, completedConceptIds, isConceptUnlocked, getNodePosition]);

  // Create edges for linear progression (each concept connects to the next)
  const initialEdges: Edge[] = useMemo(() => {
    // Sort concepts by creation order
    const orderedConcepts = [...concepts].sort((a, b) => 
      new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
    );
    
    const edges: Edge[] = [];
    
    // Connect each concept to the next one in sequence
    for (let i = 0; i < orderedConcepts.length - 1; i++) {
      const currentConcept = orderedConcepts[i];
      const nextConcept = orderedConcepts[i + 1];
      
      edges.push({
        id: `${currentConcept.id}-${nextConcept.id}`,
        source: currentConcept.id,
        target: nextConcept.id,
        type: 'smoothstep',
        animated: false,
        style: {
          stroke: '#fde68a', // yellow-200
          strokeWidth: 3,
          borderRadius: 8,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#facc15', // yellow-400
          width: 14,
          height: 14,
        },
      });
    }
    
    return edges;
  }, [concepts]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: ConceptNode) => {
      if (node.data.isUnlocked) {
        setSelectedConcept(node.data.concept);
        setIsModalOpen(true);
      }
    },
    []
  );

  const handleConceptCompletion = async (conceptId: string, score: number) => {
    // Insert progress record
    const { error } = await supabase.from('user_progress').insert([
      {
        user_id: user.id,
        concept_id: conceptId,
        quiz_score: score,
      },
    ]);

    if (error) {
      console.error('Error saving progress:', error);
      return;
    }

    // Update local state by refreshing the page
    // In a real app, you might want to update state more elegantly
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            prefetch={true}
            onClick={() => setIsNavigatingBack(true)}
            className="group flex items-center space-x-3 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {isNavigatingBack ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            )}
            <span>{isNavigatingBack ? 'Going back...' : 'Dashboard'}</span>
          </Link>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{roadmap.title}</h1>
              {roadmap.description && (
                <p className="text-sm text-gray-600 mt-1 max-w-md leading-relaxed">{roadmap.description}</p>
              )}
            </div>
          </div>

          {/* Empty div to balance the layout */}
          <div className="w-32"></div>
        </div>
      </header>

      {/* Roadmap Flow */}
      <div className="flex-1 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          panOnScroll
          zoomOnScroll
        >
          <Controls style={{ background: 'rgba(255,255,255,0.8)', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }} />
          <Background
            variant={BackgroundVariant.Dots}
            gap={18}
            size={1.5}
            color="#fde68a" // yellow-200
          />
        </ReactFlow>
      </div>

      {/* Concept Modal */}
      {selectedConcept && (
        <ConceptModal
          concept={selectedConcept}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedConcept(null);
          }}
          onComplete={handleConceptCompletion}
          isCompleted={completedConceptIds.has(selectedConcept.id)}
        />
      )}
    </div>
  );
}
