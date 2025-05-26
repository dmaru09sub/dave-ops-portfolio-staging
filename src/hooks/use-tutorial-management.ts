
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty_level: string;
  estimated_duration: number;
  tags: Json;
  image_url: string;
  published: boolean;
  coming_soon: boolean;
  sort_order: number;
  created_at: string;
}

interface TutorialFormData {
  title: string;
  description: string;
  content: string;
  difficulty_level: string;
  estimated_duration: number;
  tags: string;
  image_url: string;
  published: boolean;
  coming_soon: boolean;
  sort_order: number;
}

export const useTutorialManagement = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<TutorialFormData>({
    title: '',
    description: '',
    content: '',
    difficulty_level: 'beginner',
    estimated_duration: 30,
    tags: '',
    image_url: '',
    published: true,
    coming_soon: false,
    sort_order: 0
  });

  const fetchTutorials = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_tutorials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTutorials(data || []);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tutorials',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tutorialData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingTutorial) {
        const { error } = await supabase
          .from('daveops_tutorials')
          .update(tutorialData)
          .eq('id', editingTutorial.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Tutorial updated successfully' });
      } else {
        const { error } = await supabase
          .from('daveops_tutorials')
          .insert([tutorialData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Tutorial created successfully' });
      }

      resetForm();
      fetchTutorials();
    } catch (error) {
      console.error('Error saving tutorial:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tutorial',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    const tagsArray = Array.isArray(tutorial.tags) ? tutorial.tags : [];
    setFormData({
      title: tutorial.title,
      description: tutorial.description || '',
      content: tutorial.content || '',
      difficulty_level: tutorial.difficulty_level || 'beginner',
      estimated_duration: tutorial.estimated_duration || 30,
      tags: tagsArray.join(', '),
      image_url: tutorial.image_url || '',
      published: tutorial.published,
      coming_soon: tutorial.coming_soon,
      sort_order: tutorial.sort_order
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tutorial?')) return;

    try {
      const { error } = await supabase
        .from('daveops_tutorials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Tutorial deleted successfully' });
      fetchTutorials();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete tutorial',
        variant: 'destructive'
      });
    }
  };

  const togglePublished = async (tutorial: Tutorial) => {
    try {
      const { error } = await supabase
        .from('daveops_tutorials')
        .update({ published: !tutorial.published })
        .eq('id', tutorial.id);

      if (error) throw error;
      fetchTutorials();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      difficulty_level: 'beginner',
      estimated_duration: 30,
      tags: '',
      image_url: '',
      published: true,
      coming_soon: false,
      sort_order: 0
    });
    setEditingTutorial(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  return {
    tutorials,
    loading,
    formData,
    setFormData,
    isCreating,
    editingTutorial,
    handleSubmit,
    handleEdit,
    handleDelete,
    togglePublished,
    resetForm,
    startCreating
  };
};
