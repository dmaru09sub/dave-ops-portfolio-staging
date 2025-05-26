
import { supabase } from '@/integrations/supabase/client';
import type { Tutorial } from '@/types/tutorial';

export const useTutorialFetch = () => {
  const fetchTutorials = async (): Promise<Tutorial[]> => {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching tutorials:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      return [];
    }
  };

  return { fetchTutorials };
};
