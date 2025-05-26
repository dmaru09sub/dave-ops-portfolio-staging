
import React from 'react';
import ProjectListItem from './project-list-item';
import type { Project } from './types';

interface EnhancedProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const EnhancedProjectList: React.FC<EnhancedProjectListProps> = ({ 
  projects, 
  onEdit, 
  onDelete 
}) => {
  if (projects.length === 0) {
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
        <ProjectListItem
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EnhancedProjectList;
