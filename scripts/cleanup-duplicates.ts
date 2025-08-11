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

async function cleanupDuplicateRoadmaps() {
  console.log('🧹 Cleaning up duplicate roadmaps...');

  try {
    // Get all roadmaps with their concept counts
    const { data: roadmaps, error: roadmapsError } = await supabase
      .from('roadmaps')
      .select(`
        id,
        title,
        description,
        icon,
        created_at,
        concepts (
          id,
          title
        )
      `);

    if (roadmapsError) {
      throw roadmapsError;
    }

    console.log(`Found ${roadmaps.length} roadmaps total`);

    // Group roadmaps by title to find duplicates
    const roadmapGroups: { [title: string]: any[] } = {};
    roadmaps.forEach(roadmap => {
      if (!roadmapGroups[roadmap.title]) {
        roadmapGroups[roadmap.title] = [];
      }
      roadmapGroups[roadmap.title].push(roadmap);
    });

    // Process each group
    for (const [title, group] of Object.entries(roadmapGroups)) {
      if (group.length > 1) {
        console.log(`\n🔍 Found ${group.length} duplicates for "${title}"`);
        
        // Sort by concept count (descending) and creation date (descending)
        group.sort((a, b) => {
          const conceptCountDiff = (b.concepts?.length || 0) - (a.concepts?.length || 0);
          if (conceptCountDiff !== 0) return conceptCountDiff;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        // Keep the first one (most concepts, newest), delete the rest
        const keepRoadmap = group[0];
        const deleteRoadmaps = group.slice(1);

        console.log(`✅ Keeping roadmap ${keepRoadmap.id} with ${keepRoadmap.concepts?.length || 0} concepts`);

        for (const deleteRoadmap of deleteRoadmaps) {
          console.log(`❌ Deleting roadmap ${deleteRoadmap.id} with ${deleteRoadmap.concepts?.length || 0} concepts`);
          
          // First delete all concepts and their dependencies for this roadmap
          if (deleteRoadmap.concepts && deleteRoadmap.concepts.length > 0) {
            const conceptIds = deleteRoadmap.concepts.map((c: any) => c.id);
            
            // Delete concept dependencies
            await supabase
              .from('concept_dependencies')
              .delete()
              .or(`concept_id.in.(${conceptIds.join(',')}),prerequisite_id.in.(${conceptIds.join(',')})`);
            
            // Delete concepts
            await supabase
              .from('concepts')
              .delete()
              .eq('roadmap_id', deleteRoadmap.id);
          }
          
          // Delete the roadmap
          await supabase
            .from('roadmaps')
            .delete()
            .eq('id', deleteRoadmap.id);
        }
      } else {
        console.log(`✅ "${title}" - No duplicates found`);
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

    console.log('\n✅ Cleanup completed successfully!');

  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
    process.exit(1);
  }
}

// Run the cleanup
if (require.main === module) {
  cleanupDuplicateRoadmaps();
}
