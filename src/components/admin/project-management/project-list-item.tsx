
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GitBranch, Globe, Edit, Trash2, Settings } from 'lucide-react';
import ProjectInitializationButton from '../project-initialization-button';

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
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <Badge className={getProjectTypeColor(project.project_type)}>
              {project.project_type || 'Unknown'}
            </Badge>
            <Badge variant={project.active ? 'default' : 'secondary'}>
              {project.active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
        {project.description && (
          <CardDescription>{project.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Project Initialization Status */}
        <ProjectInitializationButton projectId={project.id} projectName={project.name} />
        
        {/* Repository Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Source Repository</h4>
            <div className="flex items-center space-x-2">
              <code className="text-xs bg-muted px-2 py-1 rounded">{project.source_repo}</code>
              <a href={`https://github.com/${project.source_repo}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          
          {project.stage_repo && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                <GitBranch className="h-3 w-3 text-yellow-600" />
                Stage Repository
              </h4>
              <div className="flex items-center space-x-2">
                <code className="text-xs bg-yellow-50 px-2 py-1 rounded border border-yellow-200">{project.stage_repo}</code>
                <a href={`https://github.com/${project.stage_repo}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
          
          {project.prod_repo && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3 text-green-600" />
                Production Repository
              </h4>
              <div className="flex items-center space-x-2">
                <code className="text-xs bg-green-50 px-2 py-1 rounded border border-green-200">{project.prod_repo}</code>
                <a href={`https://github.com/${project.prod_repo}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Deployment URLs */}
        {(project.stage_url || project.prod_url) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
            {project.stage_url && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Stage URL</h4>
                <a 
                  href={project.stage_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-yellow-600 hover:underline flex items-center gap-1"
                >
                  {project.stage_url.replace('https://', '')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
            
            {project.prod_url && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Production URL</h4>
                <a 
                  href={project.prod_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:underline flex items-center gap-1"
                >
                  {project.prod_url.replace('https://', '')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Build Configuration */}
        <div className="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground">
          <span>Build: <code className="text-xs bg-muted px-1 rounded">{project.build_command || 'npm run build'}</code></span>
          <span>Workflow: <code className="text-xs bg-muted px-1 rounded">{project.github_workflow_file}</code></span>
          <span>Private: {project.is_source_private ? 'Yes' : 'No'}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectListItem;
