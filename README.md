# Knowledge Tree - Interactive Learning Platform

Knowledge Tree is an interactive, guided learning platform where users explore visual roadmaps, learn concepts sequentially, and unlock new knowledge by demonstrating understanding through quizzes.

## Features

- **Visual Learning Roadmaps**: Interactive node-based learning paths using React Flow
- **Progressive Unlocking**: Concepts unlock as prerequisites are completed
- **AI-Generated Content**: Articles and quizzes created using DeepSeek API
- **User Authentication**: Secure login with Supabase Auth (Email/Password, Google OAuth)
- **Progress Tracking**: Real-time progress tracking and completion status
- **Responsive Design**: Modern UI built with Tailwind CSS

## Technology Stack

- **Frontend**: Next.js (React) with TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI/Styling**: Tailwind CSS
- **Visualization**: React Flow for interactive roadmaps
- **AI Content**: DeepSeek API for generating articles and quizzes
- **Icons**: Lucide React

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- A DeepSeek API key

### 2. Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the database schema from `database/schema.sql`
4. Enable Google OAuth (optional):
   - Go to Authentication > Providers
   - Enable Google provider
   - Configure with your Google OAuth credentials

### 3. Environment Setup

1. Fill in your environment variables in `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # DeepSeek API Configuration  
   DEEPSEEK_API_KEY=your_deepseek_api_key
   
   # Environment
   NODE_ENV=development
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Generate Sample Content (Optional)

Generate sample roadmaps and concepts with AI-generated content:

```bash
npm run generate-content
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
