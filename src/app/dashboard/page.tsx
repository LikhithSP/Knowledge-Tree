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
  const { data: roadmaps, error } = await supabase
    .from('roadmaps')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching roadmaps:', error);
  }

  return <DashboardClient roadmaps={roadmaps || []} user={user} />;
}
