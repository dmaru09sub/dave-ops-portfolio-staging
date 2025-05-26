
import { supabase } from '@/integrations/supabase/client';
import type { 
  TutorialSeries, 
  TutorialProgress,
  RawTutorialSeries 
} from '@/types/project-initialization';

export class TutorialSeriesService {
  
  static async getTutorialSeries(): Promise<TutorialSeries[]> {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorial_series')
        .select('*')
        .eq('published', true)
        .order('sort_order');

      if (error) throw error;
      
      // Transform raw data to typed interfaces
      return (data || []).map((rawSeries: RawTutorialSeries) => ({
        ...rawSeries,
        tutorials: Array.isArray(rawSeries.tutorials) 
          ? rawSeries.tutorials 
          : [],
        prerequisites: Array.isArray(rawSeries.prerequisites) 
          ? rawSeries.prerequisites 
          : [],
        difficulty_level: rawSeries.difficulty_level as 'beginner' | 'intermediate' | 'advanced'
      }));
    } catch (error) {
      console.error('Error fetching tutorial series:', error);
      return [];
    }
  }

  static async getUserProgress(userId: string, tutorialId: string): Promise<TutorialProgress | null> {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorial_user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('tutorial_id', tutorialId)
        .single();

      if (error && error.code !== 'PGRST116') { // Not found is ok
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return null;
    }
  }

  static async updateProgress(
    userId: string, 
    tutorialId: string, 
    progressData: Partial<TutorialProgress>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('daveops_tutorial_user_progress')
        .upsert({
          user_id: userId,
          tutorial_id: tutorialId,
          ...progressData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating tutorial progress:', error);
      return false;
    }
  }

  static async markTutorialComplete(userId: string, tutorialId: string): Promise<boolean> {
    return this.updateProgress(userId, tutorialId, {
      completed: true,
      progress_percentage: 100,
      completed_at: new Date().toISOString()
    });
  }
}
