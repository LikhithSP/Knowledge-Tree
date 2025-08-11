import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/types/database.types';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Initialize OpenRouter client (for DeepSeek R1)
const deepseekApiKey = process.env.DEEPSEEK_API_KEY!;

if (!deepseekApiKey) {
  console.error('Missing DEEPSEEK_API_KEY environment variable');
  process.exit(1);
}

const deepseek = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: deepseekApiKey,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000', // Optional: for analytics
    'X-Title': 'Knowledge Tree', // Optional: for analytics
  },
});

interface ConceptData {
  title: string;
  shortDescription: string;
  prerequisites?: string[];
}

interface GeneratedContent {
  article: string;
  quiz: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

async function generateConceptContent(conceptTitle: string, conceptDescription: string): Promise<GeneratedContent> {
  const articlePrompt = `
    Create a comprehensive educational article about "${conceptTitle}".
    Description: ${conceptDescription}
    
    Requirements:
    - Write a clear, engaging article suitable for beginners to intermediate learners
    - Include practical examples and real-world applications
    - Use simple HTML formatting (h3, p, ul, li, strong, em, code tags only)
    - Aim for 500-800 words
    - Make it informative but easy to understand
    - Include step-by-step explanations when appropriate
    
    Return only the HTML content, no additional text or markdown.
  `;

  const quizPrompt = `
    Create a quiz with 4 multiple-choice questions about "${conceptTitle}".
    Description: ${conceptDescription}
    
    Requirements:
    - Each question should test understanding of key concepts
    - Provide 4 options for each question (A, B, C, D)
    - Include detailed explanations for the correct answers
    - Make questions practical and application-focused
    - Ensure questions are at appropriate difficulty level
    
    Return the response in this exact JSON format:
    {
      "questions": [
        {
          "id": "q1",
          "question": "Question text here",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Detailed explanation of why this answer is correct"
        }
      ]
    }
  `;

  try {
    // Generate article
    const articleResponse = await deepseek.chat.completions.create({
      model: 'deepseek/deepseek-r1',
      messages: [{ role: 'user', content: articlePrompt }],
      temperature: 0.7,
      max_tokens: 800, // Reduced token limit to save credits
    });

    // Generate quiz
    const quizResponse = await deepseek.chat.completions.create({
      model: 'deepseek/deepseek-r1',
      messages: [{ role: 'user', content: quizPrompt }],
      temperature: 0.7,
      max_tokens: 600, // Reduced token limit to save credits
    });

    const article = articleResponse.choices[0]?.message?.content || '';
    const quizText = quizResponse.choices[0]?.message?.content || '';
    
    let quiz;
    try {
      quiz = JSON.parse(quizText);
    } catch (error) {
      console.error('Failed to parse quiz JSON:', error);
      // Fallback quiz
      quiz = {
        questions: [
          {
            id: 'q1',
            question: `What is the main purpose of ${conceptTitle}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
            explanation: 'This is a placeholder explanation.'
          }
        ]
      };
    }

    return { article, quiz };
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

async function createRoadmapWithConcepts(
  roadmapTitle: string,
  roadmapDescription: string,
  concepts: ConceptData[]
) {
  try {
    // Create roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: roadmapTitle,
        description: roadmapDescription,
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create concepts
    const createdConcepts: any[] = [];
    
    for (const conceptData of concepts) {
      console.log(`Generating content for: ${conceptData.title}`);
      
      const content = await generateConceptContent(conceptData.title, conceptData.shortDescription);
      
      const { data: concept, error: conceptError } = await supabase
        .from('concepts')
        .insert([{
          roadmap_id: roadmap.id,
          title: conceptData.title,
          short_description: conceptData.shortDescription,
          article_content: content.article,
          quiz: content.quiz,
        }])
        .select()
        .single();

      if (conceptError) {
        throw conceptError;
      }

      createdConcepts.push({ ...concept, prerequisites: conceptData.prerequisites || [] });
      console.log(`Created concept: ${concept.title}`);
    }

    // Create dependencies
    for (const concept of createdConcepts) {
      if (concept.prerequisites && concept.prerequisites.length > 0) {
        for (const prereqTitle of concept.prerequisites) {
          const prerequisite = createdConcepts.find(c => c.title === prereqTitle);
          if (prerequisite) {
            const { error: depError } = await supabase
              .from('concept_dependencies')
              .insert([{
                concept_id: concept.id,
                prerequisite_id: prerequisite.id,
              }]);

            if (depError) {
              console.error('Error creating dependency:', depError);
            } else {
              console.log(`Created dependency: ${prereqTitle} -> ${concept.title}`);
            }
          }
        }
      }
    }

    console.log(`Successfully created roadmap "${roadmapTitle}" with ${concepts.length} concepts`);
    return roadmap;
  } catch (error) {
    console.error('Error creating roadmap:', error);
    throw error;
  }
}

// Sample roadmap: Web Development Fundamentals
async function createWebDevRoadmap() {
  const concepts: ConceptData[] = [
    {
      title: 'HTML Basics',
      shortDescription: 'Learn the fundamental structure of web pages using HTML',
    },
    {
      title: 'CSS Fundamentals',
      shortDescription: 'Style your web pages with CSS styling and layout',
      prerequisites: ['HTML Basics'],
    },
    {
      title: 'CSS Flexbox',
      shortDescription: 'Master flexible box layout for responsive design',
      prerequisites: ['CSS Fundamentals'],
    },
    {
      title: 'JavaScript Basics',
      shortDescription: 'Add interactivity to your web pages with JavaScript',
      prerequisites: ['HTML Basics'],
    },
    {
      title: 'DOM Manipulation',
      shortDescription: 'Learn to interact with HTML elements using JavaScript',
      prerequisites: ['JavaScript Basics'],
    },
    {
      title: 'Responsive Design',
      shortDescription: 'Create websites that work on all device sizes',
      prerequisites: ['CSS Flexbox'],
    },
  ];

  return createRoadmapWithConcepts(
    'Web Development Fundamentals',
    'Learn the essential building blocks of modern web development',
    concepts
  );
}

// Sample roadmap: AI & Machine Learning
async function createAIRoadmap() {
  const concepts: ConceptData[] = [
    {
      title: 'Introduction to AI',
      shortDescription: 'Understanding what artificial intelligence is and its applications',
    },
    {
      title: 'Machine Learning Basics',
      shortDescription: 'Learn the fundamentals of machine learning algorithms',
      prerequisites: ['Introduction to AI'],
    },
    {
      title: 'Supervised Learning',
      shortDescription: 'Understand classification and regression algorithms',
      prerequisites: ['Machine Learning Basics'],
    },
    {
      title: 'Unsupervised Learning',
      shortDescription: 'Explore clustering and dimensionality reduction techniques',
      prerequisites: ['Machine Learning Basics'],
    },
    {
      title: 'Neural Networks',
      shortDescription: 'Introduction to artificial neural networks and deep learning',
      prerequisites: ['Supervised Learning'],
    },
    {
      title: 'Model Evaluation',
      shortDescription: 'Learn how to assess and improve model performance',
      prerequisites: ['Supervised Learning', 'Unsupervised Learning'],
    },
  ];

  return createRoadmapWithConcepts(
    'AI & Machine Learning',
    'Explore the exciting world of artificial intelligence and machine learning',
    concepts
  );
}

// Main execution
async function main() {
  try {
    console.log('Starting content generation...');
    
    // Create Web Development roadmap
    await createWebDevRoadmap();
    
    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create AI roadmap
    await createAIRoadmap();
    
    console.log('Content generation completed successfully!');
  } catch (error) {
    console.error('Content generation failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { createRoadmapWithConcepts, generateConceptContent };
