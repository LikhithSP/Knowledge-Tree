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

async function createMobileDevRoadmap() {
  console.log('Creating Mobile Development roadmap...');

  try {
    // Create Mobile Development roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Mobile Development',
        description: 'Build powerful mobile applications for iOS and Android',
        icon: 'device-phone-mobile'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Mobile Development concepts
    const concepts = [
      {
        title: 'Mobile Development Fundamentals',
        short_description: 'Understanding mobile platforms and development approaches',
        article_content: `
          <h3>Mobile Development Landscape</h3>
          <p>Mobile development has evolved dramatically since the first smartphones. Today, billions of people rely on mobile apps for communication, entertainment, productivity, and commerce.</p>
          
          <h3>Major Mobile Platforms</h3>
          
          <h4>iOS (Apple)</h4>
          <ul>
            <li><strong>Market Share:</strong> Premium segment, high user engagement</li>
            <li><strong>Programming Languages:</strong> Swift (modern), Objective-C (legacy)</li>
            <li><strong>Development Environment:</strong> Xcode on macOS</li>
            <li><strong>App Store:</strong> Strict review process, consistent user experience</li>
          </ul>
          
          <h4>Android (Google)</h4>
          <ul>
            <li><strong>Market Share:</strong> Largest global market share</li>
            <li><strong>Programming Languages:</strong> Kotlin (preferred), Java</li>
            <li><strong>Development Environment:</strong> Android Studio</li>
            <li><strong>Google Play Store:</strong> More flexible review process</li>
          </ul>
          
          <h3>Development Approaches</h3>
          
          <h4>Native Development</h4>
          <ul>
            <li><strong>Pros:</strong> Best performance, full platform features, optimal UX</li>
            <li><strong>Cons:</strong> Separate codebases, higher development cost</li>
            <li><strong>Use Case:</strong> Performance-critical apps, games, complex interactions</li>
          </ul>
          
          <h4>Cross-Platform Development</h4>
          <ul>
            <li><strong>React Native:</strong> JavaScript, shared logic with native components</li>
            <li><strong>Flutter:</strong> Dart language, single codebase for iOS and Android</li>
            <li><strong>Xamarin:</strong> C#, Microsoft ecosystem</li>
            <li><strong>Pros:</strong> Code reuse, faster development, consistent look</li>
            <li><strong>Cons:</strong> Potential performance trade-offs, platform limitations</li>
          </ul>
          
          <h4>Hybrid/Web-Based</h4>
          <ul>
            <li><strong>Ionic:</strong> Web technologies in native container</li>
            <li><strong>PhoneGap/Cordova:</strong> Web apps wrapped as native</li>
            <li><strong>PWAs:</strong> Progressive Web Apps with native-like features</li>
          </ul>
          
          <h3>Mobile Development Lifecycle</h3>
          <ol>
            <li><strong>Planning:</strong> Requirements, target audience, platform choice</li>
            <li><strong>Design:</strong> UI/UX design, wireframes, prototypes</li>
            <li><strong>Development:</strong> Frontend, backend, API integration</li>
            <li><strong>Testing:</strong> Unit, integration, user acceptance testing</li>
            <li><strong>Deployment:</strong> App store submission and approval</li>
            <li><strong>Maintenance:</strong> Updates, bug fixes, new features</li>
          </ol>
          
          <h3>Key Considerations</h3>
          <ul>
            <li><strong>User Experience:</strong> Touch interfaces, screen sizes, gestures</li>
            <li><strong>Performance:</strong> Battery life, memory usage, responsiveness</li>
            <li><strong>Security:</strong> Data protection, secure storage, authentication</li>
            <li><strong>Offline Functionality:</strong> Network connectivity issues</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which programming language is preferred for Android development?',
              options: ['Java', 'Kotlin', 'Swift', 'Dart'],
              correctAnswer: 1,
              explanation: 'Kotlin is now Google\'s preferred language for Android development, offering modern features and better interoperability.'
            },
            {
              id: 'q2',
              question: 'What is the main advantage of native development?',
              options: ['Lower cost', 'Faster development', 'Best performance and platform features', 'Single codebase'],
              correctAnswer: 2,
              explanation: 'Native development provides the best performance and access to all platform-specific features.'
            },
            {
              id: 'q3',
              question: 'Which cross-platform framework uses Dart language?',
              options: ['React Native', 'Flutter', 'Xamarin', 'Ionic'],
              correctAnswer: 1,
              explanation: 'Flutter uses Dart language and allows creating apps for multiple platforms from a single codebase.'
            },
            {
              id: 'q4',
              question: 'What must you use to develop iOS apps?',
              options: ['Any computer', 'Windows PC', 'macOS with Xcode', 'Linux system'],
              correctAnswer: 2,
              explanation: 'iOS development requires macOS and Xcode, Apple\'s integrated development environment.'
            }
          ]
        }
      },
      {
        title: 'React Native Development',
        short_description: 'Build cross-platform mobile apps with JavaScript and React',
        article_content: `
          <h3>What is React Native?</h3>
          <p>React Native is a cross-platform mobile development framework created by Facebook. It allows developers to build mobile apps using React and JavaScript while maintaining native performance and look.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Learn Once, Write Anywhere:</strong> Use React concepts for mobile</li>
            <li><strong>Native Components:</strong> Renders actual native UI components</li>
            <li><strong>Hot Reloading:</strong> See changes instantly during development</li>
            <li><strong>Bridge Architecture:</strong> JavaScript communicates with native modules</li>
            <li><strong>Large Ecosystem:</strong> Extensive library and community support</li>
          </ul>
          
          <h3>Core Components</h3>
          
          <h4>Built-in Components</h4>
          <ul>
            <li><strong>View:</strong> Container component (like div in web)</li>
            <li><strong>Text:</strong> Display text content</li>
            <li><strong>Image:</strong> Display images from various sources</li>
            <li><strong>ScrollView:</strong> Scrollable container</li>
            <li><strong>FlatList:</strong> Efficient list for large datasets</li>
            <li><strong>TextInput:</strong> Text input field</li>
            <li><strong>TouchableOpacity:</strong> Touchable wrapper</li>
          </ul>
          
          <h3>Navigation</h3>
          <ul>
            <li><strong>React Navigation:</strong> Most popular navigation library</li>
            <li><strong>Stack Navigator:</strong> Screen stack management</li>
            <li><strong>Tab Navigator:</strong> Bottom tab navigation</li>
            <li><strong>Drawer Navigator:</strong> Side menu navigation</li>
          </ul>
          
          <h3>State Management</h3>
          <ul>
            <li><strong>React Hooks:</strong> useState, useEffect, useContext</li>
            <li><strong>Redux:</strong> Predictable state container</li>
            <li><strong>Context API:</strong> Built-in React state sharing</li>
            <li><strong>Zustand:</strong> Lightweight state management</li>
          </ul>
          
          <h3>Styling in React Native</h3>
          <ul>
            <li><strong>StyleSheet.create():</strong> Optimized style objects</li>
            <li><strong>Flexbox:</strong> Layout system (default flex direction: column)</li>
            <li><strong>Platform-specific Styles:</strong> Different styles per platform</li>
            <li><strong>Styled Components:</strong> CSS-in-JS styling</li>
          </ul>
          
          <h3>Native Modules & APIs</h3>
          <ul>
            <li><strong>AsyncStorage:</strong> Local data persistence</li>
            <li><strong>Camera:</strong> Camera access and image capture</li>
            <li><strong>Geolocation:</strong> GPS and location services</li>
            <li><strong>Push Notifications:</strong> Firebase Cloud Messaging</li>
            <li><strong>Biometric Authentication:</strong> Fingerprint, Face ID</li>
          </ul>
          
          <h3>Development Tools</h3>
          <ul>
            <li><strong>Expo:</strong> Managed workflow with built-in features</li>
            <li><strong>React Native CLI:</strong> Bare workflow with full control</li>
            <li><strong>Flipper:</strong> Desktop debugging platform</li>
            <li><strong>React Native Debugger:</strong> Standalone debugging tool</li>
          </ul>
          
          <h3>Performance Optimization</h3>
          <ul>
            <li>Use FlatList for large lists</li>
            <li>Optimize images and use caching</li>
            <li>Minimize bridge communication</li>
            <li>Use native modules for intensive tasks</li>
            <li>Implement code splitting and lazy loading</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the web equivalent of View component in React Native?',
              options: ['span', 'div', 'section', 'p'],
              correctAnswer: 1,
              explanation: 'View in React Native is similar to div in web development - it\'s a container component.'
            },
            {
              id: 'q2',
              question: 'What is the default flex direction in React Native?',
              options: ['row', 'column', 'row-reverse', 'column-reverse'],
              correctAnswer: 1,
              explanation: 'React Native uses column as the default flex direction, unlike web CSS which defaults to row.'
            },
            {
              id: 'q3',
              question: 'Which component should you use for displaying large lists efficiently?',
              options: ['ScrollView', 'FlatList', 'View', 'List'],
              correctAnswer: 1,
              explanation: 'FlatList is optimized for large datasets with features like lazy loading and item recycling.'
            },
            {
              id: 'q4',
              question: 'What does React Native\'s "Hot Reloading" feature do?',
              options: ['Speeds up app performance', 'Shows changes instantly during development', 'Reduces app size', 'Improves security'],
              correctAnswer: 1,
              explanation: 'Hot Reloading allows developers to see code changes instantly without rebuilding the entire app.'
            }
          ]
        }
      },
      {
        title: 'Swift & iOS Development',
        short_description: 'Create native iOS applications using Swift programming language',
        article_content: `
          <h3>Introduction to Swift</h3>
          <p>Swift is Apple's modern programming language for iOS, macOS, watchOS, and tvOS development. It's designed to be safe, fast, and expressive while maintaining interoperability with Objective-C.</p>
          
          <h3>Swift Language Features</h3>
          
          <h4>Safety</h4>
          <ul>
            <li><strong>Optionals:</strong> Handle null values safely</li>
            <li><strong>Type Safety:</strong> Catch errors at compile time</li>
            <li><strong>Memory Management:</strong> Automatic Reference Counting (ARC)</li>
            <li><strong>Bounds Checking:</strong> Array index safety</li>
          </ul>
          
          <h4>Modern Syntax</h4>
          <ul>
            <li><strong>Type Inference:</strong> Compiler deduces types</li>
            <li><strong>Closures:</strong> First-class functions</li>
            <li><strong>Generics:</strong> Type-safe flexible code</li>
            <li><strong>Pattern Matching:</strong> Powerful switch statements</li>
          </ul>
          
          <h3>iOS Development Environment</h3>
          
          <h4>Xcode IDE</h4>
          <ul>
            <li><strong>Interface Builder:</strong> Visual UI design</li>
            <li><strong>Simulator:</strong> Test on various devices</li>
            <li><strong>Debugger:</strong> LLDB for debugging</li>
            <li><strong>Instruments:</strong> Performance profiling</li>
          </ul>
          
          <h4>Project Structure</h4>
          <ul>
            <li><strong>App Delegate:</strong> Application lifecycle management</li>
            <li><strong>View Controllers:</strong> Screen management</li>
            <li><strong>Storyboards:</strong> Visual flow between screens</li>
            <li><strong>Assets:</strong> Images, colors, data files</li>
          </ul>
          
          <h3>UI Development</h3>
          
          <h4>UIKit Framework</h4>
          <ul>
            <li><strong>UIView:</strong> Base class for all UI elements</li>
            <li><strong>UIViewController:</strong> Manages view hierarchy</li>
            <li><strong>UILabel:</strong> Display text</li>
            <li><strong>UIButton:</strong> Interactive buttons</li>
            <li><strong>UITableView:</strong> List display</li>
            <li><strong>UICollectionView:</strong> Grid layouts</li>
          </ul>
          
          <h4>SwiftUI (Modern Approach)</h4>
          <ul>
            <li><strong>Declarative Syntax:</strong> Describe what UI should look like</li>
            <li><strong>Live Preview:</strong> See changes in real-time</li>
            <li><strong>Cross-Platform:</strong> Works on iOS, macOS, watchOS, tvOS</li>
            <li><strong>Data Binding:</strong> Automatic UI updates</li>
          </ul>
          
          <h3>Auto Layout</h3>
          <ul>
            <li><strong>Constraints:</strong> Define relationships between UI elements</li>
            <li><strong>Stack Views:</strong> Arrange views horizontally or vertically</li>
            <li><strong>Safe Area:</strong> Avoid screen edges and notches</li>
            <li><strong>Size Classes:</strong> Adapt to different screen sizes</li>
          </ul>
          
          <h3>Data Persistence</h3>
          <ul>
            <li><strong>UserDefaults:</strong> Simple key-value storage</li>
            <li><strong>Core Data:</strong> Object-relational mapping framework</li>
            <li><strong>SQLite:</strong> Direct database access</li>
            <li><strong>File System:</strong> Documents and caches directories</li>
          </ul>
          
          <h3>Networking</h3>
          <ul>
            <li><strong>URLSession:</strong> HTTP requests and responses</li>
            <li><strong>Codable Protocol:</strong> JSON serialization/deserialization</li>
            <li><strong>Network Framework:</strong> Low-level networking</li>
            <li><strong>Third-party Libraries:</strong> Alamofire, Moya</li>
          </ul>
          
          <h3>App Store Deployment</h3>
          <ul>
            <li><strong>Apple Developer Account:</strong> Required for distribution</li>
            <li><strong>Code Signing:</strong> App authenticity verification</li>
            <li><strong>App Store Connect:</strong> Manage app metadata and releases</li>
            <li><strong>Review Guidelines:</strong> Apple's strict quality standards</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the purpose of Optionals in Swift?',
              options: ['Improve performance', 'Handle null values safely', 'Reduce memory usage', 'Speed up compilation'],
              correctAnswer: 1,
              explanation: 'Optionals in Swift provide a safe way to handle values that might be nil (null), preventing runtime crashes.'
            },
            {
              id: 'q2',
              question: 'Which is Apple\'s modern declarative UI framework?',
              options: ['UIKit', 'SwiftUI', 'AppKit', 'Core Graphics'],
              correctAnswer: 1,
              explanation: 'SwiftUI is Apple\'s modern declarative framework for building user interfaces across all Apple platforms.'
            },
            {
              id: 'q3',
              question: 'What does ARC stand for in Swift?',
              options: ['Automatic Resource Control', 'Automatic Reference Counting', 'Advanced Runtime Compiler', 'Application Resource Cache'],
              correctAnswer: 1,
              explanation: 'ARC (Automatic Reference Counting) manages memory automatically by tracking object references.'
            },
            {
              id: 'q4',
              question: 'What is required to publish an app on the App Store?',
              options: ['Free Apple ID', 'Apple Developer Account', 'Mac computer only', 'Xcode license'],
              correctAnswer: 1,
              explanation: 'An Apple Developer Account (paid membership) is required to distribute apps on the App Store.'
            }
          ]
        }
      },
      {
        title: 'Flutter Development',
        short_description: 'Build beautiful, natively compiled applications with a single codebase',
        article_content: `
          <h3>What is Flutter?</h3>
          <p>Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, desktop, and embedded devices from a single codebase. It uses the Dart programming language.</p>
          
          <h3>Key Advantages</h3>
          <ul>
            <li><strong>Single Codebase:</strong> Write once, run on iOS, Android, web, desktop</li>
            <li><strong>Fast Development:</strong> Hot reload for instant updates</li>
            <li><strong>High Performance:</strong> Compiled to native machine code</li>
            <li><strong>Rich UI:</strong> Beautiful, customizable widgets</li>
            <li><strong>Growing Ecosystem:</strong> Extensive package repository</li>
          </ul>
          
          <h3>Dart Programming Language</h3>
          
          <h4>Key Features</h4>
          <ul>
            <li><strong>Object-Oriented:</strong> Classes, inheritance, mixins</li>
            <li><strong>Type Safe:</strong> Sound null safety</li>
            <li><strong>Async Programming:</strong> Future, async/await, Streams</li>
            <li><strong>Just-in-Time (JIT):</strong> Fast development cycle</li>
            <li><strong>Ahead-of-Time (AOT):</strong> Optimized production builds</li>
          </ul>
          
          <h4>Basic Syntax</h4>
          <ul>
            <li>Similar to Java/C# syntax</li>
            <li>Strong typing with type inference</li>
            <li>Null safety with ? and ! operators</li>
            <li>Collection literals and spread operators</li>
          </ul>
          
          <h3>Flutter Architecture</h3>
          
          <h4>Everything is a Widget</h4>
          <ul>
            <li><strong>StatelessWidget:</strong> Immutable widgets</li>
            <li><strong>StatefulWidget:</strong> Widgets that can change</li>
            <li><strong>InheritedWidget:</strong> Data propagation down the tree</li>
            <li><strong>Widget Tree:</strong> Hierarchical structure of UI elements</li>
          </ul>
          
          <h4>Core Widgets</h4>
          <ul>
            <li><strong>Material Design:</strong> MaterialApp, Scaffold, AppBar</li>
            <li><strong>Cupertino:</strong> iOS-style widgets</li>
            <li><strong>Layout:</strong> Container, Column, Row, Stack</li>
            <li><strong>Input:</strong> TextField, Button, Checkbox</li>
            <li><strong>Display:</strong> Text, Image, Icon</li>
          </ul>
          
          <h3>State Management</h3>
          
          <h4>Built-in Options</h4>
          <ul>
            <li><strong>setState():</strong> Simple local state</li>
            <li><strong>InheritedWidget:</strong> Data sharing</li>
            <li><strong>ValueNotifier:</strong> Simple reactive state</li>
          </ul>
          
          <h4>Popular Packages</h4>
          <ul>
            <li><strong>Provider:</strong> Dependency injection and state management</li>
            <li><strong>Bloc:</strong> Business logic component pattern</li>
            <li><strong>Riverpod:</strong> Modern provider alternative</li>
            <li><strong>GetX:</strong> State management with navigation and DI</li>
          </ul>
          
          <h3>Navigation</h3>
          <ul>
            <li><strong>Navigator:</strong> Built-in navigation system</li>
            <li><strong>Named Routes:</strong> String-based navigation</li>
            <li><strong>MaterialPageRoute:</strong> Platform-specific transitions</li>
            <li><strong>Custom Routes:</strong> Custom page transitions</li>
          </ul>
          
          <h3>Networking and Data</h3>
          <ul>
            <li><strong>http Package:</strong> HTTP requests</li>
            <li><strong>dio:</strong> Powerful HTTP client</li>
            <li><strong>json_annotation:</strong> JSON serialization</li>
            <li><strong>sqflite:</strong> SQLite database</li>
            <li><strong>shared_preferences:</strong> Key-value storage</li>
          </ul>
          
          <h3>Platform Integration</h3>
          <ul>
            <li><strong>Platform Channels:</strong> Communicate with native code</li>
            <li><strong>Platform-specific Code:</strong> iOS/Android specific implementations</li>
            <li><strong>Plugins:</strong> Access device features (camera, GPS, etc.)</li>
            <li><strong>Platform Views:</strong> Embed native views</li>
          </ul>
          
          <h3>Development Tools</h3>
          <ul>
            <li><strong>Flutter CLI:</strong> Command-line tools</li>
            <li><strong>Flutter Inspector:</strong> Debug widget tree</li>
            <li><strong>Hot Reload:</strong> Instant code updates</li>
            <li><strong>Flutter DevTools:</strong> Performance profiling</li>
          </ul>
          
          <h3>Testing</h3>
          <ul>
            <li><strong>Unit Tests:</strong> Test individual functions</li>
            <li><strong>Widget Tests:</strong> Test UI components</li>
            <li><strong>Integration Tests:</strong> Test complete app flows</li>
            <li><strong>Golden Tests:</strong> Visual regression testing</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What programming language does Flutter use?',
              options: ['JavaScript', 'Kotlin', 'Dart', 'Swift'],
              correctAnswer: 2,
              explanation: 'Flutter uses Dart, a programming language developed by Google specifically optimized for client-side development.'
            },
            {
              id: 'q2',
              question: 'What is the fundamental principle of Flutter UI?',
              options: ['Everything is a component', 'Everything is a widget', 'Everything is a view', 'Everything is a fragment'],
              correctAnswer: 1,
              explanation: 'In Flutter, everything is a widget - from layout structures to styling to the app itself.'
            },
            {
              id: 'q3',
              question: 'What is the difference between StatelessWidget and StatefulWidget?',
              options: ['No difference', 'StatelessWidget can change, StatefulWidget cannot', 'StatelessWidget cannot change, StatefulWidget can', 'StatelessWidget is faster'],
              correctAnswer: 2,
              explanation: 'StatelessWidget is immutable (cannot change), while StatefulWidget can change its internal state.'
            },
            {
              id: 'q4',
              question: 'What feature allows instant code updates during development?',
              options: ['Hot Restart', 'Hot Reload', 'Live Update', 'Fast Refresh'],
              correctAnswer: 1,
              explanation: 'Hot Reload allows developers to see code changes instantly without losing the app state.'
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
      { concept: 1, prerequisite: 0 }, // React Native depends on Mobile Dev Fundamentals
      { concept: 2, prerequisite: 0 }, // Swift & iOS depends on Mobile Dev Fundamentals
      { concept: 3, prerequisite: 0 }, // Flutter depends on Mobile Dev Fundamentals
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

    console.log('✅ Mobile Development roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Mobile Development roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createMobileDevRoadmap();
}
