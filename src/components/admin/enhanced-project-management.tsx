
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, BookOpen } from 'lucide-react';
import { useProjectManagement } from './project-management/use-project-management';
import NewProjectForm from './project-management/new-project-form';
import EnhancedProjectList from './project-management/enhanced-project-list';
import { Link } from 'react-router-dom';

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Enhanced 3-Stage Deployment Projects
          </CardTitle>
          <CardDescription>
            Configure and manage DEV → STAGE → PROD deployment pipeline with automated initialization and comprehensive tutorials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
              <Link to="/tutorials">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Tutorials
                </Button>
              </Link>
            </div>
            <Button
              onClick={handleNewProject}
              disabled={newProject || editingProject !== null}
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

          <EnhancedProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={async (id: string) => {
              // Handle delete logic here
              console.log('Delete project:', id);
              await refetch();
            }}
          />
        </CardContent>
      </Card>

      {projects.length === 0 && !newProject && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Get Started with CI/CD</h3>
            <p className="text-muted-foreground mb-4">
              Add your first project to begin using the automated deployment pipeline
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleNewProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Project
              </Button>
              <Button variant="outline" asChild>
                <Link to="/tutorials/cicd-pipeline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Tutorial
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedProjectManagement;
