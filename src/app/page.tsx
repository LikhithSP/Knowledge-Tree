'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkSupabaseConfig() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        setIsConfigured(true);
        if (user) {
          router.push('/dashboard');
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('Supabase environment variables are not configured')) {
          setIsConfigured(false);
        } else {
          console.error('Unexpected error:', error);
          setIsConfigured(false);
        }
      }
    }

    checkSupabaseConfig();
  }, [router]);

  if (isConfigured === null) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isConfigured === false) {
    // Show setup instructions
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">Welcome to Knowledge Tree!</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Your interactive learning platform is almost ready. Please complete the setup first.
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">⚙️ Setup Required</h2>
            <p className="text-yellow-700 mb-4">
              To get started, you need to configure your Supabase backend:
            </p>
            
            <div className="space-y-4 text-sm">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800 mb-2">1. Create a Supabase Project</h3>
                <p className="text-gray-600">
                  Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">supabase.com</a> and create a new project
                </p>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800 mb-2">2. Get Your Project Credentials</h3>
                <p className="text-gray-600">
                  From your Supabase dashboard, copy your Project URL and anon public key
                </p>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800 mb-2">3. Update Environment Variables</h3>
                <p className="text-gray-600 mb-2">
                  Replace the placeholder values in your <code className="bg-gray-100 px-1 rounded">.env.local</code> file:
                </p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
DEEPSEEK_API_KEY=your_deepseek_api_key`}
                </pre>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-800 mb-2">4. Set Up Database Schema</h3>
                <p className="text-gray-600">
                  Run the SQL commands from <code className="bg-gray-100 px-1 rounded">database/schema.sql</code> in your Supabase SQL Editor
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              After completing the setup, refresh this page to continue.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Need help? Check the <code className="bg-gray-100 px-1 rounded">README.md</code> for detailed instructions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // This should not be reached since we redirect above
  return null;
}
