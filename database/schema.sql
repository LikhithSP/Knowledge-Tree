-- Create the roadmaps table
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the concepts table
CREATE TABLE concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_description TEXT,
  article_content TEXT,
  quiz JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create the concept_dependencies table
CREATE TABLE concept_dependencies (
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  prerequisite_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (concept_id, prerequisite_id)
);

-- Create the user_progress table
CREATE TABLE user_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id UUID REFERENCES concepts(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  quiz_score INT,
  PRIMARY KEY (user_id, concept_id)
);

-- Create indexes for better performance
CREATE INDEX idx_concepts_roadmap_id ON concepts(roadmap_id);
CREATE INDEX idx_concept_dependencies_concept_id ON concept_dependencies(concept_id);
CREATE INDEX idx_concept_dependencies_prerequisite_id ON concept_dependencies(prerequisite_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_concept_id ON user_progress(concept_id);

-- Enable RLS (Row Level Security) on user_progress table
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for user_progress
CREATE POLICY "Users can only see their own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Sample data for testing
INSERT INTO roadmaps (title, description, icon) VALUES
('Web Development Fundamentals', 'Learn the basics of web development including HTML, CSS, and JavaScript', 'code'),
('AI & Machine Learning', 'Explore artificial intelligence and machine learning concepts', 'brain'),
('Cybersecurity Basics', 'Understanding cybersecurity principles and best practices', 'shield');

-- You can add sample concepts here after setting up the roadmaps
