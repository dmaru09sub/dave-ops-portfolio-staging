
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, GitBranch, Globe, ExternalLink } from 'lucide-react';
import ProjectInitializationButton from '../project-initialization-button';
import type { Project } from './types';

interface ProjectListItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, onEdit, onDelete }) => {
  const getProjectTypeColor = (type: string | null) => {
    switch (type) {
      case 'react': return 'bg-blue-100 text-blue-800';
      case 'vue': return 'bg-green-100 text-green-800';
      case 'angular': return 'bg-red-100 text-red-800';
      case 'static': return 'bg-gray-100 text-gray-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="space-y-4">
      <ProjectInitializationButton
        projectId={project.id}
        projectName={project.name}
      />
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription>{project.description || 'No description provided'}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getProjectTypeColor(project.project_type)}>
                {project.project_type || 'Unknown'}
              </Badge>
              {project.active && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Active
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Repository Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <GitBranch className="h-3 w-3" />
                <span className="font-medium">DEV</span>
              </div>
              <p className="text-xs font-mono bg-blue-50 p-1 rounded">{project.source_repo}</p>
            </div>
            
            {project.stage_repo && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitBranch className="h-3 w-3" />
                  <span className="font-medium">STAGE</span>
                </div>
                <p className="text-xs font-mono bg-yellow-50 p-1 rounded">{project.stage_repo}</p>
              </div>
            )}
            
            {project.prod_repo && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitBranch className="h-3 w-3" />
                  <span className="font-medium">PROD</span>
                </div>
                <p className="text-xs font-mono bg-green-50 p-1 rounded">{project.prod_repo}</p>
              </div>
            )}
          </div>

          {/* Deployment URLs */}
          {(project.stage_url || project.prod_url) && (
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Globe className="h-3 w-3" />
                <span className="font-medium">Deployment URLs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stage_url && (
                  <a
                    href={project.stage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-yellow-600 hover:text-yellow-800"
                  >
                    <span>Stage</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {project.prod_url && (
                  <a
                    href={project.prod_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800"
                  >
                    <span>Production</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Project Configuration */}
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Workflow: {project.github_workflow_file}</div>
            <div>Build Command: {project.build_command || 'npm run build'}</div>
            {project.is_source_private && (
              <div className="text-amber-600">Source repository is private</div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(project.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectListItem;
