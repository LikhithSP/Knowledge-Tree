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

async function createDigitalMarketingRoadmap() {
  console.log('Creating Digital Marketing roadmap...');

  try {
    // Create Digital Marketing roadmap
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .insert([{
        title: 'Digital Marketing',
        description: 'Master online marketing strategies and grow your digital presence',
        icon: 'megaphone'
      }])
      .select()
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    console.log(`Created roadmap: ${roadmap.title}`);

    // Create Digital Marketing concepts
    const concepts = [
      {
        title: 'Digital Marketing Fundamentals',
        short_description: 'Understanding the digital marketing landscape and core concepts',
        article_content: `
          <h3>What is Digital Marketing?</h3>
          <p>Digital marketing is the promotion of brands and products through electronic media and digital channels to connect with customers where they spend their time: online.</p>
          
          <h3>Evolution of Marketing</h3>
          <ul>
            <li><strong>Traditional Marketing:</strong> Print, TV, radio, billboards</li>
            <li><strong>Digital Marketing:</strong> Internet-based, data-driven, interactive</li>
            <li><strong>Key Difference:</strong> Two-way communication and measurable results</li>
          </ul>
          
          <h3>Digital Marketing Channels</h3>
          
          <h4>Search Engine Marketing</h4>
          <ul>
            <li><strong>SEO (Search Engine Optimization):</strong> Organic search visibility</li>
            <li><strong>SEM (Search Engine Marketing):</strong> Paid search advertising</li>
            <li><strong>Local SEO:</strong> Location-based search optimization</li>
          </ul>
          
          <h4>Social Media Marketing</h4>
          <ul>
            <li><strong>Organic Social:</strong> Free content posting and engagement</li>
            <li><strong>Paid Social:</strong> Sponsored posts and targeted advertising</li>
            <li><strong>Influencer Marketing:</strong> Partnerships with content creators</li>
          </ul>
          
          <h4>Content Marketing</h4>
          <ul>
            <li><strong>Blog Content:</strong> Educational and engaging articles</li>
            <li><strong>Video Marketing:</strong> YouTube, TikTok, Instagram Reels</li>
            <li><strong>Podcasting:</strong> Audio content for niche audiences</li>
            <li><strong>Visual Content:</strong> Infographics, images, presentations</li>
          </ul>
          
          <h4>Email Marketing</h4>
          <ul>
            <li><strong>Newsletter Campaigns:</strong> Regular updates to subscribers</li>
            <li><strong>Automated Sequences:</strong> Welcome series, nurture campaigns</li>
            <li><strong>Transactional Emails:</strong> Order confirmations, receipts</li>
          </ul>
          
          <h3>Digital Marketing Funnel</h3>
          <ul>
            <li><strong>Awareness:</strong> Making potential customers aware of your brand</li>
            <li><strong>Interest:</strong> Generating interest in your products/services</li>
            <li><strong>Consideration:</strong> Nurturing leads to consider purchase</li>
            <li><strong>Conversion:</strong> Converting prospects into customers</li>
            <li><strong>Retention:</strong> Keeping customers engaged and loyal</li>
            <li><strong>Advocacy:</strong> Turning customers into brand advocates</li>
          </ul>
          
          <h3>Key Performance Indicators (KPIs)</h3>
          <ul>
            <li><strong>Traffic Metrics:</strong> Website visits, page views, bounce rate</li>
            <li><strong>Engagement Metrics:</strong> Likes, shares, comments, time on site</li>
            <li><strong>Conversion Metrics:</strong> Conversion rate, cost per acquisition</li>
            <li><strong>Revenue Metrics:</strong> Return on ad spend (ROAS), lifetime value</li>
          </ul>
          
          <h3>Digital Marketing Tools</h3>
          <ul>
            <li><strong>Analytics:</strong> Google Analytics, Adobe Analytics</li>
            <li><strong>SEO:</strong> SEMrush, Ahrefs, Moz</li>
            <li><strong>Social Media:</strong> Hootsuite, Buffer, Sprout Social</li>
            <li><strong>Email:</strong> Mailchimp, ConvertKit, Klaviyo</li>
            <li><strong>Design:</strong> Canva, Adobe Creative Suite</li>
          </ul>
          
          <h3>Trends in Digital Marketing</h3>
          <ul>
            <li><strong>Personalization:</strong> Tailored content for individual users</li>
            <li><strong>AI and Automation:</strong> Chatbots, predictive analytics</li>
            <li><strong>Voice Search:</strong> Optimizing for voice assistants</li>
            <li><strong>Video Content:</strong> Short-form and live video dominance</li>
            <li><strong>Privacy-First:</strong> Cookieless tracking, consent management</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main advantage of digital marketing over traditional marketing?',
              options: ['Lower cost', 'Measurable results and two-way communication', 'Easier to implement', 'Reaches more people'],
              correctAnswer: 1,
              explanation: 'Digital marketing allows for measurable results and two-way communication with customers, unlike traditional one-way marketing.'
            },
            {
              id: 'q2',
              question: 'Which stage of the marketing funnel focuses on keeping existing customers engaged?',
              options: ['Awareness', 'Consideration', 'Conversion', 'Retention'],
              correctAnswer: 3,
              explanation: 'Retention focuses on keeping existing customers engaged and encouraging repeat purchases.'
            },
            {
              id: 'q3',
              question: 'What does ROAS stand for?',
              options: ['Return on Ad Spend', 'Rate of Audience Satisfaction', 'Revenue of Automated Systems', 'Reach of Active Subscribers'],
              correctAnswer: 0,
              explanation: 'ROAS stands for Return on Ad Spend, measuring the revenue generated for every dollar spent on advertising.'
            },
            {
              id: 'q4',
              question: 'Which type of content marketing has gained popularity on platforms like TikTok?',
              options: ['Long-form blog posts', 'Email newsletters', 'Short-form video content', 'Podcast episodes'],
              correctAnswer: 2,
              explanation: 'Short-form video content has become extremely popular on platforms like TikTok, Instagram Reels, and YouTube Shorts.'
            }
          ]
        }
      },
      {
        title: 'SEO & SEM Strategies',
        short_description: 'Master search engine optimization and paid search marketing',
        article_content: `
          <h3>Search Engine Optimization (SEO)</h3>
          <p>SEO is the practice of optimizing your website to increase its visibility when people search for products or services related to your business in search engines.</p>
          
          <h3>How Search Engines Work</h3>
          <ul>
            <li><strong>Crawling:</strong> Search bots discover and scan web pages</li>
            <li><strong>Indexing:</strong> Pages are stored in the search engine's database</li>
            <li><strong>Ranking:</strong> Algorithm determines page order for search queries</li>
            <li><strong>Serving:</strong> Results are displayed to users</li>
          </ul>
          
          <h3>Types of SEO</h3>
          
          <h4>On-Page SEO</h4>
          <ul>
            <li><strong>Keyword Research:</strong> Finding terms your audience searches for</li>
            <li><strong>Title Tags:</strong> Optimizing page titles for search and users</li>
            <li><strong>Meta Descriptions:</strong> Compelling snippets in search results</li>
            <li><strong>Header Tags:</strong> Organizing content with H1, H2, H3 tags</li>
            <li><strong>Internal Linking:</strong> Connecting related pages on your site</li>
            <li><strong>Content Optimization:</strong> High-quality, relevant content</li>
          </ul>
          
          <h4>Technical SEO</h4>
          <ul>
            <li><strong>Site Speed:</strong> Fast loading times improve rankings</li>
            <li><strong>Mobile Optimization:</strong> Responsive design for mobile devices</li>
            <li><strong>SSL Certificate:</strong> Secure HTTPS connection</li>
            <li><strong>XML Sitemaps:</strong> Help search engines understand site structure</li>
            <li><strong>Robots.txt:</strong> Guide search engine crawling</li>
            <li><strong>Schema Markup:</strong> Structured data for rich snippets</li>
          </ul>
          
          <h4>Off-Page SEO</h4>
          <ul>
            <li><strong>Link Building:</strong> Earning backlinks from other websites</li>
            <li><strong>Guest Posting:</strong> Writing content for other sites</li>
            <li><strong>Social Signals:</strong> Social media engagement and shares</li>
            <li><strong>Local Citations:</strong> Business listings in directories</li>
            <li><strong>Brand Mentions:</strong> Unlinked mentions of your brand</li>
          </ul>
          
          <h3>Search Engine Marketing (SEM)</h3>
          <p>SEM involves paid advertising on search engines to increase visibility in search results pages.</p>
          
          <h3>Google Ads Platform</h3>
          
          <h4>Campaign Types</h4>
          <ul>
            <li><strong>Search Campaigns:</strong> Text ads in search results</li>
            <li><strong>Display Campaigns:</strong> Visual ads on websites</li>
            <li><strong>Shopping Campaigns:</strong> Product listings with images</li>
            <li><strong>Video Campaigns:</strong> YouTube video advertisements</li>
            <li><strong>App Campaigns:</strong> Promote mobile app downloads</li>
          </ul>
          
          <h4>Keyword Strategy</h4>
          <ul>
            <li><strong>Broad Match:</strong> Widest reach, less control</li>
            <li><strong>Phrase Match:</strong> Moderate control and reach</li>
            <li><strong>Exact Match:</strong> Precise targeting, limited reach</li>
            <li><strong>Negative Keywords:</strong> Exclude irrelevant searches</li>
          </ul>
          
          <h4>Bidding Strategies</h4>
          <ul>
            <li><strong>Manual CPC:</strong> Set your own bid amounts</li>
            <li><strong>Enhanced CPC:</strong> Automated bid adjustments</li>
            <li><strong>Target CPA:</strong> Optimize for cost per acquisition</li>
            <li><strong>Target ROAS:</strong> Optimize for return on ad spend</li>
          </ul>
          
          <h3>SEO vs SEM Comparison</h3>
          
          <h4>SEO Advantages</h4>
          <ul>
            <li>Free organic traffic</li>
            <li>Long-term sustainable results</li>
            <li>Higher trust and credibility</li>
            <li>Better click-through rates</li>
          </ul>
          
          <h4>SEM Advantages</h4>
          <ul>
            <li>Immediate visibility</li>
            <li>Precise targeting options</li>
            <li>Detailed performance data</li>
            <li>Control over ad messaging</li>
          </ul>
          
          <h3>SEO Tools</h3>
          <ul>
            <li><strong>Free Tools:</strong> Google Search Console, Google Analytics</li>
            <li><strong>Keyword Research:</strong> SEMrush, Ahrefs, Ubersuggest</li>
            <li><strong>Technical SEO:</strong> Screaming Frog, GTmetrix</li>
            <li><strong>Content:</strong> Yoast SEO, Surfer SEO</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the main difference between SEO and SEM?',
              options: ['SEO is faster than SEM', 'SEO is organic, SEM is paid', 'SEM only works on Google', 'There is no difference'],
              correctAnswer: 1,
              explanation: 'SEO focuses on organic (free) search results, while SEM involves paid advertising on search engines.'
            },
            {
              id: 'q2',
              question: 'Which is NOT a component of on-page SEO?',
              options: ['Title tags', 'Meta descriptions', 'Link building', 'Header tags'],
              correctAnswer: 2,
              explanation: 'Link building is part of off-page SEO, not on-page SEO. It involves getting other websites to link to yours.'
            },
            {
              id: 'q3',
              question: 'What keyword match type provides the widest reach in Google Ads?',
              options: ['Exact match', 'Phrase match', 'Broad match', 'Negative match'],
              correctAnswer: 2,
              explanation: 'Broad match provides the widest reach as it shows ads for searches related to your keyword, including synonyms and variations.'
            },
            {
              id: 'q4',
              question: 'What is schema markup used for?',
              options: ['Improving site speed', 'Creating rich snippets in search results', 'Building backlinks', 'Keyword research'],
              correctAnswer: 1,
              explanation: 'Schema markup is structured data that helps search engines understand content and create rich snippets in search results.'
            }
          ]
        }
      },
      {
        title: 'Social Media Marketing',
        short_description: 'Build brand presence and engage audiences on social platforms',
        article_content: `
          <h3>Social Media Marketing Overview</h3>
          <p>Social media marketing involves creating and sharing content on social media networks to achieve marketing and branding goals. It includes posting text and image updates, videos, and other content that drives audience engagement.</p>
          
          <h3>Major Social Media Platforms</h3>
          
          <h4>Facebook</h4>
          <ul>
            <li><strong>Demographics:</strong> Broad age range, largest user base</li>
            <li><strong>Content Types:</strong> Posts, stories, videos, live streams</li>
            <li><strong>Business Features:</strong> Facebook Pages, Groups, Marketplace</li>
            <li><strong>Advertising:</strong> Detailed targeting options, various ad formats</li>
          </ul>
          
          <h4>Instagram</h4>
          <ul>
            <li><strong>Demographics:</strong> Younger audience, visual-focused</li>
            <li><strong>Content Types:</strong> Photos, videos, stories, reels, IGTV</li>
            <li><strong>Business Features:</strong> Shopping tags, Instagram Shop</li>
            <li><strong>Trends:</strong> Influencer marketing, user-generated content</li>
          </ul>
          
          <h4>LinkedIn</h4>
          <ul>
            <li><strong>Demographics:</strong> Professionals, B2B focus</li>
            <li><strong>Content Types:</strong> Articles, posts, documents, videos</li>
            <li><strong>Business Features:</strong> Company pages, LinkedIn Sales Navigator</li>
            <li><strong>Ideal For:</strong> Thought leadership, B2B marketing</li>
          </ul>
          
          <h4>TikTok</h4>
          <ul>
            <li><strong>Demographics:</strong> Gen Z and younger millennials</li>
            <li><strong>Content Types:</strong> Short-form vertical videos</li>
            <li><strong>Features:</strong> Effects, filters, sounds, challenges</li>
            <li><strong>Marketing:</strong> Trend-based content, hashtag challenges</li>
          </ul>
          
          <h4>YouTube</h4>
          <ul>
            <li><strong>Demographics:</strong> All ages, second largest search engine</li>
            <li><strong>Content Types:</strong> Long-form videos, YouTube Shorts</li>
            <li><strong>Monetization:</strong> Ad revenue, channel memberships, Super Chat</li>
            <li><strong>SEO:</strong> Video optimization for search discovery</li>
          </ul>
          
          <h3>Social Media Strategy Development</h3>
          
          <h4>Goal Setting</h4>
          <ul>
            <li><strong>Brand Awareness:</strong> Increase visibility and recognition</li>
            <li><strong>Lead Generation:</strong> Capture potential customer information</li>
            <li><strong>Customer Service:</strong> Provide support and resolve issues</li>
            <li><strong>Community Building:</strong> Foster engagement and loyalty</li>
            <li><strong>Sales:</strong> Drive direct purchases through social channels</li>
          </ul>
          
          <h4>Audience Research</h4>
          <ul>
            <li><strong>Demographics:</strong> Age, gender, location, income</li>
            <li><strong>Psychographics:</strong> Interests, values, lifestyle</li>
            <li><strong>Behavior:</strong> Online activity, purchase patterns</li>
            <li><strong>Platform Preferences:</strong> Where they spend time online</li>
          </ul>
          
          <h3>Content Strategy</h3>
          
          <h4>Content Types</h4>
          <ul>
            <li><strong>Educational:</strong> How-to guides, tips, tutorials</li>
            <li><strong>Entertainment:</strong> Funny, inspiring, engaging content</li>
            <li><strong>Promotional:</strong> Product features, sales, announcements</li>
            <li><strong>User-Generated:</strong> Customer photos, reviews, testimonials</li>
            <li><strong>Behind-the-Scenes:</strong> Company culture, process insights</li>
          </ul>
          
          <h4>Content Calendar</h4>
          <ul>
            <li><strong>Planning:</strong> Map content to business goals and events</li>
            <li><strong>Scheduling:</strong> Consistent posting times and frequency</li>
            <li><strong>Themes:</strong> Weekly or daily content themes</li>
            <li><strong>Flexibility:</strong> Room for trending topics and real-time content</li>
          </ul>
          
          <h3>Engagement and Community Management</h3>
          <ul>
            <li><strong>Response Strategy:</strong> Timely replies to comments and messages</li>
            <li><strong>Crisis Management:</strong> Handling negative feedback professionally</li>
            <li><strong>Community Guidelines:</strong> Setting expectations for interactions</li>
            <li><strong>User-Generated Content:</strong> Encouraging and sharing customer content</li>
          </ul>
          
          <h3>Social Media Advertising</h3>
          
          <h4>Targeting Options</h4>
          <ul>
            <li><strong>Demographic:</strong> Age, gender, location</li>
            <li><strong>Interest:</strong> Hobbies, activities, pages liked</li>
            <li><strong>Behavioral:</strong> Purchase history, device usage</li>
            <li><strong>Custom Audiences:</strong> Email lists, website visitors</li>
            <li><strong>Lookalike Audiences:</strong> Similar to existing customers</li>
          </ul>
          
          <h4>Ad Formats</h4>
          <ul>
            <li><strong>Image Ads:</strong> Single photo with text</li>
            <li><strong>Video Ads:</strong> Engaging video content</li>
            <li><strong>Carousel Ads:</strong> Multiple images or videos</li>
            <li><strong>Collection Ads:</strong> Product catalog showcase</li>
            <li><strong>Story Ads:</strong> Full-screen mobile experiences</li>
          </ul>
          
          <h3>Analytics and Measurement</h3>
          <ul>
            <li><strong>Reach:</strong> Number of unique users who saw content</li>
            <li><strong>Impressions:</strong> Total number of times content was displayed</li>
            <li><strong>Engagement Rate:</strong> Likes, comments, shares per follower</li>
            <li><strong>Click-Through Rate:</strong> Clicks divided by impressions</li>
            <li><strong>Conversion Rate:</strong> Actions taken divided by clicks</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'Which social media platform is best for B2B marketing?',
              options: ['TikTok', 'Instagram', 'LinkedIn', 'Snapchat'],
              correctAnswer: 2,
              explanation: 'LinkedIn is the premier professional networking platform, making it ideal for B2B marketing and thought leadership.'
            },
            {
              id: 'q2',
              question: 'What type of content performs best on TikTok?',
              options: ['Long-form educational videos', 'Professional headshots', 'Short-form vertical videos', 'Text-only posts'],
              correctAnswer: 2,
              explanation: 'TikTok is designed for short-form vertical videos, typically 15-60 seconds long with creative effects and sounds.'
            },
            {
              id: 'q3',
              question: 'What is a lookalike audience in social media advertising?',
              options: ['People who look similar to your employees', 'An audience similar to your existing customers', 'People with the same interests', 'Users from the same location'],
              correctAnswer: 1,
              explanation: 'Lookalike audiences are created by platforms to find new users who share similar characteristics with your existing customers.'
            },
            {
              id: 'q4',
              question: 'Which metric measures the total number of times content was displayed?',
              options: ['Reach', 'Engagement', 'Impressions', 'Clicks'],
              correctAnswer: 2,
              explanation: 'Impressions measure the total number of times content was displayed, regardless of whether users interacted with it.'
            }
          ]
        }
      },
      {
        title: 'Content Marketing & Analytics',
        short_description: 'Create compelling content and measure marketing performance',
        article_content: `
          <h3>Content Marketing Strategy</h3>
          <p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience.</p>
          
          <h3>Types of Content</h3>
          
          <h4>Written Content</h4>
          <ul>
            <li><strong>Blog Posts:</strong> Educational articles, tutorials, industry insights</li>
            <li><strong>E-books:</strong> In-depth guides and comprehensive resources</li>
            <li><strong>Whitepapers:</strong> Research-based authoritative reports</li>
            <li><strong>Case Studies:</strong> Success stories and problem-solving examples</li>
            <li><strong>Email Newsletters:</strong> Regular updates and curated content</li>
          </ul>
          
          <h4>Visual Content</h4>
          <ul>
            <li><strong>Infographics:</strong> Visual representations of data and information</li>
            <li><strong>Images:</strong> Photography, illustrations, graphics</li>
            <li><strong>Presentations:</strong> SlideShare decks and visual storytelling</li>
            <li><strong>Interactive Content:</strong> Quizzes, polls, calculators</li>
          </ul>
          
          <h4>Video Content</h4>
          <ul>
            <li><strong>Educational Videos:</strong> Tutorials, how-to guides, explainers</li>
            <li><strong>Webinars:</strong> Live and recorded educational sessions</li>
            <li><strong>Product Demos:</strong> Showcasing features and benefits</li>
            <li><strong>Behind-the-Scenes:</strong> Company culture and process videos</li>
            <li><strong>Live Streaming:</strong> Real-time engagement with audience</li>
          </ul>
          
          <h4>Audio Content</h4>
          <ul>
            <li><strong>Podcasts:</strong> Serial audio content on specific topics</li>
            <li><strong>Audiobooks:</strong> Spoken versions of written content</li>
            <li><strong>Voice Content:</strong> Optimized for smart speakers</li>
          </ul>
          
          <h3>Content Marketing Process</h3>
          
          <h4>Research and Planning</h4>
          <ul>
            <li><strong>Audience Research:</strong> Understanding target demographics and preferences</li>
            <li><strong>Competitor Analysis:</strong> Studying competitor content strategies</li>
            <li><strong>Keyword Research:</strong> Finding topics your audience searches for</li>
            <li><strong>Content Gap Analysis:</strong> Identifying missed opportunities</li>
          </ul>
          
          <h4>Content Creation</h4>
          <ul>
            <li><strong>Editorial Calendar:</strong> Planning content themes and schedules</li>
            <li><strong>Content Brief:</strong> Detailed specifications for each piece</li>
            <li><strong>Writing Process:</strong> Research, outline, draft, edit, review</li>
            <li><strong>Design and Production:</strong> Visual elements and formatting</li>
          </ul>
          
          <h4>Distribution and Promotion</h4>
          <ul>
            <li><strong>Owned Media:</strong> Website, blog, email list</li>
            <li><strong>Earned Media:</strong> PR, word-of-mouth, shares</li>
            <li><strong>Paid Media:</strong> Sponsored content, social ads</li>
            <li><strong>Content Syndication:</strong> Publishing on third-party platforms</li>
          </ul>
          
          <h3>Digital Marketing Analytics</h3>
          
          <h4>Google Analytics</h4>
          <ul>
            <li><strong>Traffic Sources:</strong> Organic, direct, referral, social, paid</li>
            <li><strong>User Behavior:</strong> Page views, session duration, bounce rate</li>
            <li><strong>Conversions:</strong> Goal completions and e-commerce tracking</li>
            <li><strong>Audience Insights:</strong> Demographics, interests, technology</li>
          </ul>
          
          <h4>Content Performance Metrics</h4>
          <ul>
            <li><strong>Traffic Metrics:</strong> Page views, unique visitors, session duration</li>
            <li><strong>Engagement Metrics:</strong> Comments, shares, time on page</li>
            <li><strong>Conversion Metrics:</strong> Lead generation, sales, sign-ups</li>
            <li><strong>SEO Metrics:</strong> Organic rankings, click-through rates</li>
          </ul>
          
          <h4>Social Media Analytics</h4>
          <ul>
            <li><strong>Reach and Impressions:</strong> How many people saw your content</li>
            <li><strong>Engagement:</strong> Likes, comments, shares, saves</li>
            <li><strong>Follower Growth:</strong> Rate of new followers and retention</li>
            <li><strong>Click-Through Rate:</strong> Traffic driven to your website</li>
          </ul>
          
          <h4>Email Marketing Analytics</h4>
          <ul>
            <li><strong>Open Rate:</strong> Percentage of recipients who opened emails</li>
            <li><strong>Click Rate:</strong> Percentage who clicked on email links</li>
            <li><strong>Conversion Rate:</strong> Actions taken after clicking</li>
            <li><strong>List Growth:</strong> New subscribers vs. unsubscribes</li>
          </ul>
          
          <h3>Marketing Attribution</h3>
          <ul>
            <li><strong>First-Touch Attribution:</strong> Credit to first interaction</li>
            <li><strong>Last-Touch Attribution:</strong> Credit to final interaction</li>
            <li><strong>Multi-Touch Attribution:</strong> Credit distributed across touchpoints</li>
            <li><strong>Time-Decay Attribution:</strong> More credit to recent interactions</li>
          </ul>
          
          <h3>Key Performance Indicators (KPIs)</h3>
          
          <h4>Awareness KPIs</h4>
          <ul>
            <li>Brand mention volume</li>
            <li>Social media reach and impressions</li>
            <li>Website traffic growth</li>
            <li>Search volume for brand terms</li>
          </ul>
          
          <h4>Engagement KPIs</h4>
          <ul>
            <li>Social media engagement rate</li>
            <li>Email open and click rates</li>
            <li>Website session duration</li>
            <li>Content shares and comments</li>
          </ul>
          
          <h4>Conversion KPIs</h4>
          <ul>
            <li>Lead generation rate</li>
            <li>Cost per acquisition (CPA)</li>
            <li>Return on ad spend (ROAS)</li>
            <li>Customer lifetime value (CLV)</li>
          </ul>
          
          <h3>Reporting and Optimization</h3>
          <ul>
            <li><strong>Regular Reporting:</strong> Daily, weekly, monthly dashboards</li>
            <li><strong>Performance Analysis:</strong> Identify top and bottom performers</li>
            <li><strong>A/B Testing:</strong> Test different content approaches</li>
            <li><strong>Continuous Improvement:</strong> Iterate based on data insights</li>
          </ul>
        `,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the primary goal of content marketing?',
              options: ['To sell products directly', 'To create valuable content that attracts and retains audience', 'To increase website speed', 'To reduce marketing costs'],
              correctAnswer: 1,
              explanation: 'Content marketing focuses on creating valuable, relevant content to attract and retain a clearly defined audience, ultimately driving profitable customer action.'
            },
            {
              id: 'q2',
              question: 'Which metric measures how many people opened your email?',
              options: ['Click rate', 'Conversion rate', 'Open rate', 'Bounce rate'],
              correctAnswer: 2,
              explanation: 'Open rate measures the percentage of email recipients who opened your email out of the total number of emails delivered.'
            },
            {
              id: 'q3',
              question: 'What is multi-touch attribution?',
              options: ['Touching multiple devices', 'Credit given only to the last interaction', 'Credit distributed across all customer touchpoints', 'Multiple people making the purchase'],
              correctAnswer: 2,
              explanation: 'Multi-touch attribution distributes conversion credit across all customer touchpoints in the journey, not just the first or last interaction.'
            },
            {
              id: 'q4',
              question: 'Which type of content is best for demonstrating product features?',
              options: ['Blog posts', 'Infographics', 'Product demo videos', 'Email newsletters'],
              correctAnswer: 2,
              explanation: 'Product demo videos are most effective for showing how products work and demonstrating their features and benefits visually.'
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
      { concept: 1, prerequisite: 0 }, // SEO & SEM depends on Digital Marketing Fundamentals
      { concept: 2, prerequisite: 0 }, // Social Media Marketing depends on Digital Marketing Fundamentals
      { concept: 3, prerequisite: 0 }, // Content Marketing depends on Digital Marketing Fundamentals
      { concept: 3, prerequisite: 1 }, // Content Marketing also depends on SEO & SEM
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

    console.log('✅ Digital Marketing roadmap created successfully!');

  } catch (error) {
    console.error('Error creating Digital Marketing roadmap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  createDigitalMarketingRoadmap();
}
