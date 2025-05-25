
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../project-form';
import ProjectCard from '../project-card';
import type { Project } from './types';

interface ProjectListProps {
  projects: Project[];
  editingProject: string | null;
  newProject: boolean;
  formData: Partial<Project>;
  saving: boolean;
  setFormData: (data: Partial<Project>) => void;
  onEdit: (project: Project) => void;
  onSave: () => void;
  onCancel: () => void;
  onRefetch: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  editingProject,
  newProject,
  formData,
  saving,
  setFormData,
  onEdit,
  onSave,
  onCancel,
  onRefetch
}) => {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id}>
          {editingProject === project.id ? (
            <Card>
              <CardContent className="p-6">
                <ProjectForm
                  formData={formData}
                  setFormData={setFormData}
                  onSave={onSave}
                  onCancel={onCancel}
                  saving={saving}
                />
              </CardContent>
            </Card>
          ) : (
            <ProjectCard
              project={project}
              onEdit={onEdit}
              onRefetch={onRefetch}
              editingProject={editingProject}
              newProject={newProject}
            />
          )}
        </div>
      ))}

      {projects.length === 0 && !newProject && (
        <div className="text-center py-8 text-muted-foreground">
          No projects configured yet. Add your first 3-stage project to get started.
        </div>
      )}
    </div>
  );
};

export default ProjectList;
