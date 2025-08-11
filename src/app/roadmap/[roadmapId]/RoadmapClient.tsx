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
import { ArrowLeft, BookOpen, Lock, CheckCircle2 } from 'lucide-react';
import ConceptModal from './ConceptModal';

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

  // Create a set of completed concept IDs for quick lookup
  const completedConceptIds = useMemo(
    () => new Set(userProgress.map((progress) => progress.concept_id)),
    [userProgress]
  );

  // Function to check if a concept is unlocked
  const isConceptUnlocked = useCallback(
    (conceptId: string): boolean => {
      // Check if this concept has any prerequisites
      const prerequisites = dependencies.filter((dep) => dep.concept_id === conceptId);
      
      if (prerequisites.length === 0) {
        // No prerequisites, so it's unlocked
        return true;
      }

      // Check if all prerequisites are completed
      return prerequisites.every((prereq) => completedConceptIds.has(prereq.prerequisite_id));
    },
    [dependencies, completedConceptIds]
  );

  // Create a tree-like layout based on dependencies
  const getNodePosition = useCallback((conceptId: string, allConcepts: Concept[], dependencies: ConceptDependency[]) => {
    // Build dependency graph
    const dependencyMap = new Map<string, string[]>();
    const reverseDependencyMap = new Map<string, string[]>();
    
    // Initialize maps
    allConcepts.forEach(concept => {
      dependencyMap.set(concept.id, []);
      reverseDependencyMap.set(concept.id, []);
    });
    
    // Populate dependency maps
    dependencies.forEach(dep => {
      dependencyMap.get(dep.concept_id)?.push(dep.prerequisite_id);
      reverseDependencyMap.get(dep.prerequisite_id)?.push(dep.concept_id);
    });
    
    // Calculate levels (depth from root nodes)
    const levels = new Map<string, number>();
    const visited = new Set<string>();
    
    const calculateLevel = (nodeId: string): number => {
      if (visited.has(nodeId)) return levels.get(nodeId) || 0;
      visited.add(nodeId);
      
      const prerequisites = dependencyMap.get(nodeId) || [];
      if (prerequisites.length === 0) {
        levels.set(nodeId, 0);
        return 0;
      }
      
      const maxPrereqLevel = Math.max(...prerequisites.map(prereqId => calculateLevel(prereqId)));
      const level = maxPrereqLevel + 1;
      levels.set(nodeId, level);
      return level;
    };
    
    // Calculate levels for all concepts
    allConcepts.forEach(concept => calculateLevel(concept.id));
    
    // Group concepts by level
    const levelGroups = new Map<number, string[]>();
    levels.forEach((level, conceptId) => {
      if (!levelGroups.has(level)) {
        levelGroups.set(level, []);
      }
      levelGroups.get(level)?.push(conceptId);
    });
    
    // Calculate positions
    const level = levels.get(conceptId) || 0;
    const conceptsAtLevel = levelGroups.get(level) || [];
    const indexAtLevel = conceptsAtLevel.indexOf(conceptId);
    const totalAtLevel = conceptsAtLevel.length;
    
    // Tree layout positioning
    const verticalSpacing = 200;
    const horizontalSpacing = 400; // Increased from 300 to accommodate larger nodes
    const centerOffset = (totalAtLevel - 1) * horizontalSpacing / 2;
    
    return {
      x: indexAtLevel * horizontalSpacing - centerOffset + 400, // Center horizontally
      y: level * verticalSpacing + 100
    };
  }, []);

  // Create nodes from concepts
  const initialNodes: ConceptNode[] = useMemo(() => {
    return concepts.map((concept) => {
      const isCompleted = completedConceptIds.has(concept.id);
      const isUnlocked = isConceptUnlocked(concept.id);
      
      // Use tree layout positioning
      const { x, y } = getNodePosition(concept.id, concepts, dependencies);

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
  }, [concepts, completedConceptIds, isConceptUnlocked, getNodePosition, dependencies]);

  // Create edges from dependencies
  const initialEdges: Edge[] = useMemo(() => {
    return dependencies.map((dep) => ({
      id: `${dep.prerequisite_id}-${dep.concept_id}`,
      source: dep.prerequisite_id,
      target: dep.concept_id,
      type: 'smoothstep',
      animated: false,
      style: {
        stroke: '#fde68a', // yellow-200
        strokeWidth: 2,
        borderRadius: 8,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#facc15', // yellow-400
        width: 12,
        height: 12,
      },
    }));
  }, [dependencies]);

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
          <button
            onClick={() => router.push('/dashboard')}
            className="group flex items-center space-x-3 px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Dashboard</span>
          </button>
          
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
