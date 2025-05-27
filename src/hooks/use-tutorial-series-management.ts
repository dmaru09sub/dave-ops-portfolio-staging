
import { useState, useEffect } from 'react';
import { TutorialSeriesService } from '@/services/tutorial-series-service';
import { supabase } from '@/integrations/supabase/client';
import type { TutorialSeries, TutorialItem } from '@/types/tutorial-types';

interface TutorialSeriesFormData {
  title: string;
  description: string;
  difficulty_level: string;
  estimated_duration: number;
  prerequisites: string[];
  tutorials: TutorialItem[];
  published: boolean;
  sort_order: number;
}

const initialFormData: TutorialSeriesFormData = {
  title: '',
  description: '',
  difficulty_level: 'beginner',
  estimated_duration: 60,
  prerequisites: [],
  tutorials: [],
  published: true,
  sort_order: 0
};

export const useTutorialSeriesManagement = () => {
  const [tutorialSeries, setTutorialSeries] = useState<TutorialSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TutorialSeriesFormData>(initialFormData);
  const [editingSeries, setEditingSeries] = useState<TutorialSeries | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadTutorialSeries = async () => {
    setLoading(true);
    try {
      const data = await TutorialSeriesService.getAllTutorialSeries();
      setTutorialSeries(data);
    } catch (error) {
      console.error('Error loading tutorial series:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSeries) {
        // Update existing series
        const updateData = {
          title: formData.title,
          description: formData.description,
          difficulty_level: formData.difficulty_level,
          estimated_duration: formData.estimated_duration,
          prerequisites: JSON.stringify(formData.prerequisites),
          tutorials: JSON.stringify(formData.tutorials),
          published: formData.published,
          sort_order: formData.sort_order
        };

        const result = await supabase
          .from('daveops_tutorial_series')
          .update(updateData)
          .eq('id', editingSeries.id);

        if (result.error) {
          console.error('Error updating tutorial series:', result.error);
          return false;
        }
      } else {
        // Create new series
        const insertData = {
          title: formData.title,
          description: formData.description,
          difficulty_level: formData.difficulty_level,
          estimated_duration: formData.estimated_duration,
          prerequisites: JSON.stringify(formData.prerequisites),
          tutorials: JSON.stringify(formData.tutorials),
          published: formData.published,
          sort_order: formData.sort_order
        };

        const result = await supabase
          .from('daveops_tutorial_series')
          .insert(insertData);

        if (result.error) {
          console.error('Error creating tutorial series:', result.error);
          return false;
        }
      }

      resetForm();
      loadTutorialSeries();
      return true;
    } catch (error) {
      console.error('Error saving tutorial series:', error);
      return false;
    }
  };

  const handleEdit = (series: TutorialSeries) => {
    setEditingSeries(series);
    setFormData({
      title: series.title,
      description: series.description || '',
      difficulty_level: series.difficulty_level,
      estimated_duration: series.estimated_duration || 60,
      prerequisites: series.prerequisites,
      tutorials: series.tutorials,
      published: series.published,
      sort_order: series.sort_order
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daveops_tutorial_series')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting tutorial series:', error);
        return false;
      }

      loadTutorialSeries();
      return true;
    } catch (error) {
      console.error('Error deleting tutorial series:', error);
      return false;
    }
  };

  const handleTogglePublished = async (series: TutorialSeries) => {
    try {
      const { error } = await supabase
        .from('daveops_tutorial_series')
        .update({ published: !series.published })
        .eq('id', series.id);

      if (error) {
        console.error('Error toggling tutorial series published status:', error);
        return false;
      }

      loadTutorialSeries();
      return true;
    } catch (error) {
      console.error('Error toggling tutorial series published status:', error);
      return false;
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingSeries(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    loadTutorialSeries();
  }, []);

  return {
    tutorialSeries,
    loading,
    formData,
    setFormData,
    isCreating,
    editingSeries,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleTogglePublished,
    resetForm,
    startCreating
  };
};
