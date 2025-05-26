
import { supabase } from '@/integrations/supabase/client';
import type { Tutorial, TutorialFormData } from '@/types/tutorial';
import type { TutorialOperationsResult } from './types';

export const useTutorialSave = () => {
  const saveTutorial = async (
    formData: TutorialFormData,
    editingTutorial: Tutorial | null
  ): Promise<boolean> => {
    try {
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
      
      const tutorialData = {
        title: formData.title,
        description: formData.description || null,
        content: formData.content || null,
        difficulty_level: formData.difficulty_level || null,
        estimated_duration: formData.estimated_duration || null,
        tags: tagsArray,
        image_url: formData.image_url || null,
        published: formData.published,
        coming_soon: formData.coming_soon,
        sort_order: formData.sort_order || 0,
        youtube_url: formData.youtube_url || null,
        category: formData.category || null,
        featured: formData.featured
      };

      let result;
      if (editingTutorial) {
        result = await supabase
          .from('daveops_tutorials')
          .update(tutorialData)
          .eq('id', editingTutorial.id);
      } else {
        result = await supabase
          .from('daveops_tutorials')
          .insert([tutorialData]);
      }

      if (result.error) {
        console.error('Error saving tutorial:', result.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error saving tutorial:', error);
      return false;
    }
  };

  return { saveTutorial };
};
