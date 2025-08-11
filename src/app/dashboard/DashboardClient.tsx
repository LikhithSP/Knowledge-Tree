'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Roadmap } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';

interface DashboardClientProps {
  roadmaps: Roadmap[];
  user: User;
}

export default function DashboardClient({ roadmaps, user }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const handleRoadmapClick = (roadmapId: string) => {
    router.push(`/roadmap/${roadmapId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Knowledge Tree</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back to your learning journey!
          </h2>
          <p className="text-lg text-gray-600">
            Choose a roadmap to continue exploring new concepts and unlocking knowledge.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.length > 0 ? (
            roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                onClick={() => handleRoadmapClick(roadmap.id)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border hover:border-indigo-200"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <BookOpen className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {roadmap.title}
                      </h3>
                    </div>
                  </div>
                  {roadmap.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {roadmap.description}
                    </p>
                  )}
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      Start Learning
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No roadmaps available yet
              </h3>
              <p className="text-gray-600">
                Roadmaps will appear here once they are created. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
