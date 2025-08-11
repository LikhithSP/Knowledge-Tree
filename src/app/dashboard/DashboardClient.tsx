'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Roadmap } from '@/types/database.types';
import { User } from '@supabase/supabase-js';
import { BookOpen, LogOut, User as UserIcon, Search } from 'lucide-react';


interface DashboardSummary {
  topicsCompleted: number;
  quizzesCompleted: number;
  hoursCompleted: number;
  totalTopics: number;
  history: any[];
}

interface DashboardClientProps {
  roadmaps: Roadmap[];
  user: User;
  summary: DashboardSummary;
}

export default function DashboardClient({ roadmaps, user, summary }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const handleRoadmapClick = (roadmapId: string) => {
    router.push(`/roadmap/${roadmapId}`);
  };

  // Filter roadmaps based on search query
  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (roadmap.description && roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
  {/* ...existing code... */}
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Tree</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full">
                <UserIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back to your learning journey!👋🏻
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Choose a roadmap to continue exploring new concepts and unlocking knowledge.
          </p>
          {/* Your Stats */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Stats 🏆</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-yellow-100">
                <span className="text-3xl font-bold text-yellow-600 mb-1">{summary.topicsCompleted}</span>
                <span className="text-gray-700 font-semibold">Topics Completed</span>
                <span className="text-xs text-gray-400 mt-1">of {summary.totalTopics} total</span>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-yellow-100">
                <span className="text-3xl font-bold text-yellow-600 mb-1">{summary.quizzesCompleted}</span>
                <span className="text-gray-700 font-semibold">Quizzes Completed</span>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-yellow-100">
                <span className="text-3xl font-bold text-yellow-600 mb-1">{summary.hoursCompleted}</span>
                <span className="text-gray-700 font-semibold">Hours Learned</span>
              </div>
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-yellow-100">
                <span className="text-3xl font-bold text-yellow-600 mb-1">{summary.history.length}</span>
                <span className="text-gray-700 font-semibold">History Entries</span>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search topics, roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
            />
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              {filteredRoadmaps.length === 0 
                ? `No results found for "${searchQuery}"` 
                : `Found ${filteredRoadmaps.length} ${filteredRoadmaps.length === 1 ? 'roadmap' : 'roadmaps'} for "${searchQuery}"`
              }
            </p>
          </div>
        )}

        {/* Roadmaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadmaps.length > 0 ? (
            filteredRoadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                onClick={() => handleRoadmapClick(roadmap.id)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-yellow-200 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-2xl shadow-lg group-hover:shadow-yellow-200 transition-shadow duration-300">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="ml-5 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 leading-tight">
                        {roadmap.title}
                      </h3>
                    </div>
                  </div>
                  {roadmap.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {roadmap.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 transition-colors duration-200">
                      Start Learning
                    </span>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-md mx-auto">
                <div className="bg-gray-100 p-6 rounded-2xl w-fit mx-auto mb-6">
                  {searchQuery ? (
                    <Search className="h-16 w-16 text-gray-400 mx-auto" />
                  ) : (
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {searchQuery ? `No results found for "${searchQuery}"` : 'No roadmaps available yet'}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {searchQuery 
                    ? 'Try searching with different keywords or browse all available roadmaps.'
                    : 'Roadmaps will appear here once they are created. Check back soon to start your learning journey!'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
