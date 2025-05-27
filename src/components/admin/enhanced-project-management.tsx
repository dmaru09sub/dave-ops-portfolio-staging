
import React from 'react';
import { useProjectManagement } from './project-management/use-project-management';
import EnhancedProjectCard from './project-management/enhanced-project-card';
import EmptyStateCard from './project-management/empty-state-card';

const EnhancedProjectManagement: React.FC = () => {
  const {
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
  } = useProjectManagement();

  const handleDelete = async (id: string) => {
    // Handle delete logic here
    console.log('Delete project:', id);
    await refetch();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EnhancedProjectCard
        projects={projects}
        newProject={newProject}
        formData={formData}
        saving={saving}
        setFormData={setFormData}
        onSave={handleSave}
        onCancel={handleCancel}
        onNewProject={handleNewProject}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {projects.length === 0 && !newProject && (
        <EmptyStateCard onNewProject={handleNewProject} />
      )}
    </div>
  );
};

export default EnhancedProjectManagement;
