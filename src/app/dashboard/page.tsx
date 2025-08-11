import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import DashboardClient from './DashboardClient';

export default async function Dashboard() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch roadmaps
  const { data: roadmaps, error: roadmapsError } = await supabase
    .from('roadmaps')
    .select('*')
    .order('created_at', { ascending: true });

  // Fetch user progress
  const { data: userProgress, error: progressError } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id);

  // Fetch all concepts (for topic count)
  const { data: concepts, error: conceptsError } = await supabase
    .from('concepts')
    .select('id');

  if (roadmapsError) {
    console.error('Error fetching roadmaps:', roadmapsError);
  }
  if (progressError) {
    console.error('Error fetching user progress:', progressError);
  }
  if (conceptsError) {
    console.error('Error fetching concepts:', conceptsError);
  }

  // Calculate summary
  const topicsCompleted = userProgress ? userProgress.length : 0;
  const quizzesCompleted = userProgress ? userProgress.filter((p) => p.quiz_score !== null).length : 0;
  // Estimate hours: assume 10 minutes per topic
  const hoursCompleted = userProgress ? Math.round((userProgress.length * 10) / 60) : 0;
  const totalTopics = concepts ? concepts.length : 0;

  const summary = {
    topicsCompleted,
    quizzesCompleted,
    hoursCompleted,
    totalTopics,
    history: userProgress || [],
  };

  return <DashboardClient roadmaps={roadmaps || []} user={user} summary={summary} />;
}
