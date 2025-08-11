export interface Database {
  public: {
    Tables: {
      roadmaps: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      concepts: {
        Row: {
          id: string;
          roadmap_id: string;
          title: string;
          short_description: string | null;
          article_content: string | null;
          quiz: Record<string, unknown>; // JSONB
          created_at: string;
        };
        Insert: {
          id?: string;
          roadmap_id: string;
          title: string;
          short_description?: string | null;
          article_content?: string | null;
          quiz?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          id?: string;
          roadmap_id?: string;
          title?: string;
          short_description?: string | null;
          article_content?: string | null;
          quiz?: Record<string, unknown>;
          created_at?: string;
        };
      };
      concept_dependencies: {
        Row: {
          concept_id: string;
          prerequisite_id: string;
        };
        Insert: {
          concept_id: string;
          prerequisite_id: string;
        };
        Update: {
          concept_id?: string;
          prerequisite_id?: string;
        };
      };
      user_progress: {
        Row: {
          user_id: string;
          concept_id: string;
          completed_at: string;
          quiz_score: number | null;
        };
        Insert: {
          user_id: string;
          concept_id: string;
          completed_at?: string;
          quiz_score?: number | null;
        };
        Update: {
          user_id?: string;
          concept_id?: string;
          completed_at?: string;
          quiz_score?: number | null;
        };
      };
    };
  };
}

export type Roadmap = Database['public']['Tables']['roadmaps']['Row'];
export type Concept = Database['public']['Tables']['concepts']['Row'];
export type ConceptDependency = Database['public']['Tables']['concept_dependencies']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
