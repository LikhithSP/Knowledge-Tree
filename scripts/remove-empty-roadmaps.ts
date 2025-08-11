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

async function removeEmptyRoadmaps() {
  console.log('🧹 Removing empty roadmaps (0 concepts)...');

  try {
    // Get all roadmaps with their concept counts
    const { data: roadmaps, error: roadmapsError } = await supabase
      .from('roadmaps')
      .select(`
        id,
        title,
        concepts (
          id
        )
      `);

    if (roadmapsError) {
      throw roadmapsError;
    }

    console.log(`Found ${roadmaps.length} roadmaps total`);

    // Find empty roadmaps
    const emptyRoadmaps = roadmaps.filter(roadmap => !roadmap.concepts || roadmap.concepts.length === 0);
    
    if (emptyRoadmaps.length === 0) {
      console.log('✅ No empty roadmaps found!');
      return;
    }

    console.log(`\n🗑️  Found ${emptyRoadmaps.length} empty roadmaps to remove:`);
    
    for (const roadmap of emptyRoadmaps) {
      console.log(`❌ Removing "${roadmap.title}" (ID: ${roadmap.id})`);
      
      // Delete the roadmap
      const { error: deleteError } = await supabase
        .from('roadmaps')
        .delete()
        .eq('id', roadmap.id);
        
      if (deleteError) {
        console.error(`Error deleting roadmap ${roadmap.id}:`, deleteError);
      }
    }

    // Get final count
    const { data: finalRoadmaps, error: finalError } = await supabase
      .from('roadmaps')
      .select('id, title, concepts(id)');

    if (finalError) {
      throw finalError;
    }

    console.log('\n📊 Final roadmap summary:');
    finalRoadmaps.forEach(roadmap => {
      console.log(`• ${roadmap.title}: ${roadmap.concepts?.length || 0} concepts`);
    });

    console.log('\n✅ Empty roadmaps cleanup completed!');

  } catch (error) {
    console.error('Error removing empty roadmaps:', error);
    process.exit(1);
  }
}

// Run the cleanup
if (require.main === module) {
  removeEmptyRoadmaps();
}
