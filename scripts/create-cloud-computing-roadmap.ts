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

async function createCloudComputingRoadmap() {
  console.log('Creating Cloud Computing roadmap...');

  try {
    // Create Cloud Computing roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Cloud Computing',
        description: 'Master modern cloud platforms and services',
        icon: 'cloud'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Cloud Computing concepts
    const concepts = [
      {
        title: 'Cloud Fundamentals',
        short_description: 'Understanding cloud computing concepts and service models',
        article_content: `
          <h3>What is Cloud Computing?</h3>
          <p>Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.</p>
          
          <h3>Key Characteristics</h3>
          <ul>
            <li><strong>On-demand self-service:</strong> Access resources without human interaction</li>
            <li><strong>Broad network access:</strong> Available over the network from various devices</li>
            <li><strong>Resource pooling:</strong> Multi-tenant model with shared resources</li>
            <li><strong>Rapid elasticity:</strong> Scale up or down based on demand</li>
            <li><strong>Measured service:</strong> Pay-per-use model with monitoring</li>
          </ul>
          
          <h3>Cloud Service Models</h3>
          
          <h4>Infrastructure as a Service (IaaS)</h4>
          <ul>
            <li>Provides virtualized computing resources</li>
            <li>You manage: OS, middleware, runtime, data, applications</li>
            <li>Provider manages: Virtualization, servers, storage, networking</li>
            <li><strong>Examples:</strong> AWS EC2, Azure VMs, Google Compute Engine</li>
          </ul>
          
          <h4>Platform as a Service (PaaS)</h4>
          <ul>
            <li>Provides platform for developing and deploying applications</li>
            <li>You manage: Data and applications</li>
            <li>Provider manages: Runtime, middleware, OS, virtualization, servers, storage, networking</li>
            <li><strong>Examples:</strong> AWS Elastic Beanstalk, Azure App Service, Google App Engine</li>
          </ul>
          
          <h4>Software as a Service (SaaS)</h4>
          <ul>
            <li>Complete software solution delivered over the internet</li>
            <li>You manage: Your data and user access</li>
            <li>Provider manages: Everything else</li>
            <li><strong>Examples:</strong> Gmail, Office 365, Salesforce, Dropbox</li>
          </ul>
          
          <h3>Cloud Deployment Models</h3>
          <ul>
            <li><strong>Public Cloud:</strong> Services offered over the public internet</li>
            <li><strong>Private Cloud:</strong> Dedicated cloud infrastructure for single organization</li>
            <li><strong>Hybrid Cloud:</strong> Combination of public and private clouds</li>
            <li><strong>Multi-Cloud:</strong> Using multiple cloud providers</li>
          </ul>
          
          <h3>Benefits of Cloud Computing</h3>
          <ul>
            <li><strong>Cost Efficiency:</strong> Reduce capital expenses</li>
            <li><strong>Scalability:</strong> Scale resources up or down as needed</li>
            <li><strong>Reliability:</strong> Built-in redundancy and backup</li>
            <li><strong>Security:</strong> Professional security measures</li>
            <li><strong>Global Reach:</strong> Deploy applications worldwide</li>
            <li><strong>Innovation:</strong> Access to latest technologies</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which service model provides the most control over the underlying infrastructure?',
              options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
              correctAnswer: 2,
              explanation: 'IaaS (Infrastructure as a Service) provides virtual machines and infrastructure, giving you the most control over the environment.'
            },
            {
              id: 'q2',
              question: 'What does "elasticity" mean in cloud computing?',
              options: ['Data backup capability', 'Ability to scale resources up or down based on demand', 'Network flexibility', 'Cost reduction'],
              correctAnswer: 1,
              explanation: 'Elasticity refers to the ability to automatically scale computing resources up or down based on current demand.'
            },
            {
              id: 'q3',
              question: 'Which is an example of SaaS?',
              options: ['AWS EC2', 'Google App Engine', 'Gmail', 'Azure Virtual Network'],
              correctAnswer: 2,
              explanation: 'Gmail is a Software as a Service (SaaS) offering - a complete application delivered over the internet.'
            },
            {
              id: 'q4',
              question: 'What deployment model combines public and private clouds?',
              options: ['Multi-cloud', 'Hybrid cloud', 'Community cloud', 'Distributed cloud'],
              correctAnswer: 1,
              explanation: 'Hybrid cloud combines public and private cloud environments, allowing data and applications to be shared between them.'
            }
          ]
        }
      },
      {
        title: 'Amazon Web Services (AWS)',
        short_description: 'Learn the world\'s leading cloud platform',
        article_content: `
          <h3>Introduction to AWS</h3>
          <p>Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.</p>
          
          <h3>Core AWS Services</h3>
          
          <h4>Compute Services</h4>
          <ul>
            <li><strong>EC2 (Elastic Compute Cloud):</strong> Virtual servers in the cloud</li>
            <li><strong>Lambda:</strong> Serverless compute for running code without servers</li>
            <li><strong>ECS/EKS:</strong> Container orchestration services</li>
            <li><strong>Elastic Beanstalk:</strong> Platform for deploying web applications</li>
          </ul>
          
          <h4>Storage Services</h4>
          <ul>
            <li><strong>S3 (Simple Storage Service):</strong> Object storage for any amount of data</li>
            <li><strong>EBS (Elastic Block Store):</strong> High-performance block storage</li>
            <li><strong>EFS (Elastic File System):</strong> Scalable file storage</li>
            <li><strong>Glacier:</strong> Low-cost archival storage</li>
          </ul>
          
          <h4>Database Services</h4>
          <ul>
            <li><strong>RDS (Relational Database Service):</strong> Managed relational databases</li>
            <li><strong>DynamoDB:</strong> Fast NoSQL database</li>
            <li><strong>ElastiCache:</strong> In-memory caching</li>
            <li><strong>Redshift:</strong> Data warehouse solution</li>
          </ul>
          
          <h4>Networking Services</h4>
          <ul>
            <li><strong>VPC (Virtual Private Cloud):</strong> Isolated network environment</li>
            <li><strong>CloudFront:</strong> Content delivery network (CDN)</li>
            <li><strong>Route 53:</strong> DNS and domain registration</li>
            <li><strong>API Gateway:</strong> Create and manage APIs</li>
          </ul>
          
          <h3>AWS Global Infrastructure</h3>
          <ul>
            <li><strong>Regions:</strong> Geographic areas with multiple data centers</li>
            <li><strong>Availability Zones:</strong> Isolated data centers within regions</li>
            <li><strong>Edge Locations:</strong> Points of presence for content delivery</li>
            <li><strong>Local Zones:</strong> Extensions of regions for ultra-low latency</li>
          </ul>
          
          <h3>AWS Security and Compliance</h3>
          <ul>
            <li><strong>IAM (Identity and Access Management):</strong> User and permission management</li>
            <li><strong>KMS (Key Management Service):</strong> Encryption key management</li>
            <li><strong>CloudTrail:</strong> API call logging and monitoring</li>
            <li><strong>GuardDuty:</strong> Threat detection service</li>
          </ul>
          
          <h3>AWS Pricing Models</h3>
          <ul>
            <li><strong>Pay-as-you-go:</strong> Pay only for what you use</li>
            <li><strong>Reserved Instances:</strong> Commit to usage for lower rates</li>
            <li><strong>Spot Instances:</strong> Bid for unused capacity at lower prices</li>
            <li><strong>Savings Plans:</strong> Flexible pricing for consistent usage</li>
          </ul>
          
          <h3>AWS Certifications</h3>
          <ul>
            <li><strong>Cloud Practitioner:</strong> Foundational understanding</li>
            <li><strong>Solutions Architect:</strong> Design distributed systems</li>
            <li><strong>Developer:</strong> Develop and maintain applications</li>
            <li><strong>SysOps Administrator:</strong> Deploy, manage, and operate systems</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is AWS EC2?',
              options: ['A database service', 'Virtual servers in the cloud', 'A storage service', 'A networking service'],
              correctAnswer: 1,
              explanation: 'EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud.'
            },
            {
              id: 'q2',
              question: 'Which AWS service is used for object storage?',
              options: ['EBS', 'EFS', 'S3', 'Glacier'],
              correctAnswer: 2,
              explanation: 'S3 (Simple Storage Service) is AWS\'s object storage service for storing and retrieving any amount of data.'
            },
            {
              id: 'q3',
              question: 'What does IAM stand for in AWS?',
              options: ['Internet Access Management', 'Identity and Access Management', 'Infrastructure Application Management', 'Internal Application Monitoring'],
              correctAnswer: 1,
              explanation: 'IAM stands for Identity and Access Management, which manages users, groups, and permissions in AWS.'
            },
            {
              id: 'q4',
              question: 'Which pricing model allows you to bid for unused AWS capacity?',
              options: ['Reserved Instances', 'On-Demand', 'Spot Instances', 'Savings Plans'],
              correctAnswer: 2,
              explanation: 'Spot Instances allow you to bid for unused EC2 capacity at potentially significant cost savings.'
            }
          ]
        }
      },
      {
        title: 'DevOps and CI/CD',
        short_description: 'Implement modern development and deployment practices',
        article_content: `
          <h3>What is DevOps?</h3>
          <p>DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and provide continuous delivery with high software quality.</p>
          
          <h3>DevOps Core Principles</h3>
          <ul>
            <li><strong>Collaboration:</strong> Break down silos between teams</li>
            <li><strong>Automation:</strong> Automate repetitive tasks</li>
            <li><strong>Continuous Integration:</strong> Regularly merge code changes</li>
            <li><strong>Continuous Delivery:</strong> Automated deployment pipeline</li>
            <li><strong>Monitoring:</strong> Continuous monitoring and feedback</li>
            <li><strong>Infrastructure as Code:</strong> Manage infrastructure through code</li>
          </ul>
          
          <h3>CI/CD Pipeline</h3>
          
          <h4>Continuous Integration (CI)</h4>
          <ul>
            <li>Developers frequently merge code changes</li>
            <li>Automated testing on every commit</li>
            <li>Early detection of integration issues</li>
            <li>Faster feedback to developers</li>
          </ul>
          
          <h4>Continuous Delivery (CD)</h4>
          <ul>
            <li>Automated deployment to staging environments</li>
            <li>Manual approval for production deployments</li>
            <li>Consistent and reliable releases</li>
          </ul>
          
          <h4>Continuous Deployment</h4>
          <ul>
            <li>Fully automated deployment to production</li>
            <li>No manual intervention required</li>
            <li>Highest level of automation</li>
          </ul>
          
          <h3>DevOps Tools</h3>
          
          <h4>Version Control</h4>
          <ul>
            <li><strong>Git:</strong> Distributed version control</li>
            <li><strong>GitHub/GitLab:</strong> Git hosting with collaboration features</li>
            <li><strong>Branching strategies:</strong> Gitflow, GitHub Flow</li>
          </ul>
          
          <h4>CI/CD Tools</h4>
          <ul>
            <li><strong>Jenkins:</strong> Open-source automation server</li>
            <li><strong>GitHub Actions:</strong> GitHub's native CI/CD</li>
            <li><strong>GitLab CI:</strong> Built-in GitLab CI/CD</li>
            <li><strong>Azure DevOps:</strong> Microsoft's DevOps platform</li>
            <li><strong>CircleCI:</strong> Cloud-based CI/CD platform</li>
          </ul>
          
          <h4>Containerization</h4>
          <ul>
            <li><strong>Docker:</strong> Container platform</li>
            <li><strong>Kubernetes:</strong> Container orchestration</li>
            <li><strong>Docker Compose:</strong> Multi-container applications</li>
            <li><strong>Helm:</strong> Kubernetes package manager</li>
          </ul>
          
          <h4>Infrastructure as Code</h4>
          <ul>
            <li><strong>Terraform:</strong> Multi-cloud infrastructure provisioning</li>
            <li><strong>AWS CloudFormation:</strong> AWS infrastructure as code</li>
            <li><strong>Ansible:</strong> Configuration management</li>
            <li><strong>Pulumi:</strong> Modern infrastructure as code</li>
          </ul>
          
          <h4>Monitoring and Logging</h4>
          <ul>
            <li><strong>Prometheus:</strong> Monitoring and alerting</li>
            <li><strong>Grafana:</strong> Visualization and dashboards</li>
            <li><strong>ELK Stack:</strong> Elasticsearch, Logstash, Kibana</li>
            <li><strong>Datadog:</strong> Cloud monitoring platform</li>
          </ul>
          
          <h3>DevOps Culture and Practices</h3>
          <ul>
            <li><strong>Fail Fast:</strong> Quick feedback and learning</li>
            <li><strong>Shared Responsibility:</strong> Everyone owns quality</li>
            <li><strong>Continuous Learning:</strong> Regular improvement</li>
            <li><strong>Automation First:</strong> Automate everything possible</li>
            <li><strong>Measure Everything:</strong> Data-driven decisions</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main goal of DevOps?',
              options: ['Reduce development costs', 'Shorten development lifecycle and provide continuous delivery', 'Eliminate testing', 'Increase team size'],
              correctAnswer: 1,
              explanation: 'DevOps aims to shorten the development lifecycle while providing continuous delivery with high software quality.'
            },
            {
              id: 'q2',
              question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
              options: ['No difference', 'CD requires manual approval for production, Continuous Deployment is fully automated', 'Continuous Deployment is slower', 'CD only works with containers'],
              correctAnswer: 1,
              explanation: 'Continuous Delivery requires manual approval for production deployments, while Continuous Deployment is fully automated to production.'
            },
            {
              id: 'q3',
              question: 'Which tool is commonly used for container orchestration?',
              options: ['Docker', 'Jenkins', 'Kubernetes', 'Terraform'],
              correctAnswer: 2,
              explanation: 'Kubernetes is the most popular container orchestration platform for managing containerized applications.'
            },
            {
              id: 'q4',
              question: 'What does "Infrastructure as Code" mean?',
              options: ['Writing code in infrastructure', 'Managing infrastructure through code', 'Coding on physical servers', 'Infrastructure without code'],
              correctAnswer: 1,
              explanation: 'Infrastructure as Code means managing and provisioning infrastructure through machine-readable definition files rather than manual processes.'
            }
          ]
        }
      },
      {
        title: 'Microservices Architecture',
        short_description: 'Design scalable distributed systems',
        article_content: `
          <h3>What are Microservices?</h3>
          <p>Microservices architecture is an approach to building software applications as a collection of small, autonomous services that communicate over well-defined APIs. Each service is owned by a small team and can be developed, deployed, and scaled independently.</p>
          
          <h3>Microservices vs Monolith</h3>
          
          <h4>Monolithic Architecture</h4>
          <ul>
            <li>Single deployable unit</li>
            <li>Shared database and codebase</li>
            <li>Easier to develop initially</li>
            <li>Becomes complex as it grows</li>
            <li>Single point of failure</li>
          </ul>
          
          <h4>Microservices Architecture</h4>
          <ul>
            <li>Multiple small, independent services</li>
            <li>Each service has its own database</li>
            <li>Can use different technologies</li>
            <li>Independent deployment and scaling</li>
            <li>Fault isolation</li>
          </ul>
          
          <h3>Benefits of Microservices</h3>
          <ul>
            <li><strong>Scalability:</strong> Scale individual services based on demand</li>
            <li><strong>Technology Diversity:</strong> Use best tool for each service</li>
            <li><strong>Team Independence:</strong> Small teams can work autonomously</li>
            <li><strong>Fault Isolation:</strong> Failure in one service doesn't affect others</li>
            <li><strong>Faster Deployment:</strong> Deploy services independently</li>
            <li><strong>Easier Maintenance:</strong> Smaller codebases are easier to understand</li>
          </ul>
          
          <h3>Challenges of Microservices</h3>
          <ul>
            <li><strong>Complexity:</strong> Distributed system complexity</li>
            <li><strong>Network Communication:</strong> Latency and failure handling</li>
            <li><strong>Data Consistency:</strong> Managing distributed transactions</li>
            <li><strong>Testing:</strong> Testing distributed systems is complex</li>
            <li><strong>Monitoring:</strong> Need comprehensive observability</li>
            <li><strong>Security:</strong> More surface area to secure</li>
          </ul>
          
          <h3>Communication Patterns</h3>
          
          <h4>Synchronous Communication</h4>
          <ul>
            <li><strong>HTTP/REST:</strong> Most common, request-response pattern</li>
            <li><strong>GraphQL:</strong> Flexible query language for APIs</li>
            <li><strong>gRPC:</strong> High-performance RPC framework</li>
          </ul>
          
          <h4>Asynchronous Communication</h4>
          <ul>
            <li><strong>Message Queues:</strong> RabbitMQ, Amazon SQS</li>
            <li><strong>Event Streaming:</strong> Apache Kafka, AWS Kinesis</li>
            <li><strong>Pub/Sub:</strong> Google Pub/Sub, Azure Service Bus</li>
          </ul>
          
          <h3>Data Management</h3>
          <ul>
            <li><strong>Database per Service:</strong> Each service owns its data</li>
            <li><strong>Saga Pattern:</strong> Manage distributed transactions</li>
            <li><strong>CQRS:</strong> Command Query Responsibility Segregation</li>
            <li><strong>Event Sourcing:</strong> Store events instead of current state</li>
          </ul>
          
          <h3>Service Discovery</h3>
          <ul>
            <li><strong>Client-side Discovery:</strong> Client queries service registry</li>
            <li><strong>Server-side Discovery:</strong> Load balancer handles discovery</li>
            <li><strong>Tools:</strong> Consul, Eureka, Kubernetes DNS</li>
          </ul>
          
          <h3>Monitoring and Observability</h3>
          <ul>
            <li><strong>Distributed Tracing:</strong> Jaeger, Zipkin</li>
            <li><strong>Metrics:</strong> Prometheus, Grafana</li>
            <li><strong>Logging:</strong> Centralized logging with ELK stack</li>
            <li><strong>Health Checks:</strong> Service health monitoring</li>
          </ul>
          
          <h3>Best Practices</h3>
          <ul>
            <li>Start with a monolith and evolve to microservices</li>
            <li>Design services around business capabilities</li>
            <li>Implement circuit breakers for fault tolerance</li>
            <li>Use API versioning for backward compatibility</li>
            <li>Automate everything: testing, deployment, monitoring</li>
            <li>Embrace the "fail fast" principle</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is a key characteristic of microservices architecture?',
              options: ['Single shared database', 'Services that can be deployed independently', 'Monolithic codebase', 'Centralized team ownership'],
              correctAnswer: 1,
              explanation: 'Microservices can be developed, deployed, and scaled independently, which is a key characteristic of this architecture.'
            },
            {
              id: 'q2',
              question: 'Which communication pattern is best for real-time data streaming?',
              options: ['HTTP/REST', 'GraphQL', 'Apache Kafka', 'gRPC'],
              correctAnswer: 2,
              explanation: 'Apache Kafka is designed for high-throughput, real-time data streaming and event processing.'
            },
            {
              id: 'q3',
              question: 'What is the Saga pattern used for?',
              options: ['Service discovery', 'Managing distributed transactions', 'Load balancing', 'Monitoring services'],
              correctAnswer: 1,
              explanation: 'The Saga pattern is used to manage distributed transactions across multiple microservices.'
            },
            {
              id: 'q4',
              question: 'Why might you start with a monolith before moving to microservices?',
              options: ['Monoliths are always better', 'Microservices are too expensive', 'Understanding the domain before decomposing', 'Microservices are outdated'],
              correctAnswer: 2,
              explanation: 'Starting with a monolith helps you understand the domain and identify proper service boundaries before decomposing into microservices.'
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
      { concept: 1, prerequisite: 0 }, // AWS depends on Cloud Fundamentals
      { concept: 2, prerequisite: 0 }, // DevOps depends on Cloud Fundamentals
      { concept: 3, prerequisite: 2 }, // Microservices depends on DevOps
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

    console.log('✅ Cloud Computing roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Cloud Computing roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createCloudComputingRoadmap();
}
