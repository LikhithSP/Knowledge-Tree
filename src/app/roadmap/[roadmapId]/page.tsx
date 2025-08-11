import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import RoadmapClient from './RoadmapClient';

interface RoadmapPageProps {
  params: Promise<{
    roadmapId: string;
  }>;
}

export default async function RoadmapPage({ params }: RoadmapPageProps) {
  const { roadmapId } = await params;
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch roadmap
  const { data: roadmap, error: roadmapError } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', roadmapId)
    .single();

  if (roadmapError || !roadmap) {
    redirect('/dashboard');
  }

  // Fetch concepts for this roadmap
  const { data: concepts, error: conceptsError } = await supabase
    .from('concepts')
    .select('*')
    .eq('roadmap_id', roadmapId);

  // Fetch concept dependencies
  const { data: dependencies, error: dependenciesError } = await supabase
    .from('concept_dependencies')
    .select('*');

  // Fetch user progress
  const { data: userProgress, error: progressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id);

  if (conceptsError || dependenciesError || progressError) {
    console.error('Error fetching roadmap data:', { conceptsError, dependenciesError, progressError });
  }

  return (
    <RoadmapClient
      roadmap={roadmap}
      concepts={concepts || []}
      dependencies={dependencies || []}
      userProgress={userProgress || []}
      user={user}
    />
  );
}
