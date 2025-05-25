
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Folder } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string | null;
  github_repo: string;
  source_repo: string;
  stage_repo: string | null;
  prod_repo: string | null;
  deployment_url: string | null;
  stage_url: string | null;
  prod_url: string | null;
  project_type: string | null;
  active: boolean;
  is_source_private: boolean | null;
}

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: string | null;
  onProjectChange: (projectId: string) => void;
  loading?: boolean;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProject,
  onProjectChange,
  loading = false
}) => {
  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5" />
          Select Project
        </CardTitle>
        <CardDescription>
          Choose which project to deploy from your available projects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedProject || ''} onValueChange={onProjectChange} disabled={loading}>
          <SelectTrigger>
            <SelectValue placeholder="Select a project to deploy..." />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center gap-2">
                  <span>{project.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {project.project_type}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProjectData && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{selectedProjectData.name}</h4>
                <Badge variant="outline">{selectedProjectData.project_type}</Badge>
              </div>
              
              {selectedProjectData.description && (
                <p className="text-sm text-muted-foreground">
                  {selectedProjectData.description}
                </p>
              )}
              
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Repository:</span>
                  <code className="bg-muted px-1 rounded">{selectedProjectData.source_repo}</code>
                  {selectedProjectData.is_source_private && (
                    <Badge variant="secondary" className="text-xs">Private</Badge>
                  )}
                </div>
                
                {selectedProjectData.stage_url && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Stage URL:</span>
                    <a 
                      href={selectedProjectData.stage_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View Stage
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {selectedProjectData.prod_url && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Live URL:</span>
                    <a 
                      href={selectedProjectData.prod_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View Live
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectSelector;
