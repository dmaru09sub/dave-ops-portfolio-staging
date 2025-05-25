
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DeploymentProject {
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

export const useDeploymentProjects = () => {
  const [projects, setProjects] = useState<DeploymentProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_deployment_projects')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching deployment projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch deployment projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    refetch: fetchProjects
  };
};
