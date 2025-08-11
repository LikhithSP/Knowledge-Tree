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

async function createDataScienceRoadmap() {
  console.log('Creating Data Science roadmap...');

  try {
    // Create Data Science roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Data Science',
        description: 'Master the art of extracting insights from data',
        icon: 'chart-bar'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Data Science concepts
    const concepts = [
      {
        title: 'Statistics Fundamentals',
        short_description: 'Essential statistical concepts for data analysis',
        article_content: `
          <h3>Why Statistics Matter in Data Science</h3>
          <p>Statistics provides the mathematical foundation for making sense of data, testing hypotheses, and making predictions. It's the backbone of data science.</p>
          
          <h3>Descriptive Statistics</h3>
          <ul>
            <li><strong>Mean:</strong> Average value of a dataset</li>
            <li><strong>Median:</strong> Middle value when data is sorted</li>
            <li><strong>Mode:</strong> Most frequently occurring value</li>
            <li><strong>Standard Deviation:</strong> Measure of data spread</li>
            <li><strong>Variance:</strong> Square of standard deviation</li>
          </ul>
          
          <h3>Data Distribution</h3>
          <ul>
            <li><strong>Normal Distribution:</strong> Bell-shaped curve, many natural phenomena follow this</li>
            <li><strong>Skewness:</strong> Asymmetry in data distribution</li>
            <li><strong>Kurtosis:</strong> Measure of tail heaviness</li>
          </ul>
          
          <h3>Probability Basics</h3>
          <ul>
            <li><strong>Probability:</strong> Likelihood of an event (0 to 1)</li>
            <li><strong>Conditional Probability:</strong> P(A|B) - probability of A given B</li>
            <li><strong>Bayes' Theorem:</strong> Foundation for many ML algorithms</li>
          </ul>
          
          <h3>Hypothesis Testing</h3>
          <ul>
            <li><strong>Null Hypothesis:</strong> Assumption of no effect</li>
            <li><strong>Alternative Hypothesis:</strong> What you're trying to prove</li>
            <li><strong>P-value:</strong> Probability of seeing results if null is true</li>
            <li><strong>Confidence Intervals:</strong> Range of plausible values</li>
          </ul>
          
          <h3>Correlation vs Causation</h3>
          <p>Remember: correlation does not imply causation. Two variables can be correlated without one causing the other.</p>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the difference between mean and median?',
              options: ['They are the same thing', 'Mean is average, median is middle value', 'Mean is middle value, median is average', 'Mean is for numbers, median is for categories'],
              correctAnswer: 1,
              explanation: 'Mean is the average (sum/count), while median is the middle value when data is sorted.'
            },
            {
              id: 'q2',
              question: 'What does a p-value tell you?',
              options: ['The probability your hypothesis is true', 'The probability of seeing your results if the null hypothesis is true', 'The strength of correlation', 'The sample size needed'],
              correctAnswer: 1,
              explanation: 'P-value is the probability of observing your results (or more extreme) if the null hypothesis were true.'
            },
            {
              id: 'q3',
              question: 'Which statement about correlation and causation is correct?',
              options: ['Correlation always implies causation', 'Causation always implies correlation', 'Correlation never implies causation', 'They are completely unrelated'],
              correctAnswer: 1,
              explanation: 'If A causes B, they will be correlated. However, correlation alone doesn\'t prove causation.'
            },
            {
              id: 'q4',
              question: 'What is standard deviation?',
              options: ['The average value', 'The middle value', 'A measure of data spread', 'The most common value'],
              correctAnswer: 2,
              explanation: 'Standard deviation measures how spread out the data points are from the mean.'
            }
          ]
        }
      },
      {
        title: 'Data Visualization',
        short_description: 'Creating effective charts and graphs to communicate insights',
        article_content: `
          <h3>Why Data Visualization Matters</h3>
          <p>Data visualization transforms numbers into visual stories, making complex patterns and insights immediately accessible. "A picture is worth a thousand words" is especially true in data science.</p>
          
          <h3>Types of Charts and When to Use Them</h3>
          
          <h4>Comparison Charts</h4>
          <ul>
            <li><strong>Bar Chart:</strong> Compare categories (sales by region)</li>
            <li><strong>Column Chart:</strong> Show changes over time</li>
            <li><strong>Line Chart:</strong> Show trends over time</li>
          </ul>
          
          <h4>Distribution Charts</h4>
          <ul>
            <li><strong>Histogram:</strong> Show distribution of continuous data</li>
            <li><strong>Box Plot:</strong> Show quartiles and outliers</li>
            <li><strong>Scatter Plot:</strong> Show relationship between two variables</li>
          </ul>
          
          <h4>Composition Charts</h4>
          <ul>
            <li><strong>Pie Chart:</strong> Show parts of a whole (use sparingly!)</li>
            <li><strong>Stacked Bar:</strong> Show composition over categories</li>
            <li><strong>Treemap:</strong> Show hierarchical data</li>
          </ul>
          
          <h3>Design Principles</h3>
          <ul>
            <li><strong>Clarity:</strong> Make the main message obvious</li>
            <li><strong>Accuracy:</strong> Don't mislead with axis tricks</li>
            <li><strong>Efficiency:</strong> Maximize data-to-ink ratio</li>
            <li><strong>Color:</strong> Use color purposefully, consider colorblind users</li>
          </ul>
          
          <h3>Popular Tools</h3>
          <ul>
            <li><strong>Python:</strong> Matplotlib, Seaborn, Plotly</li>
            <li><strong>R:</strong> ggplot2, plotly</li>
            <li><strong>JavaScript:</strong> D3.js, Chart.js</li>
            <li><strong>BI Tools:</strong> Tableau, Power BI</li>
          </ul>
          
          <h3>Common Mistakes to Avoid</h3>
          <ul>
            <li>Using 3D effects unnecessarily</li>
            <li>Starting bar charts at non-zero</li>
            <li>Using too many colors</li>
            <li>Making charts too cluttered</li>
            <li>Not labeling axes clearly</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which chart type is best for showing trends over time?',
              options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'],
              correctAnswer: 2,
              explanation: 'Line charts are ideal for showing trends and changes over time periods.'
            },
            {
              id: 'q2',
              question: 'What is the main problem with pie charts?',
              options: ['They look unprofessional', 'Hard to compare slice sizes accurately', 'They take too long to create', 'They only work with small datasets'],
              correctAnswer: 1,
              explanation: 'Humans are poor at comparing angles and areas, making it hard to accurately compare pie chart slices.'
            },
            {
              id: 'q3',
              question: 'What does "data-to-ink ratio" mean?',
              options: ['How much data fits on a page', 'Proportion of chart devoted to displaying data vs decoration', 'Cost of printing charts', 'Time to create visualizations'],
              correctAnswer: 1,
              explanation: 'Data-to-ink ratio refers to maximizing the portion of a chart that actually displays data versus decorative elements.'
            },
            {
              id: 'q4',
              question: 'Which chart type best shows the relationship between two continuous variables?',
              options: ['Bar chart', 'Pie chart', 'Scatter plot', 'Histogram'],
              correctAnswer: 2,
              explanation: 'Scatter plots are perfect for showing relationships between two continuous variables.'
            }
          ]
        }
      },
      {
        title: 'Python for Data Science',
        short_description: 'Master Python libraries essential for data analysis',
        article_content: `
          <h3>Why Python for Data Science?</h3>
          <p>Python has become the most popular language for data science due to its simplicity, extensive libraries, and strong community support.</p>
          
          <h3>Essential Libraries</h3>
          
          <h4>NumPy</h4>
          <ul>
            <li>Foundation for numerical computing</li>
            <li>Efficient arrays and mathematical operations</li>
            <li>Broadcasting for element-wise operations</li>
          </ul>
          
          <h4>Pandas</h4>
          <ul>
            <li>Data manipulation and analysis</li>
            <li>DataFrames for structured data</li>
            <li>Reading/writing various file formats</li>
            <li>Data cleaning and transformation</li>
          </ul>
          
          <h4>Matplotlib & Seaborn</h4>
          <ul>
            <li>Data visualization</li>
            <li>Statistical plotting</li>
            <li>Customizable charts and graphs</li>
          </ul>
          
          <h4>Scikit-learn</h4>
          <ul>
            <li>Machine learning algorithms</li>
            <li>Model evaluation tools</li>
            <li>Data preprocessing utilities</li>
          </ul>
          
          <h3>Common Data Science Workflow</h3>
          <ol>
            <li><strong>Data Collection:</strong> APIs, databases, files</li>
            <li><strong>Data Exploration:</strong> Understanding structure and quality</li>
            <li><strong>Data Cleaning:</strong> Handling missing values, outliers</li>
            <li><strong>Feature Engineering:</strong> Creating new meaningful variables</li>
            <li><strong>Analysis/Modeling:</strong> Statistical analysis or ML</li>
            <li><strong>Visualization:</strong> Communicating results</li>
            <li><strong>Deployment:</strong> Making insights actionable</li>
          </ol>
          
          <h3>Key Pandas Operations</h3>
          <ul>
            <li><strong>Loading Data:</strong> pd.read_csv(), pd.read_excel()</li>
            <li><strong>Exploring:</strong> .head(), .info(), .describe()</li>
            <li><strong>Filtering:</strong> df[condition], .query()</li>
            <li><strong>Grouping:</strong> .groupby().agg()</li>
            <li><strong>Merging:</strong> pd.merge(), .join()</li>
          </ul>
          
          <h3>Best Practices</h3>
          <ul>
            <li>Use Jupyter notebooks for exploration</li>
            <li>Document your code and assumptions</li>
            <li>Version control your data and code</li>
            <li>Validate data quality early</li>
            <li>Create reproducible analysis</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which library is the foundation for numerical computing in Python?',
              options: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
              correctAnswer: 1,
              explanation: 'NumPy provides the foundation for numerical computing with efficient array operations.'
            },
            {
              id: 'q2',
              question: 'What is the main data structure in Pandas?',
              options: ['Array', 'List', 'DataFrame', 'Dictionary'],
              correctAnswer: 2,
              explanation: 'DataFrame is the primary data structure in Pandas for handling structured, tabular data.'
            },
            {
              id: 'q3',
              question: 'Which step typically comes first in the data science workflow?',
              options: ['Modeling', 'Visualization', 'Data Collection', 'Feature Engineering'],
              correctAnswer: 2,
              explanation: 'Data Collection is typically the first step - you need data before you can analyze it.'
            },
            {
              id: 'q4',
              question: 'What is the purpose of the .describe() method in Pandas?',
              options: ['Load data from file', 'Get summary statistics', 'Create visualizations', 'Remove missing values'],
              correctAnswer: 1,
              explanation: '.describe() provides summary statistics like count, mean, std, min, max for numerical columns.'
            }
          ]
        }
      },
      {
        title: 'Data Cleaning & Preprocessing',
        short_description: 'Prepare messy real-world data for analysis',
        article_content: `
          <h3>Why Data Cleaning Matters</h3>
          <p>Real-world data is messy. Data scientists spend 70-80% of their time cleaning and preparing data. Quality insights require quality data.</p>
          
          <h3>Common Data Quality Issues</h3>
          
          <h4>Missing Data</h4>
          <ul>
            <li><strong>Missing Completely at Random (MCAR):</strong> No pattern to missingness</li>
            <li><strong>Missing at Random (MAR):</strong> Missingness depends on observed data</li>
            <li><strong>Missing Not at Random (MNAR):</strong> Missingness depends on unobserved data</li>
          </ul>
          
          <h4>Handling Missing Data</h4>
          <ul>
            <li><strong>Deletion:</strong> Remove rows/columns with missing values</li>
            <li><strong>Imputation:</strong> Fill with mean, median, mode, or predicted values</li>
            <li><strong>Indicator Variables:</strong> Create flags for missingness</li>
          </ul>
          
          <h3>Data Type Issues</h3>
          <ul>
            <li><strong>Wrong Types:</strong> Numbers stored as strings</li>
            <li><strong>Date Formats:</strong> Inconsistent date representations</li>
            <li><strong>Categorical Encoding:</strong> Converting categories to numbers</li>
          </ul>
          
          <h3>Outlier Detection and Treatment</h3>
          <ul>
            <li><strong>Statistical Methods:</strong> Z-score, IQR method</li>
            <li><strong>Visual Methods:</strong> Box plots, scatter plots</li>
            <li><strong>Treatment Options:</strong> Remove, cap, transform, or keep</li>
          </ul>
          
          <h3>Data Transformation</h3>
          <ul>
            <li><strong>Normalization:</strong> Scale to 0-1 range</li>
            <li><strong>Standardization:</strong> Mean 0, standard deviation 1</li>
            <li><strong>Log Transformation:</strong> Handle skewed data</li>
            <li><strong>Binning:</strong> Convert continuous to categorical</li>
          </ul>
          
          <h3>Text Data Cleaning</h3>
          <ul>
            <li>Remove special characters and punctuation</li>
            <li>Convert to lowercase</li>
            <li>Remove stop words</li>
            <li>Stemming and lemmatization</li>
          </ul>
          
          <h3>Data Validation</h3>
          <ul>
            <li>Check data types and formats</li>
            <li>Verify ranges and constraints</li>
            <li>Look for duplicate records</li>
            <li>Validate relationships between variables</li>
          </ul>
          
          <h3>Tools and Techniques</h3>
          <ul>
            <li><strong>Pandas:</strong> .dropna(), .fillna(), .replace()</li>
            <li><strong>OpenRefine:</strong> GUI tool for data cleaning</li>
            <li><strong>Regular Expressions:</strong> Pattern matching and replacement</li>
            <li><strong>Data Profiling:</strong> Automated quality assessment</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What percentage of time do data scientists typically spend on data cleaning?',
              options: ['20-30%', '40-50%', '70-80%', '90-95%'],
              correctAnswer: 2,
              explanation: 'Data scientists typically spend 70-80% of their time on data cleaning and preparation tasks.'
            },
            {
              id: 'q2',
              question: 'Which method is NOT commonly used for handling missing data?',
              options: ['Deletion', 'Imputation', 'Encryption', 'Indicator variables'],
              correctAnswer: 2,
              explanation: 'Encryption is for data security, not for handling missing values. Common methods are deletion, imputation, and indicator variables.'
            },
            {
              id: 'q3',
              question: 'What does standardization do to data?',
              options: ['Scales to 0-1 range', 'Makes mean 0 and std 1', 'Removes outliers', 'Converts to categories'],
              correctAnswer: 1,
              explanation: 'Standardization (z-score normalization) transforms data to have mean 0 and standard deviation 1.'
            },
            {
              id: 'q4',
              question: 'Which technique is used for outlier detection?',
              options: ['Log transformation', 'IQR method', 'Stemming', 'Binning'],
              correctAnswer: 1,
              explanation: 'The IQR (Interquartile Range) method is a common statistical technique for detecting outliers.'
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
      { concept: 1, prerequisite: 0 }, // Data Visualization depends on Statistics Fundamentals
      { concept: 2, prerequisite: 0 }, // Python for Data Science depends on Statistics Fundamentals
      { concept: 3, prerequisite: 2 }, // Data Cleaning depends on Python for Data Science
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

    console.log('✅ Data Science roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Data Science roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createDataScienceRoadmap();
}
