
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { useProjectManagement } from './project-management/use-project-management';
import NewProjectForm from './project-management/new-project-form';
import ProjectList from './project-management/project-list';

const ProjectManagement: React.FC = () => {
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          3-Stage Deployment Projects
        </CardTitle>
        <CardDescription>
          Configure DEV → STAGE → PROD deployment pipeline with automatic Lovable reference cleaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
          <Button
            onClick={handleNewProject}
            disabled={newProject || editingProject}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {newProject && (
          <NewProjectForm
            formData={formData}
            saving={saving}
            setFormData={setFormData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}

        <ProjectList
          projects={projects}
          editingProject={editingProject}
          newProject={newProject}
          formData={formData}
          saving={saving}
          setFormData={setFormData}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onRefetch={refetch}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectManagement;
