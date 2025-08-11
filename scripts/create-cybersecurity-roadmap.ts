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

async function createCyberSecurityRoadmap() {
  console.log('Creating Cybersecurity roadmap...');

  try {
    // Create Cybersecurity roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Cybersecurity',
        description: 'Learn to protect digital assets and secure systems',
        icon: 'shield-check'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Cybersecurity concepts
    const concepts = [
      {
        title: 'Security Fundamentals',
        short_description: 'Core principles of information security',
        article_content: `
          <h3>The CIA Triad</h3>
          <p>The foundation of cybersecurity rests on three pillars:</p>
          <ul>
            <li><strong>Confidentiality:</strong> Information is accessible only to authorized individuals</li>
            <li><strong>Integrity:</strong> Information is accurate and cannot be modified without authorization</li>
            <li><strong>Availability:</strong> Information and resources are accessible when needed</li>
          </ul>
          
          <h3>Types of Security Threats</h3>
          
          <h4>Malware</h4>
          <ul>
            <li><strong>Viruses:</strong> Self-replicating code that attaches to other programs</li>
            <li><strong>Worms:</strong> Standalone malware that spreads across networks</li>
            <li><strong>Trojans:</strong> Disguised malware that appears legitimate</li>
            <li><strong>Ransomware:</strong> Encrypts files and demands payment</li>
            <li><strong>Spyware:</strong> Secretly monitors user activity</li>
          </ul>
          
          <h4>Social Engineering</h4>
          <ul>
            <li><strong>Phishing:</strong> Deceptive emails or messages</li>
            <li><strong>Pretexting:</strong> Creating false scenarios to gain information</li>
            <li><strong>Baiting:</strong> Offering something enticing to install malware</li>
            <li><strong>Tailgating:</strong> Following authorized personnel into secure areas</li>
          </ul>
          
          <h3>Security Controls</h3>
          
          <h4>Physical Controls</h4>
          <ul>
            <li>Access cards and biometric readers</li>
            <li>Security cameras and guards</li>
            <li>Locked server rooms</li>
          </ul>
          
          <h4>Technical Controls</h4>
          <ul>
            <li>Firewalls and intrusion detection systems</li>
            <li>Encryption and access controls</li>
            <li>Antivirus and anti-malware software</li>
          </ul>
          
          <h4>Administrative Controls</h4>
          <ul>
            <li>Security policies and procedures</li>
            <li>Employee training and awareness</li>
            <li>Background checks and security clearances</li>
          </ul>
          
          <h3>Risk Management</h3>
          <ul>
            <li><strong>Risk Assessment:</strong> Identify and evaluate threats</li>
            <li><strong>Risk Mitigation:</strong> Implement controls to reduce risk</li>
            <li><strong>Risk Acceptance:</strong> Accept remaining risk after mitigation</li>
            <li><strong>Risk Transfer:</strong> Use insurance or outsourcing</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What does the "I" in CIA triad stand for?',
              options: ['Intelligence', 'Integrity', 'Implementation', 'Investigation'],
              correctAnswer: 1,
              explanation: 'The CIA triad consists of Confidentiality, Integrity, and Availability - the three pillars of information security.'
            },
            {
              id: 'q2',
              question: 'Which type of malware encrypts files and demands payment?',
              options: ['Virus', 'Worm', 'Ransomware', 'Spyware'],
              correctAnswer: 2,
              explanation: 'Ransomware encrypts victim files and demands payment (ransom) for the decryption key.'
            },
            {
              id: 'q3',
              question: 'What is phishing?',
              options: ['A type of firewall', 'Deceptive emails to steal information', 'Encrypting data', 'Installing security cameras'],
              correctAnswer: 1,
              explanation: 'Phishing involves sending deceptive emails or messages to trick people into revealing sensitive information.'
            },
            {
              id: 'q4',
              question: 'Which is NOT a type of security control?',
              options: ['Physical', 'Technical', 'Administrative', 'Financial'],
              correctAnswer: 3,
              explanation: 'The three main types of security controls are Physical, Technical, and Administrative.'
            }
          ]
        }
      },
      {
        title: 'Network Security',
        short_description: 'Protecting networks from unauthorized access and attacks',
        article_content: `
          <h3>Network Security Basics</h3>
          <p>Network security involves protecting the integrity, confidentiality, and availability of computer networks and their data.</p>
          
          <h3>Common Network Attacks</h3>
          
          <h4>Denial of Service (DoS)</h4>
          <ul>
            <li><strong>DoS:</strong> Single source overwhelming a target</li>
            <li><strong>DDoS:</strong> Multiple sources (botnet) attacking simultaneously</li>
            <li><strong>Impact:</strong> Makes services unavailable to legitimate users</li>
          </ul>
          
          <h4>Man-in-the-Middle (MITM)</h4>
          <ul>
            <li>Attacker intercepts communication between two parties</li>
            <li>Can eavesdrop or modify messages</li>
            <li>Common on unsecured Wi-Fi networks</li>
          </ul>
          
          <h4>SQL Injection</h4>
          <ul>
            <li>Inserting malicious SQL code into applications</li>
            <li>Can read, modify, or delete database data</li>
            <li>Prevented by input validation and parameterized queries</li>
          </ul>
          
          <h3>Network Defense Tools</h3>
          
          <h4>Firewalls</h4>
          <ul>
            <li><strong>Packet Filtering:</strong> Examines individual packets</li>
            <li><strong>Stateful Inspection:</strong> Tracks connection states</li>
            <li><strong>Application Layer:</strong> Deep packet inspection</li>
            <li><strong>Next-Gen Firewalls:</strong> Include IPS, anti-malware</li>
          </ul>
          
          <h4>Intrusion Detection/Prevention Systems (IDS/IPS)</h4>
          <ul>
            <li><strong>Network-based (NIDS/NIPS):</strong> Monitor network traffic</li>
            <li><strong>Host-based (HIDS/HIPS):</strong> Monitor individual systems</li>
            <li><strong>Signature-based:</strong> Look for known attack patterns</li>
            <li><strong>Anomaly-based:</strong> Detect unusual behavior</li>
          </ul>
          
          <h3>Secure Network Protocols</h3>
          <ul>
            <li><strong>HTTPS:</strong> Encrypted web traffic (HTTP over TLS)</li>
            <li><strong>SSH:</strong> Secure remote access</li>
            <li><strong>VPN:</strong> Encrypted tunnel over public networks</li>
            <li><strong>IPSec:</strong> Network layer security protocol</li>
          </ul>
          
          <h3>Wireless Security</h3>
          <ul>
            <li><strong>WEP:</strong> Weak, easily broken (avoid)</li>
            <li><strong>WPA/WPA2:</strong> Much stronger, widely used</li>
            <li><strong>WPA3:</strong> Latest standard with enhanced security</li>
            <li><strong>Enterprise Wi-Fi:</strong> 802.1X authentication</li>
          </ul>
          
          <h3>Network Segmentation</h3>
          <ul>
            <li>Divide network into smaller segments</li>
            <li>Limit blast radius of breaches</li>
            <li>Use VLANs and subnets</li>
            <li>Implement zero-trust architecture</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the difference between DoS and DDoS attacks?',
              options: ['DoS is stronger than DDoS', 'DoS uses one source, DDoS uses multiple sources', 'DDoS only targets databases', 'There is no difference'],
              correctAnswer: 1,
              explanation: 'DoS (Denial of Service) uses a single attack source, while DDoS (Distributed DoS) uses multiple sources to overwhelm the target.'
            },
            {
              id: 'q2',
              question: 'What does HTTPS provide that HTTP does not?',
              options: ['Faster loading', 'Encryption', 'Better graphics', 'Mobile support'],
              correctAnswer: 1,
              explanation: 'HTTPS encrypts data transmission between client and server, providing confidentiality and integrity.'
            },
            {
              id: 'q3',
              question: 'Which wireless security protocol should be avoided?',
              options: ['WPA3', 'WPA2', 'WPA', 'WEP'],
              correctAnswer: 3,
              explanation: 'WEP (Wired Equivalent Privacy) is easily broken and should be avoided. Use WPA2 or WPA3 instead.'
            },
            {
              id: 'q4',
              question: 'What is the purpose of network segmentation?',
              options: ['Increase internet speed', 'Limit the impact of security breaches', 'Reduce hardware costs', 'Improve user experience'],
              correctAnswer: 1,
              explanation: 'Network segmentation limits the blast radius of security breaches by isolating network segments.'
            }
          ]
        }
      },
      {
        title: 'Cryptography',
        short_description: 'The science of securing information through encryption',
        article_content: `
          <h3>What is Cryptography?</h3>
          <p>Cryptography is the practice of securing information by transforming it into an unreadable format for unauthorized users, while allowing authorized users to access the original information.</p>
          
          <h3>Types of Cryptography</h3>
          
          <h4>Symmetric Encryption</h4>
          <ul>
            <li>Same key for encryption and decryption</li>
            <li>Fast and efficient for large amounts of data</li>
            <li>Key distribution challenge</li>
            <li><strong>Examples:</strong> AES, DES, 3DES</li>
          </ul>
          
          <h4>Asymmetric Encryption (Public Key)</h4>
          <ul>
            <li>Two keys: public key (encrypt) and private key (decrypt)</li>
            <li>Solves key distribution problem</li>
            <li>Slower than symmetric encryption</li>
            <li><strong>Examples:</strong> RSA, ECC, Diffie-Hellman</li>
          </ul>
          
          <h3>Cryptographic Hash Functions</h3>
          <ul>
            <li>One-way function that produces fixed-size output</li>
            <li>Small changes in input create drastically different output</li>
            <li>Used for data integrity verification</li>
            <li><strong>Examples:</strong> SHA-256, SHA-3, MD5 (deprecated)</li>
          </ul>
          
          <h3>Digital Signatures</h3>
          <ul>
            <li>Proves authenticity and integrity</li>
            <li>Uses sender's private key to sign</li>
            <li>Receiver uses sender's public key to verify</li>
            <li>Non-repudiation: sender cannot deny signing</li>
          </ul>
          
          <h3>Key Management</h3>
          <ul>
            <li><strong>Key Generation:</strong> Creating strong, random keys</li>
            <li><strong>Key Distribution:</strong> Securely sharing keys</li>
            <li><strong>Key Storage:</strong> Protecting keys when not in use</li>
            <li><strong>Key Rotation:</strong> Regularly changing keys</li>
            <li><strong>Key Destruction:</strong> Securely deleting old keys</li>
          </ul>
          
          <h3>Common Cryptographic Protocols</h3>
          <ul>
            <li><strong>TLS/SSL:</strong> Secure web communications</li>
            <li><strong>PGP/GPG:</strong> Email encryption</li>
            <li><strong>IPSec:</strong> Network layer security</li>
            <li><strong>Kerberos:</strong> Network authentication</li>
          </ul>
          
          <h3>Cryptographic Attacks</h3>
          <ul>
            <li><strong>Brute Force:</strong> Try all possible keys</li>
            <li><strong>Dictionary Attack:</strong> Try common passwords</li>
            <li><strong>Birthday Attack:</strong> Exploit hash collisions</li>
            <li><strong>Side Channel:</strong> Exploit implementation weaknesses</li>
          </ul>
          
          <h3>Best Practices</h3>
          <ul>
            <li>Use well-established algorithms</li>
            <li>Never implement your own crypto</li>
            <li>Use appropriate key lengths</li>
            <li>Regularly update and patch systems</li>
            <li>Implement proper key management</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main advantage of asymmetric encryption over symmetric?',
              options: ['It is faster', 'It solves the key distribution problem', 'It uses shorter keys', 'It is easier to implement'],
              correctAnswer: 1,
              explanation: 'Asymmetric encryption solves the key distribution problem by using public keys that can be shared openly.'
            },
            {
              id: 'q2',
              question: 'What is a hash function used for?',
              options: ['Encrypting data', 'Decrypting data', 'Verifying data integrity', 'Generating keys'],
              correctAnswer: 2,
              explanation: 'Hash functions are primarily used to verify data integrity by producing a unique fingerprint of the data.'
            },
            {
              id: 'q3',
              question: 'Which key is used to create a digital signature?',
              options: ['Public key', 'Private key', 'Session key', 'Master key'],
              correctAnswer: 1,
              explanation: 'Digital signatures are created using the sender\'s private key, and verified using their public key.'
            },
            {
              id: 'q4',
              question: 'Why should you never implement your own cryptography?',
              options: ['It takes too much time', 'It is likely to have security flaws', 'It is too expensive', 'It is illegal'],
              correctAnswer: 1,
              explanation: 'Implementing cryptography is extremely difficult and likely to introduce security vulnerabilities. Use established, tested algorithms.'
            }
          ]
        }
      },
      {
        title: 'Ethical Hacking & Penetration Testing',
        short_description: 'Testing security by thinking like an attacker',
        article_content: `
          <h3>What is Ethical Hacking?</h3>
          <p>Ethical hacking involves authorized attempts to gain unauthorized access to systems, applications, or data. The goal is to identify vulnerabilities before malicious hackers do.</p>
          
          <h3>Types of Hackers</h3>
          <ul>
            <li><strong>White Hat:</strong> Ethical hackers who help improve security</li>
            <li><strong>Black Hat:</strong> Malicious hackers with criminal intent</li>
            <li><strong>Gray Hat:</strong> Between white and black hat</li>
            <li><strong>Script Kiddies:</strong> Use existing tools without deep understanding</li>
            <li><strong>Hacktivists:</strong> Hack for social or political causes</li>
          </ul>
          
          <h3>Penetration Testing Phases</h3>
          
          <h4>1. Reconnaissance</h4>
          <ul>
            <li><strong>Passive:</strong> Gather info without direct interaction</li>
            <li><strong>Active:</strong> Directly interact with target systems</li>
            <li>Tools: Nmap, Whois, Google dorking</li>
          </ul>
          
          <h4>2. Scanning</h4>
          <ul>
            <li>Port scanning to find open services</li>
            <li>Vulnerability scanning</li>
            <li>Network mapping</li>
          </ul>
          
          <h4>3. Gaining Access</h4>
          <ul>
            <li>Exploit identified vulnerabilities</li>
            <li>Password attacks</li>
            <li>Social engineering</li>
          </ul>
          
          <h4>4. Maintaining Access</h4>
          <ul>
            <li>Install backdoors or rootkits</li>
            <li>Create persistent access</li>
            <li>Cover tracks</li>
          </ul>
          
          <h4>5. Analysis and Reporting</h4>
          <ul>
            <li>Document findings</li>
            <li>Risk assessment</li>
            <li>Remediation recommendations</li>
          </ul>
          
          <h3>Common Vulnerability Types (OWASP Top 10)</h3>
          <ul>
            <li><strong>Injection:</strong> SQL, NoSQL, OS command injection</li>
            <li><strong>Broken Authentication:</strong> Weak session management</li>
            <li><strong>Sensitive Data Exposure:</strong> Inadequate protection</li>
            <li><strong>XML External Entities (XXE):</strong> XML parser vulnerabilities</li>
            <li><strong>Broken Access Control:</strong> Improper authorization</li>
            <li><strong>Security Misconfiguration:</strong> Default/weak settings</li>
            <li><strong>Cross-Site Scripting (XSS):</strong> Malicious scripts</li>
            <li><strong>Insecure Deserialization:</strong> Object injection attacks</li>
            <li><strong>Known Vulnerabilities:</strong> Unpatched components</li>
            <li><strong>Insufficient Logging:</strong> Poor monitoring</li>
          </ul>
          
          <h3>Popular Penetration Testing Tools</h3>
          <ul>
            <li><strong>Kali Linux:</strong> Penetration testing distribution</li>
            <li><strong>Metasploit:</strong> Exploitation framework</li>
            <li><strong>Burp Suite:</strong> Web application security testing</li>
            <li><strong>Nessus:</strong> Vulnerability scanner</li>
            <li><strong>Wireshark:</strong> Network protocol analyzer</li>
            <li><strong>John the Ripper:</strong> Password cracking</li>
          </ul>
          
          <h3>Legal and Ethical Considerations</h3>
          <ul>
            <li>Always get written authorization</li>
            <li>Define scope clearly</li>
            <li>Follow responsible disclosure</li>
            <li>Protect confidential information</li>
            <li>Document everything</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What type of hacker works to improve security legally?',
              options: ['Black Hat', 'Gray Hat', 'White Hat', 'Script Kiddie'],
              correctAnswer: 2,
              explanation: 'White Hat hackers are ethical hackers who work legally to identify and help fix security vulnerabilities.'
            },
            {
              id: 'q2',
              question: 'What is the first phase of penetration testing?',
              options: ['Scanning', 'Reconnaissance', 'Gaining Access', 'Reporting'],
              correctAnswer: 1,
              explanation: 'Reconnaissance is the first phase where information about the target is gathered through various means.'
            },
            {
              id: 'q3',
              question: 'What does SQL injection attack?',
              options: ['Network protocols', 'Database applications', 'Operating systems', 'Email servers'],
              correctAnswer: 1,
              explanation: 'SQL injection attacks target database applications by inserting malicious SQL code into input fields.'
            },
            {
              id: 'q4',
              question: 'What is the most important requirement before starting a penetration test?',
              options: ['Expensive tools', 'Written authorization', 'Advanced degree', 'Large team'],
              correctAnswer: 1,
              explanation: 'Written authorization is absolutely critical before conducting any penetration testing to avoid legal issues.'
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
      { concept: 1, prerequisite: 0 }, // Network Security depends on Security Fundamentals
      { concept: 2, prerequisite: 0 }, // Cryptography depends on Security Fundamentals
      { concept: 3, prerequisite: 0 }, // Ethical Hacking depends on Security Fundamentals
      { concept: 3, prerequisite: 1 }, // Ethical Hacking also depends on Network Security
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

    console.log('✅ Cybersecurity roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Cybersecurity roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createCyberSecurityRoadmap();
}
