
import { supabase } from '@/integrations/supabase/client';
import type { 
  TutorialSeries, 
  TutorialProgress, 
  RawTutorialSeries 
} from '@/types/tutorial-types';

export class TutorialSeriesService {
  static async getTutorialSeries(): Promise<TutorialSeries[]> {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorial_series')
        .select('*')
        .eq('published', true)
        .order('sort_order');

      if (error) throw error;

      return (data || []).map(this.transformRawTutorialSeries);
    } catch (error) {
      console.error('Error fetching tutorial series:', error);
      return [];
    }
  }

  static async getAllTutorialSeries(): Promise<TutorialSeries[]> {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorial_series')
        .select('*')
        .order('sort_order');

      if (error) throw error;

      return (data || []).map(this.transformRawTutorialSeries);
    } catch (error) {
      console.error('Error fetching all tutorial series:', error);
      return [];
    }
  }

  static async getTutorialSeriesById(id: string): Promise<TutorialSeries | null> {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorial_series')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? this.transformRawTutorialSeries(data) : null;
    } catch (error) {
      console.error('Error fetching tutorial series by ID:', error);
      return null;
    }
  }

  private static transformRawTutorialSeries(raw: RawTutorialSeries): TutorialSeries {
    let prerequisites: string[] = [];
    let tutorials: any[] = [];

    // Handle prerequisites
    if (typeof raw.prerequisites === 'string') {
      try {
        prerequisites = JSON.parse(raw.prerequisites);
      } catch (e) {
        prerequisites = [];
      }
    } else if (Array.isArray(raw.prerequisites)) {
      prerequisites = raw.prerequisites;
    }

    // Handle tutorials
    if (typeof raw.tutorials === 'string') {
      try {
        tutorials = JSON.parse(raw.tutorials);
      } catch (e) {
        tutorials = [];
      }
    } else if (Array.isArray(raw.tutorials)) {
      tutorials = raw.tutorials;
    }

    return {
      ...raw,
      prerequisites,
      tutorials
    };
  }
}
