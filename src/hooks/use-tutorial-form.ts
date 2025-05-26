
import { useState } from 'react';
import type { Tutorial, TutorialFormData } from '@/types/tutorial';

const initialFormData: TutorialFormData = {
  title: '',
  description: '',
  content: '',
  difficulty_level: 'beginner',
  estimated_duration: 30,
  tags: '',
  image_url: '',
  published: true,
  coming_soon: false,
  sort_order: 0,
  youtube_url: '',
  category: '',
  featured: false
};

export const useTutorialForm = () => {
  const [formData, setFormData] = useState<TutorialFormData>(initialFormData);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingTutorial(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
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
      published: tutorial.published || false,
      coming_soon: tutorial.coming_soon || false,
      sort_order: tutorial.sort_order || 0,
      youtube_url: tutorial.youtube_url || '',
      category: tutorial.category || '',
      featured: tutorial.featured || false
    });
    setIsCreating(true);
  };

  return {
    formData,
    setFormData,
    editingTutorial,
    isCreating,
    resetForm,
    startCreating,
    handleEdit
  };
};
