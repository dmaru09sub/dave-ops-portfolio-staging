
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProjectActions from './project-actions';
import ImprovedDeploymentStageCard from './improved-deployment-stage-card';

interface Project {
  id: string;
  name: string;
  description: string | null;
  github_repo: string;
  source_repo: string;
  stage_repo: string | null;
  prod_repo: string | null;
  github_workflow_file: string;
  deployment_url: string | null;
  stage_url: string | null;
  prod_url: string | null;
  build_command: string | null;
  project_type: string | null;
  active: boolean;
  is_source_private: boolean | null;
  stage_branch: string | null;
  prod_branch: string | null;
  created_at: string;
  updated_at: string;
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onRefetch: () => void;
  editingProject: string | null;
  newProject: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onRefetch,
  editingProject,
  newProject
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-medium">{project.name}</h4>
                <Badge variant={project.active ? "default" : "secondary"}>
                  {project.active ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">{project.project_type}</Badge>
                {project.is_source_private && (
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    Private Source
                  </Badge>
                )}
              </div>
              {project.description && (
                <p className="text-sm text-muted-foreground">{project.description}</p>
              )}
            </div>
            <ProjectActions
              project={project}
              onEdit={onEdit}
              onRefetch={onRefetch}
              editingProject={editingProject}
              newProject={newProject}
            />
          </div>
          
          <ImprovedDeploymentStageCard project={project} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
