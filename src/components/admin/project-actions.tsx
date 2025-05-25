
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

interface ProjectActionsProps {
  project: Project;
  onEdit: (project: Project) => void;
  onRefetch: () => void;
  editingProject: string | null;
  newProject: boolean;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({
  project,
  onEdit,
  onRefetch,
  editingProject,
  newProject
}) => {
  const { toast } = useToast();

  const handleDelete = async (projectId: string, projectName: string) => {
    if (!confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('daveops_deployment_projects')
        .delete()
        .eq('id', projectId);
      
      if (error) throw error;
      
      toast({
        title: 'Project Deleted',
        description: 'Project has been deleted successfully.',
      });
      
      onRefetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const addToPortfolio = async (project: Project) => {
    try {
      const portfolioProject = {
        title: project.name,
        description: project.description || '',
        long_description: `Deployed project: ${project.description || project.name}`,
        demo_url: project.prod_url || project.deployment_url || '',
        github_url: project.stage_repo ? `https://github.com/${project.stage_repo}` : `https://github.com/${project.source_repo}`,
        image_url: '/placeholder.svg',
        technologies: [project.project_type || 'React'],
        featured: false,
        published: true,
        sort_order: 0
      };

      const { error } = await supabase
        .from('daveops_projects')
        .insert([portfolioProject]);
      
      if (error) throw error;
      
      toast({
        title: 'Added to Portfolio',
        description: `${project.name} has been added to your portfolio.`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add to portfolio',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onEdit(project)}
        disabled={editingProject !== null || newProject}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => addToPortfolio(project)}
        disabled={!project.prod_url && !project.deployment_url}
      >
        Add to Portfolio
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleDelete(project.id, project.name)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProjectActions;
