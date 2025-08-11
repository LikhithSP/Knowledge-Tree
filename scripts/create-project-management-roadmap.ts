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

async function createProjectManagementRoadmap() {
  console.log('Creating Project Management roadmap...');

  try {
    // Create Project Management roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Project Management',
        description: 'Learn to lead teams and deliver successful projects',
        icon: 'clipboard-document-list'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Project Management concepts
    const concepts = [
      {
        title: 'Project Management Fundamentals',
        short_description: 'Core concepts and principles of effective project management',
        article_content: `
          <h3>What is Project Management?</h3>
          <p>Project management is the application of knowledge, skills, tools, and techniques to project activities to meet project requirements. It involves initiating, planning, executing, monitoring, and closing projects.</p>
          
          <h3>What is a Project?</h3>
          <ul>
            <li><strong>Temporary:</strong> Has a defined beginning and end</li>
            <li><strong>Unique:</strong> Creates a unique product, service, or result</li>
            <li><strong>Progressive Elaboration:</strong> Developed in steps and continues by increments</li>
            <li><strong>Purpose:</strong> Undertaken to achieve specific objectives</li>
          </ul>
          
          <h3>Project vs Operations</h3>
          
          <h4>Projects</h4>
          <ul>
            <li>Temporary with defined start and end dates</li>
            <li>Unique deliverables</li>
            <li>Cross-functional teams</li>
            <li>Limited resources and budget</li>
          </ul>
          
          <h4>Operations</h4>
          <ul>
            <li>Ongoing and repetitive activities</li>
            <li>Standardized processes</li>
            <li>Functional departments</li>
            <li>Continuous resources</li>
          </ul>
          
          <h3>Project Management Life Cycle</h3>
          
          <h4>Initiating</h4>
          <ul>
            <li>Define project purpose and scope</li>
            <li>Identify stakeholders</li>
            <li>Develop project charter</li>
            <li>Authorize project to begin</li>
          </ul>
          
          <h4>Planning</h4>
          <ul>
            <li>Develop project management plan</li>
            <li>Define scope, schedule, and budget</li>
            <li>Identify risks and mitigation strategies</li>
            <li>Plan resources and communications</li>
          </ul>
          
          <h4>Executing</h4>
          <ul>
            <li>Direct and manage project work</li>
            <li>Coordinate resources and activities</li>
            <li>Manage stakeholder engagement</li>
            <li>Implement planned activities</li>
          </ul>
          
          <h4>Monitoring and Controlling</h4>
          <ul>
            <li>Track project performance</li>
            <li>Monitor scope, schedule, and budget</li>
            <li>Manage changes and issues</li>
            <li>Ensure quality standards</li>
          </ul>
          
          <h4>Closing</h4>
          <ul>
            <li>Finalize all project activities</li>
            <li>Hand over deliverables</li>
            <li>Document lessons learned</li>
            <li>Release project resources</li>
          </ul>
          
          <h3>Key Project Constraints</h3>
          
          <h4>Triple Constraint (Iron Triangle)</h4>
          <ul>
            <li><strong>Scope:</strong> What work will be done</li>
            <li><strong>Time:</strong> When the project will be completed</li>
            <li><strong>Cost:</strong> How much the project will cost</li>
          </ul>
          
          <h4>Extended Constraints</h4>
          <ul>
            <li><strong>Quality:</strong> Standards and acceptance criteria</li>
            <li><strong>Resources:</strong> People, equipment, materials</li>
            <li><strong>Risk:</strong> Uncertainty and potential issues</li>
          </ul>
          
          <h3>Project Stakeholders</h3>
          <ul>
            <li><strong>Project Sponsor:</strong> Provides funding and support</li>
            <li><strong>Project Manager:</strong> Leads and manages the project</li>
            <li><strong>Project Team:</strong> Performs the work</li>
            <li><strong>Customers/Users:</strong> Will use the final product</li>
            <li><strong>Functional Managers:</strong> Provide resources</li>
            <li><strong>Vendors/Suppliers:</strong> Provide external services</li>
          </ul>
          
          <h3>Project Manager Roles and Responsibilities</h3>
          <ul>
            <li><strong>Planning:</strong> Develop comprehensive project plans</li>
            <li><strong>Leadership:</strong> Guide and motivate the team</li>
            <li><strong>Communication:</strong> Facilitate information flow</li>
            <li><strong>Problem Solving:</strong> Address issues and obstacles</li>
            <li><strong>Decision Making:</strong> Make informed project decisions</li>
            <li><strong>Risk Management:</strong> Identify and mitigate risks</li>
          </ul>
          
          <h3>Project Success Factors</h3>
          <ul>
            <li><strong>Clear Objectives:</strong> Well-defined goals and scope</li>
            <li><strong>Stakeholder Buy-in:</strong> Support from key stakeholders</li>
            <li><strong>Skilled Team:</strong> Right people with right skills</li>
            <li><strong>Effective Communication:</strong> Open and regular communication</li>
            <li><strong>Risk Management:</strong> Proactive risk identification</li>
            <li><strong>Change Control:</strong> Managed scope changes</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What are the five phases of the project management life cycle?',
              options: ['Start, Plan, Do, Check, Close', 'Initiating, Planning, Executing, Monitoring, Closing', 'Begin, Design, Build, Test, Deploy', 'Analyze, Plan, Implement, Evaluate, Maintain'],
              correctAnswer: 1,
              explanation: 'The five phases are Initiating, Planning, Executing, Monitoring and Controlling, and Closing.'
            },
            {
              id: 'q2',
              question: 'What is the "triple constraint" in project management?',
              options: ['People, Process, Technology', 'Quality, Risk, Resources', 'Scope, Time, Cost', 'Planning, Executing, Monitoring'],
              correctAnswer: 2,
              explanation: 'The triple constraint consists of Scope (what), Time (when), and Cost (how much) - changes to one affect the others.'
            },
            {
              id: 'q3',
              question: 'What makes a project different from operations?',
              options: ['Projects are more important', 'Projects are temporary and unique', 'Projects cost more money', 'Projects involve more people'],
              correctAnswer: 1,
              explanation: 'Projects are temporary (have defined start and end dates) and create unique deliverables, unlike ongoing operations.'
            },
            {
              id: 'q4',
              question: 'Who typically provides funding and high-level support for a project?',
              options: ['Project Manager', 'Project Team', 'Project Sponsor', 'End Users'],
              correctAnswer: 2,
              explanation: 'The Project Sponsor typically provides funding, high-level support, and serves as the champion for the project.'
            }
          ]
        }
      },
      {
        title: 'Agile and Scrum Methodology',
        short_description: 'Master iterative development and team collaboration frameworks',
        article_content: `
          <h3>Introduction to Agile</h3>
          <p>Agile is a project management and software development approach that emphasizes flexibility, collaboration, and rapid delivery of working solutions through iterative development cycles.</p>
          
          <h3>Agile Manifesto</h3>
          <p>The Agile Manifesto values:</p>
          <ul>
            <li><strong>Individuals and interactions</strong> over processes and tools</li>
            <li><strong>Working software</strong> over comprehensive documentation</li>
            <li><strong>Customer collaboration</strong> over contract negotiation</li>
            <li><strong>Responding to change</strong> over following a plan</li>
          </ul>
          
          <h3>Agile Principles</h3>
          <ul>
            <li>Satisfy customers through early and continuous delivery</li>
            <li>Welcome changing requirements, even late in development</li>
            <li>Deliver working software frequently</li>
            <li>Business people and developers work together daily</li>
            <li>Build projects around motivated individuals</li>
            <li>Face-to-face conversation is the best communication</li>
            <li>Working software is the primary measure of progress</li>
            <li>Sustainable development pace</li>
            <li>Continuous attention to technical excellence</li>
            <li>Simplicity - maximize work not done</li>
            <li>Self-organizing teams</li>
            <li>Regular reflection and adjustment</li>
          </ul>
          
          <h3>What is Scrum?</h3>
          <p>Scrum is the most popular Agile framework for managing product development. It provides a structure for teams to work together and deliver products iteratively and incrementally.</p>
          
          <h3>Scrum Roles</h3>
          
          <h4>Product Owner</h4>
          <ul>
            <li>Defines product vision and roadmap</li>
            <li>Manages and prioritizes product backlog</li>
            <li>Accepts or rejects work results</li>
            <li>Represents stakeholder interests</li>
          </ul>
          
          <h4>Scrum Master</h4>
          <ul>
            <li>Facilitates Scrum events and processes</li>
            <li>Removes impediments for the team</li>
            <li>Coaches team on Scrum practices</li>
            <li>Protects team from external distractions</li>
          </ul>
          
          <h4>Development Team</h4>
          <ul>
            <li>Cross-functional and self-organizing</li>
            <li>Develops and delivers the product</li>
            <li>Estimates work and commits to sprint goals</li>
            <li>Collaborates to solve problems</li>
          </ul>
          
          <h3>Scrum Events</h3>
          
          <h4>Sprint</h4>
          <ul>
            <li>Time-boxed iteration (usually 1-4 weeks)</li>
            <li>Creates potentially releasable increment</li>
            <li>Fixed duration for consistency</li>
            <li>Goal-oriented work period</li>
          </ul>
          
          <h4>Sprint Planning</h4>
          <ul>
            <li>Team plans work for upcoming sprint</li>
            <li>Select items from product backlog</li>
            <li>Create sprint goal and backlog</li>
            <li>Estimate and commit to deliverables</li>
          </ul>
          
          <h4>Daily Scrum</h4>
          <ul>
            <li>15-minute daily synchronization meeting</li>
            <li>Each member shares: done yesterday, doing today, impediments</li>
            <li>Identify collaboration opportunities</li>
            <li>Adapt daily plan as needed</li>
          </ul>
          
          <h4>Sprint Review</h4>
          <ul>
            <li>Demonstrate completed work to stakeholders</li>
            <li>Gather feedback on product increment</li>
            <li>Discuss what was and wasn't completed</li>
            <li>Collaborate on what to do next</li>
          </ul>
          
          <h4>Sprint Retrospective</h4>
          <ul>
            <li>Team reflects on process and practices</li>
            <li>Identify what went well and what didn't</li>
            <li>Create action items for improvement</li>
            <li>Continuous process improvement</li>
          </ul>
          
          <h3>Scrum Artifacts</h3>
          
          <h4>Product Backlog</h4>
          <ul>
            <li>Prioritized list of features and requirements</li>
            <li>Managed by Product Owner</li>
            <li>Continuously refined and updated</li>
            <li>Source of work for the team</li>
          </ul>
          
          <h4>Sprint Backlog</h4>
          <ul>
            <li>Items selected for current sprint</li>
            <li>Includes tasks needed to complete items</li>
            <li>Owned by Development Team</li>
            <li>Updated throughout sprint</li>
          </ul>
          
          <h4>Product Increment</h4>
          <ul>
            <li>Sum of all completed backlog items</li>
            <li>Must be potentially releasable</li>
            <li>Meets Definition of Done</li>
            <li>Demonstrates progress toward goal</li>
          </ul>
          
          <h3>Other Agile Frameworks</h3>
          
          <h4>Kanban</h4>
          <ul>
            <li>Visual workflow management</li>
            <li>Continuous flow vs time-boxed sprints</li>
            <li>Work-in-progress limits</li>
            <li>Pull-based system</li>
          </ul>
          
          <h4>Lean</h4>
          <ul>
            <li>Eliminate waste and maximize value</li>
            <li>Deliver as fast as possible</li>
            <li>Build quality in</li>
            <li>Learn and improve continuously</li>
          </ul>
          
          <h4>Extreme Programming (XP)</h4>
          <ul>
            <li>Engineering practices focus</li>
            <li>Test-driven development</li>
            <li>Pair programming</li>
            <li>Continuous integration</li>
          </ul>
          
          <h3>Benefits of Agile</h3>
          <ul>
            <li><strong>Faster Time to Market:</strong> Early and frequent delivery</li>
            <li><strong>Higher Quality:</strong> Continuous testing and feedback</li>
            <li><strong>Better Risk Management:</strong> Early issue identification</li>
            <li><strong>Improved Customer Satisfaction:</strong> Regular collaboration</li>
            <li><strong>Team Morale:</strong> Self-organizing, empowered teams</li>
            <li><strong>Adaptability:</strong> Respond quickly to changes</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does the Agile Manifesto value over processes and tools?',
              options: ['Documentation', 'Individuals and interactions', 'Following a plan', 'Contract negotiation'],
              correctAnswer: 1,
              explanation: 'The Agile Manifesto values "Individuals and interactions over processes and tools".'
            },
            {
              id: 'q2',
              question: 'Who is responsible for managing the product backlog in Scrum?',
              options: ['Scrum Master', 'Development Team', 'Product Owner', 'Project Manager'],
              correctAnswer: 2,
              explanation: 'The Product Owner is responsible for managing and prioritizing the product backlog.'
            },
            {
              id: 'q3',
              question: 'How long is a typical Daily Scrum meeting?',
              options: ['5 minutes', '15 minutes', '30 minutes', '1 hour'],
              correctAnswer: 1,
              explanation: 'The Daily Scrum is time-boxed to 15 minutes for quick synchronization.'
            },
            {
              id: 'q4',
              question: 'What is the main purpose of a Sprint Retrospective?',
              options: ['Demonstrate completed work', 'Plan the next sprint', 'Reflect on process and identify improvements', 'Remove impediments'],
              correctAnswer: 2,
              explanation: 'Sprint Retrospective is for the team to reflect on their process and identify ways to improve.'
            }
          ]
        }
      },
      {
        title: 'Risk Management',
        short_description: 'Identify, assess, and mitigate project risks effectively',
        article_content: `
          <h3>What is Risk Management?</h3>
          <p>Risk management is the process of identifying, analyzing, and responding to risk factors throughout the life of a project. It includes maximizing positive events and minimizing negative ones.</p>
          
          <h3>What is a Risk?</h3>
          <ul>
            <li><strong>Uncertain Event:</strong> May or may not occur</li>
            <li><strong>Impact on Objectives:</strong> Affects project scope, schedule, cost, or quality</li>
            <li><strong>Probability:</strong> Has a measurable likelihood of occurrence</li>
            <li><strong>Can be Positive or Negative:</strong> Threats or opportunities</li>
          </ul>
          
          <h3>Risk vs Issue</h3>
          
          <h4>Risk</h4>
          <ul>
            <li>Uncertain future event</li>
            <li>Has not yet occurred</li>
            <li>Has probability of occurrence</li>
            <li>Requires risk response planning</li>
          </ul>
          
          <h4>Issue</h4>
          <ul>
            <li>Current problem or obstacle</li>
            <li>Has already occurred</li>
            <li>Requires immediate action</li>
            <li>Needs issue resolution</li>
          </ul>
          
          <h3>Risk Management Process</h3>
          
          <h4>1. Risk Identification</h4>
          <ul>
            <li><strong>Brainstorming:</strong> Team sessions to identify risks</li>
            <li><strong>Expert Interviews:</strong> Consult subject matter experts</li>
            <li><strong>Historical Data:</strong> Learn from past projects</li>
            <li><strong>Checklists:</strong> Use standardized risk categories</li>
            <li><strong>Documentation Review:</strong> Analyze project documents</li>
          </ul>
          
          <h4>2. Risk Analysis</h4>
          
          <h5>Qualitative Analysis</h5>
          <ul>
            <li><strong>Probability Assessment:</strong> High, Medium, Low likelihood</li>
            <li><strong>Impact Assessment:</strong> High, Medium, Low severity</li>
            <li><strong>Risk Matrix:</strong> Combine probability and impact</li>
            <li><strong>Risk Ranking:</strong> Prioritize risks for attention</li>
          </ul>
          
          <h5>Quantitative Analysis</h5>
          <ul>
            <li><strong>Monetary Impact:</strong> Dollar value of potential loss</li>
            <li><strong>Schedule Impact:</strong> Days of potential delay</li>
            <li><strong>Probability Distribution:</strong> Statistical modeling</li>
            <li><strong>Monte Carlo Simulation:</strong> Complex scenario analysis</li>
          </ul>
          
          <h4>3. Risk Response Planning</h4>
          
          <h5>Negative Risk Strategies</h5>
          <ul>
            <li><strong>Avoid:</strong> Eliminate the risk by changing the plan</li>
            <li><strong>Mitigate:</strong> Reduce probability or impact</li>
            <li><strong>Transfer:</strong> Shift risk to third party (insurance, contract)</li>
            <li><strong>Accept:</strong> Acknowledge risk and take no action</li>
          </ul>
          
          <h5>Positive Risk (Opportunity) Strategies</h5>
          <ul>
            <li><strong>Exploit:</strong> Ensure opportunity occurs</li>
            <li><strong>Enhance:</strong> Increase probability or positive impact</li>
            <li><strong>Share:</strong> Partner with others to realize opportunity</li>
            <li><strong>Accept:</strong> Take advantage if opportunity occurs</li>
          </ul>
          
          <h4>4. Risk Monitoring and Control</h4>
          <ul>
            <li><strong>Track Identified Risks:</strong> Monitor probability and impact changes</li>
            <li><strong>Execute Response Plans:</strong> Implement planned responses</li>
            <li><strong>Identify New Risks:</strong> Continuously scan for emerging risks</li>
            <li><strong>Update Risk Register:</strong> Maintain current risk information</li>
          </ul>
          
          <h3>Common Project Risk Categories</h3>
          
          <h4>Technical Risks</h4>
          <ul>
            <li>Technology challenges and complexities</li>
            <li>Integration difficulties</li>
            <li>Performance requirements</li>
            <li>Quality and reliability issues</li>
          </ul>
          
          <h4>Schedule Risks</h4>
          <ul>
            <li>Unrealistic timelines</li>
            <li>Resource availability</li>
            <li>Dependency on external parties</li>
            <li>Scope creep and changes</li>
          </ul>
          
          <h4>Budget/Cost Risks</h4>
          <ul>
            <li>Inaccurate cost estimates</li>
            <li>Currency fluctuations</li>
            <li>Resource cost increases</li>
            <li>Unexpected expenses</li>
          </ul>
          
          <h4>Resource Risks</h4>
          <ul>
            <li>Key personnel unavailability</li>
            <li>Skill shortages</li>
            <li>Equipment failures</li>
            <li>Supplier problems</li>
          </ul>
          
          <h4>External Risks</h4>
          <ul>
            <li>Regulatory changes</li>
            <li>Market conditions</li>
            <li>Natural disasters</li>
            <li>Political instability</li>
          </ul>
          
          <h3>Risk Register</h3>
          <p>A risk register is a document that contains information about identified risks, including:</p>
          <ul>
            <li><strong>Risk ID:</strong> Unique identifier</li>
            <li><strong>Risk Description:</strong> Clear description of the risk</li>
            <li><strong>Category:</strong> Type of risk</li>
            <li><strong>Probability:</strong> Likelihood of occurrence</li>
            <li><strong>Impact:</strong> Effect on project objectives</li>
            <li><strong>Risk Score:</strong> Probability × Impact</li>
            <li><strong>Response Strategy:</strong> Planned response</li>
            <li><strong>Owner:</strong> Person responsible for managing the risk</li>
            <li><strong>Status:</strong> Current state of the risk</li>
          </ul>
          
          <h3>Risk Communication</h3>
          <ul>
            <li><strong>Regular Reporting:</strong> Include risks in status reports</li>
            <li><strong>Risk Reviews:</strong> Dedicated risk assessment meetings</li>
            <li><strong>Escalation Procedures:</strong> When and how to escalate</li>
            <li><strong>Stakeholder Awareness:</strong> Keep stakeholders informed</li>
          </ul>
          
          <h3>Best Practices</h3>
          <ul>
            <li><strong>Early and Continuous:</strong> Start risk management early and continue throughout</li>
            <li><strong>Team Involvement:</strong> Engage entire team in risk identification</li>
            <li><strong>Regular Updates:</strong> Keep risk information current</li>
            <li><strong>Action-Oriented:</strong> Focus on actionable response plans</li>
            <li><strong>Document Lessons:</strong> Capture learnings for future projects</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the difference between a risk and an issue?',
              options: ['There is no difference', 'A risk is uncertain and future, an issue has already occurred', 'A risk is more serious than an issue', 'An issue affects budget, a risk affects schedule'],
              correctAnswer: 1,
              explanation: 'A risk is an uncertain future event that may or may not occur, while an issue is a current problem that has already happened.'
            },
            {
              id: 'q2',
              question: 'Which risk response strategy involves shifting the risk to a third party?',
              options: ['Avoid', 'Mitigate', 'Transfer', 'Accept'],
              correctAnswer: 2,
              explanation: 'Transfer involves shifting the risk to a third party, such as through insurance or contractual agreements.'
            },
            {
              id: 'q3',
              question: 'What is the risk score typically calculated as?',
              options: ['Impact - Probability', 'Impact + Probability', 'Impact × Probability', 'Impact ÷ Probability'],
              correctAnswer: 2,
              explanation: 'Risk score is typically calculated as Probability × Impact to prioritize risks for attention.'
            },
            {
              id: 'q4',
              question: 'Which is NOT a positive risk (opportunity) response strategy?',
              options: ['Exploit', 'Enhance', 'Mitigate', 'Share'],
              correctAnswer: 2,
              explanation: 'Mitigate is a negative risk strategy to reduce probability or impact. For opportunities, you would use Enhance instead.'
            }
          ]
        }
      },
      {
        title: 'Team Leadership & Communication',
        short_description: 'Lead effective teams and communicate successfully in projects',
        article_content: `
          <h3>Project Leadership</h3>
          <p>Project leadership involves inspiring and guiding team members to achieve project objectives while fostering collaboration, motivation, and high performance.</p>
          
          <h3>Leadership vs Management</h3>
          
          <h4>Leadership</h4>
          <ul>
            <li><strong>Vision:</strong> Creating and communicating direction</li>
            <li><strong>Inspiration:</strong> Motivating and energizing people</li>
            <li><strong>Influence:</strong> Building relationships and trust</li>
            <li><strong>Change:</strong> Driving transformation and innovation</li>
            <li><strong>People-focused:</strong> Developing and empowering individuals</li>
          </ul>
          
          <h4>Management</h4>
          <ul>
            <li><strong>Planning:</strong> Organizing resources and activities</li>
            <li><strong>Control:</strong> Monitoring progress and performance</li>
            <li><strong>Authority:</strong> Using position and formal power</li>
            <li><strong>Stability:</strong> Maintaining processes and systems</li>
            <li><strong>Task-focused:</strong> Ensuring work gets done</li>
          </ul>
          
          <h3>Leadership Styles</h3>
          
          <h4>Situational Leadership</h4>
          <ul>
            <li><strong>Directing:</strong> High task, low relationship (new team members)</li>
            <li><strong>Coaching:</strong> High task, high relationship (developing skills)</li>
            <li><strong>Supporting:</strong> Low task, high relationship (competent but unmotivated)</li>
            <li><strong>Delegating:</strong> Low task, low relationship (experienced and motivated)</li>
          </ul>
          
          <h4>Transformational Leadership</h4>
          <ul>
            <li><strong>Idealized Influence:</strong> Being a role model</li>
            <li><strong>Inspirational Motivation:</strong> Creating compelling visions</li>
            <li><strong>Intellectual Stimulation:</strong> Encouraging innovation</li>
            <li><strong>Individual Consideration:</strong> Coaching and mentoring</li>
          </ul>
          
          <h3>Team Development</h3>
          
          <h4>Tuckman Model of Team Development</h4>
          
          <h5>Forming</h5>
          <ul>
            <li>Team members get acquainted</li>
            <li>Roles and responsibilities unclear</li>
            <li>High dependence on leader</li>
            <li>Little work accomplished</li>
          </ul>
          
          <h5>Storming</h5>
          <ul>
            <li>Conflicts and disagreements emerge</li>
            <li>Power struggles and competition</li>
            <li>Challenging leader's authority</li>
            <li>Progress may be limited</li>
          </ul>
          
          <h5>Norming</h5>
          <ul>
            <li>Team develops working agreements</li>
            <li>Roles and processes clarified</li>
            <li>Increased trust and collaboration</li>
            <li>Focus on team goals</li>
          </ul>
          
          <h5>Performing</h5>
          <ul>
            <li>High performance and productivity</li>
            <li>Self-organizing and autonomous</li>
            <li>Strong team identity</li>
            <li>Effective problem-solving</li>
          </ul>
          
          <h5>Adjourning</h5>
          <ul>
            <li>Project completion and disbandment</li>
            <li>Celebrate achievements</li>
            <li>Document lessons learned</li>
            <li>Transition team members</li>
          </ul>
          
          <h3>Communication Fundamentals</h3>
          
          <h4>Communication Process</h4>
          <ul>
            <li><strong>Sender:</strong> Person sending the message</li>
            <li><strong>Encoding:</strong> Converting thoughts into words</li>
            <li><strong>Message:</strong> Information being communicated</li>
            <li><strong>Medium:</strong> Channel used to send message</li>
            <li><strong>Receiver:</strong> Person receiving the message</li>
            <li><strong>Decoding:</strong> Interpreting the message</li>
            <li><strong>Feedback:</strong> Response from receiver</li>
            <li><strong>Noise:</strong> Anything that interferes with communication</li>
          </ul>
          
          <h4>Types of Communication</h4>
          
          <h5>Verbal Communication</h5>
          <ul>
            <li><strong>Face-to-face:</strong> Most effective for complex topics</li>
            <li><strong>Phone calls:</strong> Quick discussions and clarifications</li>
            <li><strong>Video conferences:</strong> Virtual face-to-face interaction</li>
            <li><strong>Presentations:</strong> Formal information sharing</li>
          </ul>
          
          <h5>Written Communication</h5>
          <ul>
            <li><strong>Emails:</strong> Formal business communication</li>
            <li><strong>Reports:</strong> Status updates and formal documentation</li>
            <li><strong>Instant messaging:</strong> Quick informal communication</li>
            <li><strong>Documentation:</strong> Requirements, procedures, plans</li>
          </ul>
          
          <h5>Non-verbal Communication</h5>
          <ul>
            <li><strong>Body language:</strong> Posture, gestures, facial expressions</li>
            <li><strong>Tone of voice:</strong> Emotion and emphasis</li>
            <li><strong>Personal space:</strong> Physical distance preferences</li>
            <li><strong>Eye contact:</strong> Attention and engagement</li>
          </ul>
          
          <h3>Communication Planning</h3>
          
          <h4>Stakeholder Analysis</h4>
          <ul>
            <li><strong>Identify stakeholders:</strong> Who needs information</li>
            <li><strong>Information needs:</strong> What they need to know</li>
            <li><strong>Communication preferences:</strong> How they prefer to receive information</li>
            <li><strong>Frequency:</strong> How often they need updates</li>
          </ul>
          
          <h4>Communication Methods</h4>
          <ul>
            <li><strong>Push:</strong> Send information to recipients (email, reports)</li>
            <li><strong>Pull:</strong> Recipients access information when needed (wiki, portal)</li>
            <li><strong>Interactive:</strong> Real-time exchange (meetings, video calls)</li>
          </ul>
          
          <h3>Effective Communication Techniques</h3>
          
          <h4>Active Listening</h4>
          <ul>
            <li><strong>Pay attention:</strong> Focus completely on the speaker</li>
            <li><strong>Show engagement:</strong> Nod, maintain eye contact</li>
            <li><strong>Ask questions:</strong> Clarify understanding</li>
            <li><strong>Paraphrase:</strong> Repeat back what you heard</li>
            <li><strong>Avoid interrupting:</strong> Let speaker finish thoughts</li>
          </ul>
          
          <h4>Clear Messaging</h4>
          <ul>
            <li><strong>Be concise:</strong> Get to the point quickly</li>
            <li><strong>Use simple language:</strong> Avoid jargon and technical terms</li>
            <li><strong>Structure information:</strong> Organize logically</li>
            <li><strong>Provide context:</strong> Explain background and relevance</li>
            <li><strong>Include call to action:</strong> Specify what you need</li>
          </ul>
          
          <h3>Managing Difficult Conversations</h3>
          <ul>
            <li><strong>Prepare in advance:</strong> Plan key points and approach</li>
            <li><strong>Choose right setting:</strong> Private, comfortable environment</li>
            <li><strong>Stay calm:</strong> Manage emotions and reactions</li>
            <li><strong>Focus on facts:</strong> Avoid personal attacks</li>
            <li><strong>Listen actively:</strong> Understand other perspectives</li>
            <li><strong>Find common ground:</strong> Identify shared interests</li>
            <li><strong>Document outcomes:</strong> Record agreements and next steps</li>
          </ul>
          
          <h3>Virtual Team Communication</h3>
          <ul>
            <li><strong>Establish norms:</strong> Set expectations for virtual interactions</li>
            <li><strong>Use technology effectively:</strong> Choose right tools for purpose</li>
            <li><strong>Increase frequency:</strong> More frequent check-ins needed</li>
            <li><strong>Be intentional:</strong> More deliberate communication required</li>
            <li><strong>Build relationships:</strong> Invest in personal connections</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'In the Tuckman model, which stage is characterized by conflicts and power struggles?',
              options: ['Forming', 'Storming', 'Norming', 'Performing'],
              correctAnswer: 1,
              explanation: 'Storming is the stage where conflicts and disagreements emerge as team members challenge each other and the leader.'
            },
            {
              id: 'q2',
              question: 'What is the most effective communication method for complex topics?',
              options: ['Email', 'Text message', 'Face-to-face conversation', 'Written report'],
              correctAnswer: 2,
              explanation: 'Face-to-face conversation is most effective for complex topics as it allows for immediate feedback and clarification.'
            },
            {
              id: 'q3',
              question: 'Which leadership style is best for experienced and motivated team members?',
              options: ['Directing', 'Coaching', 'Supporting', 'Delegating'],
              correctAnswer: 3,
              explanation: 'Delegating is appropriate for experienced and motivated team members who can work independently.'
            },
            {
              id: 'q4',
              question: 'What is active listening?',
              options: ['Talking loudly', 'Interrupting frequently', 'Fully focusing on and engaging with the speaker', 'Multitasking while listening'],
              correctAnswer: 2,
              explanation: 'Active listening involves fully focusing on the speaker, showing engagement, asking questions, and providing feedback.'
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
      { concept: 1, prerequisite: 0 }, // Agile depends on PM Fundamentals
      { concept: 2, prerequisite: 0 }, // Risk Management depends on PM Fundamentals
      { concept: 3, prerequisite: 0 }, // Leadership depends on PM Fundamentals
      { concept: 3, prerequisite: 1 }, // Leadership also depends on Agile
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

    console.log('✅ Project Management roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Project Management roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createProjectManagementRoadmap();
}
