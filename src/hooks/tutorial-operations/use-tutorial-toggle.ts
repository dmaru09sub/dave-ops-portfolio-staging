
import { supabase } from '@/integrations/supabase/client';
import type { Tutorial } from '@/types/tutorial';

export const useTutorialToggle = () => {
  const togglePublished = async (tutorial: Tutorial): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('daveops_tutorials')
        .update({ published: !tutorial.published })
        .eq('id', tutorial.id);

      if (error) {
        console.error('Error toggling tutorial published status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error toggling tutorial published status:', error);
      return false;
    }
  };

  return { togglePublished };
};
