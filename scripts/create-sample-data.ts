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

async function createSampleData() {
  console.log('Creating sample roadmap and concepts...');

  try {
    // Create a sample roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Web Development Fundamentals',
        description: 'Learn the essential building blocks of modern web development',
        icon: 'code'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create sample concepts with static content
    const concepts = [
      {
        title: 'HTML Basics',
        short_description: 'Learn the fundamental structure of web pages using HTML',
        article_content: `
          <h3>Introduction to HTML</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup elements.</p>
          
          <h3>Basic HTML Structure</h3>
          <p>Every HTML document follows a basic structure:</p>
          <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
          
          <h3>Common HTML Elements</h3>
          <ul>
            <li><strong>Headings:</strong> &lt;h1&gt; to &lt;h6&gt; for different heading levels</li>
            <li><strong>Paragraphs:</strong> &lt;p&gt; for text content</li>
            <li><strong>Links:</strong> &lt;a&gt; for creating hyperlinks</li>
            <li><strong>Images:</strong> &lt;img&gt; for displaying images</li>
            <li><strong>Lists:</strong> &lt;ul&gt; and &lt;ol&gt; for unordered and ordered lists</li>
          </ul>
          
          <p>HTML is the foundation of all web development. Understanding these basics will help you create well-structured web pages.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does HTML stand for?',
              options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
              correctAnswer: 0,
              explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
            },
            {
              id: 'q2',
              question: 'Which element is used to create the largest heading?',
              options: ['&lt;h6&gt;', '&lt;header&gt;', '&lt;h1&gt;', '&lt;heading&gt;'],
              correctAnswer: 2,
              explanation: 'The &lt;h1&gt; element creates the largest heading in HTML, with &lt;h6&gt; being the smallest.'
            },
            {
              id: 'q3',
              question: 'What is the correct HTML element for creating a paragraph?',
              options: ['&lt;paragraph&gt;', '&lt;p&gt;', '&lt;para&gt;', '&lt;text&gt;'],
              correctAnswer: 1,
              explanation: 'The &lt;p&gt; element is used to create paragraphs in HTML.'
            },
            {
              id: 'q4',
              question: 'Which section of an HTML document contains metadata?',
              options: ['&lt;body&gt;', '&lt;footer&gt;', '&lt;head&gt;', '&lt;header&gt;'],
              correctAnswer: 2,
              explanation: 'The &lt;head&gt; section contains metadata about the document, such as the title and links to stylesheets.'
            }
          ]
        }
      },
      {
        title: 'CSS Fundamentals',
        short_description: 'Style your web pages with CSS styling and layout',
        article_content: `
          <h3>Introduction to CSS</h3>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the presentation of HTML elements including colors, fonts, spacing, and positioning.</p>
          
          <h3>CSS Syntax</h3>
          <p>CSS consists of rules that target HTML elements:</p>
          <pre><code>selector {
    property: value;
    property: value;
}</code></pre>
          
          <h3>Common CSS Properties</h3>
          <ul>
            <li><strong>color:</strong> Sets text color</li>
            <li><strong>background-color:</strong> Sets background color</li>
            <li><strong>font-size:</strong> Controls text size</li>
            <li><strong>margin:</strong> Space outside elements</li>
            <li><strong>padding:</strong> Space inside elements</li>
            <li><strong>width/height:</strong> Element dimensions</li>
          </ul>
          
          <h3>CSS Selectors</h3>
          <p>Selectors target specific HTML elements:</p>
          <ul>
            <li><strong>Element:</strong> h1, p, div</li>
            <li><strong>Class:</strong> .className</li>
            <li><strong>ID:</strong> #idName</li>
          </ul>
          
          <p>CSS is essential for creating visually appealing and well-designed websites.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does CSS stand for?',
              options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
              correctAnswer: 1,
              explanation: 'CSS stands for Cascading Style Sheets, which is used to style HTML documents.'
            },
            {
              id: 'q2',
              question: 'Which CSS property is used to change the text color?',
              options: ['text-color', 'font-color', 'color', 'text-style'],
              correctAnswer: 2,
              explanation: 'The "color" property is used to set the text color in CSS.'
            },
            {
              id: 'q3',
              question: 'How do you select an element with class "header" in CSS?',
              options: ['#header', '.header', 'header', '*header'],
              correctAnswer: 1,
              explanation: 'Class selectors in CSS are prefixed with a dot (.), so .header selects elements with class="header".'
            },
            {
              id: 'q4',
              question: 'Which property adds space inside an element?',
              options: ['margin', 'spacing', 'padding', 'border'],
              correctAnswer: 2,
              explanation: 'The padding property adds space inside an element, between the content and the border.'
            }
          ]
        }
      },
      {
        title: 'JavaScript Basics',
        short_description: 'Add interactivity to your web pages with JavaScript',
        article_content: `
          <h3>Introduction to JavaScript</h3>
          <p>JavaScript is a programming language that makes web pages interactive. It can modify HTML content, respond to user events, and create dynamic behavior.</p>
          
          <h3>Variables and Data Types</h3>
          <p>JavaScript uses variables to store data:</p>
          <pre><code>let name = "John";
let age = 25;
let isStudent = true;</code></pre>
          
          <h3>Functions</h3>
          <p>Functions are reusable blocks of code:</p>
          <pre><code>function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("World"));</code></pre>
          
          <h3>DOM Manipulation</h3>
          <p>JavaScript can change HTML content:</p>
          <pre><code>document.getElementById("demo").innerHTML = "Hello World!";
document.querySelector(".button").addEventListener("click", function() {
    alert("Button clicked!");
});</code></pre>
          
          <h3>Common JavaScript Uses</h3>
          <ul>
            <li>Form validation</li>
            <li>Image sliders</li>
            <li>Interactive menus</li>
            <li>Dynamic content updates</li>
            <li>User input handling</li>
          </ul>
          
          <p>JavaScript brings your web pages to life with interactive features and dynamic behavior.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which keyword is used to declare a variable in modern JavaScript?',
              options: ['var', 'variable', 'let', 'declare'],
              correctAnswer: 2,
              explanation: '"let" is the modern way to declare variables in JavaScript. "const" is used for constants.'
            },
            {
              id: 'q2',
              question: 'How do you write a comment in JavaScript?',
              options: ['&lt;!-- comment --&gt;', '// comment', '/* comment */', 'Both B and C'],
              correctAnswer: 3,
              explanation: 'JavaScript supports both single-line comments (//) and multi-line comments (/* */).'
            },
            {
              id: 'q3',
              question: 'Which method is used to display a message in the browser console?',
              options: ['alert()', 'print()', 'console.log()', 'display()'],
              correctAnswer: 2,
              explanation: 'console.log() is used to output messages to the browser\'s developer console.'
            },
            {
              id: 'q4',
              question: 'What does DOM stand for?',
              options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Model', 'Document Oriented Model'],
              correctAnswer: 0,
              explanation: 'DOM stands for Document Object Model, which represents the HTML document structure.'
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

    // Create dependencies (CSS depends on HTML, JavaScript can be learned independently)
    const { error: depError } = await supabase
      .from('concept_dependencies')
      .insert([{
        concept_id: createdConcepts[1].id, // CSS Fundamentals
        prerequisite_id: createdConcepts[0].id, // HTML Basics
      }]);

    if (depError) {
      console.error('Error creating dependency:', depError);
    } else {
      console.log('Created dependency: HTML Basics -> CSS Fundamentals');
    }

    console.log('✅ Sample data created successfully!');
    console.log('You can now visit http://localhost:3000 to see your learning platform in action.');

  } catch (error) {
    console.error('Error creating sample data:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createSampleData();
}
