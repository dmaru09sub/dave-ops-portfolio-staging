
import React from 'react';
import ProjectListItem from './project-list-item';
import ProjectForm from '../project-form';
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
  const handleDelete = async (id: string) => {
    // For now, just refresh the list
    // In a full implementation, this would delete the project
    console.log('Delete project:', id);
    await onRefetch();
  };

  if (projects.length === 0 && !newProject) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No projects configured yet.</p>
        <p className="text-sm mt-2">Add your first project to get started with the CI/CD pipeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id}>
          {editingProject === project.id ? (
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              onSave={onSave}
              onCancel={onCancel}
              saving={saving}
              isNew={false}
            />
          ) : (
            <ProjectListItem
              project={project}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
