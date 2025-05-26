
import { supabase } from '@/integrations/supabase/client';
import type { TutorialOperationsResult } from './types';

export const useTutorialDelete = () => {
  const deleteTutorial = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('daveops_tutorials')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting tutorial:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      return false;
    }
  };

  return { deleteTutorial };
};
