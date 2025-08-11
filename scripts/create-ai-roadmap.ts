import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/types/database.types';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

async function createAIMLRoadmap() {
  console.log('Creating AI & Machine Learning roadmap...');

  try {
    // Create AI/ML roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'AI & Machine Learning',
        description: 'Explore the exciting world of artificial intelligence and machine learning',
        icon: 'brain'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create AI/ML concepts
    const concepts = [
      {
        title: 'Introduction to AI',
        short_description: 'Understanding what artificial intelligence is and its applications',
        article_content: `
          <h3>What is Artificial Intelligence?</h3>
          <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence.</p>
          
          <h3>Types of AI</h3>
          <ul>
            <li><strong>Narrow AI:</strong> Designed for specific tasks (like chess, image recognition)</li>
            <li><strong>General AI:</strong> Hypothetical AI with human-level intelligence across all domains</li>
            <li><strong>Superintelligence:</strong> AI that surpasses human intelligence</li>
          </ul>
          
          <h3>AI Applications Today</h3>
          <ul>
            <li>Virtual assistants (Siri, Alexa)</li>
            <li>Recommendation systems (Netflix, Amazon)</li>
            <li>Image and speech recognition</li>
            <li>Autonomous vehicles</li>
            <li>Medical diagnosis</li>
            <li>Fraud detection</li>
          </ul>
          
          <h3>AI vs Machine Learning vs Deep Learning</h3>
          <p>AI is the broader concept, Machine Learning is a subset of AI, and Deep Learning is a subset of Machine Learning that uses neural networks.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does AI stand for?',
              options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Algorithmic Intelligence'],
              correctAnswer: 0,
              explanation: 'AI stands for Artificial Intelligence, which refers to machines designed to simulate human intelligence.'
            },
            {
              id: 'q2',
              question: 'Which type of AI is designed for specific tasks?',
              options: ['General AI', 'Narrow AI', 'Superintelligence', 'Quantum AI'],
              correctAnswer: 1,
              explanation: 'Narrow AI is designed to perform specific tasks, like image recognition or playing chess.'
            },
            {
              id: 'q3',
              question: 'Which is a subset of Machine Learning?',
              options: ['Artificial Intelligence', 'Deep Learning', 'Data Science', 'Computer Vision'],
              correctAnswer: 1,
              explanation: 'Deep Learning is a subset of Machine Learning that uses neural networks with multiple layers.'
            },
            {
              id: 'q4',
              question: 'Which is NOT a common AI application today?',
              options: ['Virtual assistants', 'Time travel', 'Recommendation systems', 'Image recognition'],
              correctAnswer: 1,
              explanation: 'Time travel is not an AI application. Current AI focuses on pattern recognition, prediction, and automation.'
            }
          ]
        }
      },
      {
        title: 'Machine Learning Basics',
        short_description: 'Learn the fundamentals of machine learning algorithms',
        article_content: `
          <h3>What is Machine Learning?</h3>
          <p>Machine Learning (ML) is a method of data analysis that automates analytical model building. It's based on the idea that systems can learn from data, identify patterns, and make decisions with minimal human intervention.</p>
          
          <h3>Types of Machine Learning</h3>
          <ul>
            <li><strong>Supervised Learning:</strong> Learning with labeled examples (like email spam detection)</li>
            <li><strong>Unsupervised Learning:</strong> Finding patterns in data without labels (like customer segmentation)</li>
            <li><strong>Reinforcement Learning:</strong> Learning through interaction with environment (like game playing)</li>
          </ul>
          
          <h3>Key Concepts</h3>
          <ul>
            <li><strong>Features:</strong> Input variables used to make predictions</li>
            <li><strong>Labels:</strong> The output or target variable you want to predict</li>
            <li><strong>Training Data:</strong> Data used to train the model</li>
            <li><strong>Test Data:</strong> Data used to evaluate model performance</li>
          </ul>
          
          <h3>Common Algorithms</h3>
          <ul>
            <li>Linear Regression</li>
            <li>Decision Trees</li>
            <li>Random Forest</li>
            <li>Support Vector Machines</li>
            <li>Neural Networks</li>
          </ul>
          
          <h3>ML Workflow</h3>
          <p>1. Define Problem → 2. Collect Data → 3. Prepare Data → 4. Choose Algorithm → 5. Train Model → 6. Evaluate → 7. Deploy</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'In supervised learning, what do you need in your training data?',
              options: ['Only input features', 'Only output labels', 'Both input features and output labels', 'Neither features nor labels'],
              correctAnswer: 2,
              explanation: 'Supervised learning requires both input features and corresponding output labels to train the model.'
            },
            {
              id: 'q2',
              question: 'Which type of learning is used for customer segmentation?',
              options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Deep Learning'],
              correctAnswer: 1,
              explanation: 'Customer segmentation typically uses unsupervised learning since you\'re finding hidden patterns without predefined labels.'
            },
            {
              id: 'q3',
              question: 'What are features in machine learning?',
              options: ['The target variable', 'Input variables for prediction', 'The algorithm used', 'The training process'],
              correctAnswer: 1,
              explanation: 'Features are the input variables or characteristics used by the algorithm to make predictions.'
            },
            {
              id: 'q4',
              question: 'Which learning type learns through trial and error?',
              options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Transfer Learning'],
              correctAnswer: 2,
              explanation: 'Reinforcement learning learns through trial and error by receiving rewards or penalties for actions.'
            }
          ]
        }
      },
      {
        title: 'Neural Networks',
        short_description: 'Introduction to artificial neural networks and deep learning',
        article_content: `
          <h3>What are Neural Networks?</h3>
          <p>Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process and transmit information.</p>
          
          <h3>Basic Structure</h3>
          <ul>
            <li><strong>Input Layer:</strong> Receives the input data</li>
            <li><strong>Hidden Layers:</strong> Process the data (can be multiple layers)</li>
            <li><strong>Output Layer:</strong> Produces the final result</li>
          </ul>
          
          <h3>How Neurons Work</h3>
          <p>Each neuron:</p>
          <ul>
            <li>Receives inputs from other neurons</li>
            <li>Applies weights to these inputs</li>
            <li>Sums the weighted inputs</li>
            <li>Applies an activation function</li>
            <li>Sends output to connected neurons</li>
          </ul>
          
          <h3>Activation Functions</h3>
          <ul>
            <li><strong>ReLU:</strong> Most common, outputs max(0, x)</li>
            <li><strong>Sigmoid:</strong> Outputs between 0 and 1</li>
            <li><strong>Tanh:</strong> Outputs between -1 and 1</li>
          </ul>
          
          <h3>Deep Learning</h3>
          <p>Deep learning uses neural networks with many hidden layers (typically 3 or more). It's particularly good at:</p>
          <ul>
            <li>Image recognition</li>
            <li>Natural language processing</li>
            <li>Speech recognition</li>
            <li>Game playing (like AlphaGo)</li>
          </ul>
          
          <h3>Training Process</h3>
          <p>Neural networks learn through backpropagation, adjusting weights based on errors to improve predictions.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What are the three main types of layers in a neural network?',
              options: ['Input, Process, Output', 'Input, Hidden, Output', 'Start, Middle, End', 'Data, Algorithm, Result'],
              correctAnswer: 1,
              explanation: 'Neural networks consist of Input layers (receive data), Hidden layers (process data), and Output layers (produce results).'
            },
            {
              id: 'q2',
              question: 'What is the most commonly used activation function?',
              options: ['Sigmoid', 'Tanh', 'ReLU', 'Linear'],
              correctAnswer: 2,
              explanation: 'ReLU (Rectified Linear Unit) is the most commonly used activation function because it\'s simple and effective.'
            },
            {
              id: 'q3',
              question: 'How many hidden layers typically define "deep" learning?',
              options: ['1 or more', '2 or more', '3 or more', '10 or more'],
              correctAnswer: 2,
              explanation: 'Deep learning typically refers to neural networks with 3 or more hidden layers.'
            },
            {
              id: 'q4',
              question: 'What process do neural networks use to learn?',
              options: ['Forward propagation', 'Backpropagation', 'Cross validation', 'Feature selection'],
              correctAnswer: 1,
              explanation: 'Backpropagation is the learning algorithm that adjusts weights based on prediction errors.'
            }
          ]
        }
      },
      {
        title: 'Supervised Learning',
        short_description: 'Understand classification and regression algorithms',
        article_content: `
          <h3>What is Supervised Learning?</h3>
          <p>Supervised learning uses labeled training data to learn a mapping function from inputs to outputs. It's called "supervised" because the algorithm learns from examples with known correct answers.</p>
          
          <h3>Types of Supervised Learning</h3>
          <ul>
            <li><strong>Classification:</strong> Predicts categories or classes (spam/not spam, cat/dog)</li>
            <li><strong>Regression:</strong> Predicts continuous numerical values (house prices, temperature)</li>
          </ul>
          
          <h3>Classification Algorithms</h3>
          <ul>
            <li><strong>Logistic Regression:</strong> Simple, interpretable classifier</li>
            <li><strong>Decision Trees:</strong> Easy to understand, handles both numerical and categorical data</li>
            <li><strong>Random Forest:</strong> Combines multiple decision trees for better accuracy</li>
            <li><strong>Support Vector Machines (SVM):</strong> Effective for high-dimensional data</li>
            <li><strong>Naive Bayes:</strong> Fast, works well with text classification</li>
          </ul>
          
          <h3>Regression Algorithms</h3>
          <ul>
            <li><strong>Linear Regression:</strong> Finds best line through data points</li>
            <li><strong>Polynomial Regression:</strong> Handles non-linear relationships</li>
            <li><strong>Ridge/Lasso Regression:</strong> Prevents overfitting</li>
          </ul>
          
          <h3>Evaluation Metrics</h3>
          <p><strong>Classification:</strong></p>
          <ul>
            <li>Accuracy: Percentage of correct predictions</li>
            <li>Precision: True positives / (True positives + False positives)</li>
            <li>Recall: True positives / (True positives + False negatives)</li>
          </ul>
          
          <p><strong>Regression:</strong></p>
          <ul>
            <li>Mean Absolute Error (MAE)</li>
            <li>Mean Squared Error (MSE)</li>
            <li>R-squared (coefficient of determination)</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main difference between classification and regression?',
              options: ['Classification predicts categories, regression predicts numbers', 'Classification is harder than regression', 'Classification uses more data than regression', 'There is no difference'],
              correctAnswer: 0,
              explanation: 'Classification predicts discrete categories or classes, while regression predicts continuous numerical values.'
            },
            {
              id: 'q2',
              question: 'Which algorithm is best for text classification?',
              options: ['Linear Regression', 'Naive Bayes', 'K-means', 'PCA'],
              correctAnswer: 1,
              explanation: 'Naive Bayes is particularly effective for text classification due to its handling of categorical features and speed.'
            },
            {
              id: 'q3',
              question: 'What does accuracy measure in classification?',
              options: ['How fast the algorithm runs', 'Percentage of correct predictions', 'Size of the dataset', 'Number of features used'],
              correctAnswer: 1,
              explanation: 'Accuracy measures the percentage of predictions that were correct out of all predictions made.'
            },
            {
              id: 'q4',
              question: 'Which is NOT a supervised learning algorithm?',
              options: ['Decision Trees', 'K-means Clustering', 'Logistic Regression', 'Random Forest'],
              correctAnswer: 1,
              explanation: 'K-means Clustering is an unsupervised learning algorithm used for grouping data without labels.'
            }
          ]
        }
      }
    ];

    // Insert concepts
    const createdConcepts = [];
    for (const conceptData of concepts) {
      const { data: concept, error: conceptError } = await supabase
        .from('concepts')
        .insert([{
          roadmap_id: roadmap.id,
          title: conceptData.title,
          short_description: conceptData.short_description,
          article_content: conceptData.article_content,
          quiz: conceptData.quiz,
        }])
        .select()
        .single();

      if (conceptError) {
        throw conceptError;
      }

      createdConcepts.push(concept);
      console.log(`Created concept: ${concept.title}`);
    }

    // Create dependencies
    const dependencies = [
      { concept: 1, prerequisite: 0 }, // Machine Learning Basics depends on Introduction to AI
      { concept: 2, prerequisite: 1 }, // Neural Networks depends on Machine Learning Basics
      { concept: 3, prerequisite: 1 }, // Supervised Learning depends on Machine Learning Basics
    ];

    for (const dep of dependencies) {
      const { error: depError } = await supabase
        .from('concept_dependencies')
        .insert([{
          concept_id: createdConcepts[dep.concept].id,
          prerequisite_id: createdConcepts[dep.prerequisite].id,
        }]);

      if (depError) {
        console.error('Error creating dependency:', depError);
      } else {
        console.log(`Created dependency: ${createdConcepts[dep.prerequisite].title} -> ${createdConcepts[dep.concept].title}`);
      }
    }

    console.log('✅ AI & Machine Learning roadmap created successfully!');

  } catch (error) {
    console.error('Error creating AI/ML roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createAIMLRoadmap();
}
