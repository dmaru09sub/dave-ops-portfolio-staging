
import { useDeploymentProjects } from '@/hooks/use-deployment-projects';
import { useProjectForm } from '@/hooks/project-management/use-project-form';
import { useProjectOperations } from '@/hooks/project-management/use-project-operations';
import { useToast } from '@/hooks/use-toast';

export const useProjectManagement = () => {
  const { projects, loading, refetch } = useDeploymentProjects();
  const {
    editingProject,
    newProject,
    formData,
    saving,
    setFormData,
    setSaving,
    handleEdit,
    handleCancel,
    handleNewProject
  } = useProjectForm();
  const { createProject, updateProject, logError } = useProjectOperations();
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      if (newProject) {
        await createProject(formData);
      } else {
        await updateProject(editingProject!, formData);
      }
      
      handleCancel();
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save project',
        variant: 'destructive',
      });

      await logError(newProject, formData, editingProject, error);
    } finally {
      setSaving(false);
    }
  };

  return {
    projects,
    loading,
    refetch,
    editingProject,
    newProject,
    formData,
    saving,
    setFormData,
    handleEdit,
    handleCancel,
    handleSave,
    handleNewProject
  };
};
