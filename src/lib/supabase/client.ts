import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if environment variables are properly configured
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === 'your_supabase_project_url' || 
      supabaseAnonKey === 'your_supabase_anon_key') {
    throw new Error(
      'Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
    );
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );
}
