
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import ProjectManagementHeader from './project-management-header';
import NewProjectForm from './new-project-form';
import EnhancedProjectList from './enhanced-project-list';
import type { Project } from './types';

interface EnhancedProjectCardProps {
  projects: Project[];
  newProject: boolean;
  formData: Partial<Project>;
  saving: boolean;
  setFormData: (data: Partial<Project>) => void;
  onSave: () => void;
  onCancel: () => void;
  onNewProject: () => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({
  projects,
  newProject,
  formData,
  saving,
  setFormData,
  onSave,
  onCancel,
  onNewProject,
  onEdit,
  onDelete
}) => {
  return (
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
        <ProjectManagementHeader
          projectCount={projects.length}
          onNewProject={onNewProject}
          disabled={newProject}
        />

        {newProject && (
          <NewProjectForm
            formData={formData}
            saving={saving}
            setFormData={setFormData}
            onSave={onSave}
            onCancel={onCancel}
          />
        )}

        <EnhancedProjectList
          projects={projects}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedProjectCard;
