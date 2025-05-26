
import { useState, useEffect } from 'react';
import { useTutorialOperations } from './tutorial-operations/use-tutorial-operations';
import { useTutorialForm } from './use-tutorial-form';
import type { Tutorial } from '@/types/tutorial';

export const useTutorialManagement = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    fetchTutorials,
    saveTutorial,
    deleteTutorial,
    togglePublished
  } = useTutorialOperations();
  
  const {
    formData,
    setFormData,
    editingTutorial,
    isCreating,
    resetForm,
    startCreating,
    handleEdit
  } = useTutorialForm();

  const loadTutorials = async () => {
    setLoading(true);
    const tutorialData = await fetchTutorials();
    setTutorials(tutorialData);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveTutorial(formData, editingTutorial);
    if (success) {
      resetForm();
      loadTutorials();
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTutorial(id);
    if (success) {
      loadTutorials();
    }
  };

  const handleTogglePublished = async (tutorial: Tutorial) => {
    const success = await togglePublished(tutorial);
    if (success) {
      loadTutorials();
    }
  };

  useEffect(() => {
    loadTutorials();
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
    togglePublished: handleTogglePublished,
    resetForm,
    startCreating
  };
};
