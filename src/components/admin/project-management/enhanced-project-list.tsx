
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Github, ExternalLink, Activity, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProjectInitializationButton from '../project-initialization-button';
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
  const { toast } = useToast();

  const handleDelete = async (project: Project) => {
    // Check if project has a live production site
    if (project.prod_url && project.active) {
      toast({
        title: 'Cannot Delete',
        description: 'Cannot delete project with active production deployment. Deactivate the project first.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('daveops_deployment_projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      toast({
        title: 'Project Deleted',
        description: `${project.name} has been deleted successfully.`
      });

      onDelete(project.id);
    } catch (error: any) {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete project',
        variant: 'destructive'
      });
    }
  };

  const getProjectTypeColor = (type: string | null) => {
    switch (type) {
      case 'react': return 'bg-blue-100 text-blue-800';
      case 'vue': return 'bg-green-100 text-green-800';
      case 'angular': return 'bg-red-100 text-red-800';
      case 'static': return 'bg-gray-100 text-gray-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  const formatRepoUrl = (repo: string | null | undefined) => {
    if (!repo) return null;
    if (repo.startsWith('http')) return repo;
    return `https://github.com/${repo}`;
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No projects configured yet.</p>
        <p className="text-sm mt-2">Add your first project to get started with the CI/CD pipeline.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="space-y-4">
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
              {/* Repository Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Github className="h-3 w-3" />
                    <span className="font-medium">DEV Repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-blue-50 p-1 rounded flex-1">
                      {project.source_repo}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={formatRepoUrl(project.source_repo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                {project.stage_repo && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Github className="h-3 w-3" />
                      <span className="font-medium">STAGE Repository</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-yellow-50 p-1 rounded flex-1">
                        {project.stage_repo}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={formatRepoUrl(project.stage_repo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
                
                {project.prod_repo && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Github className="h-3 w-3" />
                      <span className="font-medium">PROD Repository</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-green-50 p-1 rounded flex-1">
                        {project.prod_repo}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={formatRepoUrl(project.prod_repo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Deployment URLs and Action Links */}
              <div className="space-y-3 border-t pt-3">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Globe className="h-3 w-3" />
                  <span className="font-medium">Live Sites & Actions</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.stage_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.stage_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        Stage Site
                      </a>
                    </Button>
                  )}
                  
                  {project.prod_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.prod_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        Production Site
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`${formatRepoUrl(project.source_repo)}/actions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <Activity className="h-3 w-3" />
                      Actions Logs
                    </a>
                  </Button>
                </div>
              </div>

              {/* Project Configuration */}
              <div className="text-xs text-muted-foreground space-y-1 border-t pt-3">
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
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{project.name}"? This action cannot be undone.
                        {project.prod_url && project.active && (
                          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800">
                            ⚠️ This project has an active production deployment. Please deactivate it first.
                          </div>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(project)}
                        disabled={project.prod_url && project.active}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Project
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default EnhancedProjectList;
