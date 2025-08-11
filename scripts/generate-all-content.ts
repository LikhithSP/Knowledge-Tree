import { execSync } from 'child_process';
import * as path from 'path';

const scripts = [
  'create-sample-data.ts',
  'create-ai-roadmap.ts', 
  'create-data-science-roadmap.ts',
  'create-cybersecurity-roadmap.ts',
  'create-mobile-dev-roadmap.ts',
  'create-cloud-computing-roadmap.ts',
  'create-digital-marketing-roadmap.ts',
  'create-project-management-roadmap.ts'
];

async function runAllScripts() {
  console.log('🚀 Starting comprehensive content generation...\n');
  
  for (const script of scripts) {
    const scriptPath = path.join(__dirname, script);
    console.log(`📝 Running ${script}...`);
    
    try {
      const output = execSync(`npx tsx "${scriptPath}"`, { 
        encoding: 'utf8',
        cwd: path.join(__dirname, '..')
      });
      console.log(output);
      console.log(`✅ ${script} completed successfully!\n`);
    } catch (error) {
      console.error(`❌ Error running ${script}:`);
      console.error(error instanceof Error ? error.message : String(error));
      console.log('');
    }
  }
  
  console.log('🎉 All content generation scripts completed!');
  console.log('\n📚 Generated Roadmaps:');
  console.log('• Web Development Fundamentals (HTML, CSS, JavaScript)');
  console.log('• AI & Machine Learning (Introduction to AI, ML Basics, Neural Networks, Supervised Learning)');
  console.log('• Data Science (Statistics, Visualization, Python, Data Cleaning)');
  console.log('• Cybersecurity (Security Fundamentals, Network Security, Cryptography, Ethical Hacking)');
  console.log('• Mobile Development (Fundamentals, React Native, Swift/iOS, Flutter)');
  console.log('• Cloud Computing (Cloud Fundamentals, AWS, DevOps & CI/CD, Microservices)');
  console.log('• Digital Marketing (Fundamentals, SEO & SEM, Social Media, Content & Analytics)');
  console.log('• Project Management (Fundamentals, Agile & Scrum, Risk Management, Leadership)');
  console.log('\n🎯 Total: 8 roadmaps with 32 concepts and comprehensive quizzes!');
}

// Run all scripts
runAllScripts().catch(console.error);
