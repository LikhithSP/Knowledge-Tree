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

  // Create nodes from concepts
  const initialNodes: ConceptNode[] = useMemo(() => {
    return concepts.map((concept, index) => {
      const isCompleted = completedConceptIds.has(concept.id);
      const isUnlocked = isConceptUnlocked(concept.id);
      
      // Simple grid layout - you can improve this with a better layout algorithm
      const x = (index % 4) * 250 + 100;
      const y = Math.floor(index / 4) * 150 + 100;

      return {
        id: concept.id,
        type: 'default',
        position: { x, y },
        data: {
          concept,
          isCompleted,
          isUnlocked,
          label: (
            <div className="flex items-center space-x-2 p-3 min-w-0">
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : isUnlocked ? (
                <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0" />
              ) : (
                <Lock className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{concept.title}</div>
                {concept.short_description && (
                  <div className="text-xs text-gray-500 truncate">
                    {concept.short_description}
                  </div>
                )}
              </div>
            </div>
          ),
        },
        style: {
          backgroundColor: isCompleted
            ? '#dcfce7' // green-100
            : isUnlocked
            ? '#dbeafe' // blue-100
            : '#f3f4f6', // gray-100
          border: isCompleted
            ? '2px solid #16a34a' // green-600
            : isUnlocked
            ? '2px solid #2563eb' // blue-600
            : '2px solid #9ca3af', // gray-400
          borderRadius: '8px',
          cursor: isUnlocked ? 'pointer' : 'not-allowed',
          opacity: isUnlocked ? 1 : 0.6,
        },
      };
    });
  }, [concepts, completedConceptIds, isConceptUnlocked]);

  // Create edges from dependencies
  const initialEdges: Edge[] = useMemo(() => {
    return dependencies.map((dep) => ({
      id: `${dep.prerequisite_id}-${dep.concept_id}`,
      source: dep.prerequisite_id,
      target: dep.concept_id,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#6b7280' }, // gray-500
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
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="border-l border-gray-300 pl-4">
            <h1 className="text-xl font-semibold text-gray-900">{roadmap.title}</h1>
            {roadmap.description && (
              <p className="text-sm text-gray-600">{roadmap.description}</p>
            )}
          </div>
        </div>
      </header>

      {/* Roadmap Flow */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
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
