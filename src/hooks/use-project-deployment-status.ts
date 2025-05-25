
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DeploymentStatus {
  projectId: string;
  lastStageDeployment?: {
    id: string;
    status: string;
    created_at: string;
    deployed_at: string | null;
    error_message: string | null;
  };
  lastProdDeployment?: {
    id: string;
    status: string;
    created_at: string;
    deployed_at: string | null;
    error_message: string | null;
  };
}

export const useProjectDeploymentStatus = (projectIds: string[]) => {
  const [deploymentStatuses, setDeploymentStatuses] = useState<Record<string, DeploymentStatus>>({});
  const [loading, setLoading] = useState(true);

  const fetchDeploymentStatuses = async () => {
    if (projectIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      // Fetch latest stage deployments for each project
      const { data: stageDeployments, error: stageError } = await supabase
        .from('daveops_portfolio_deployments')
        .select('id, project_id, status, created_at, deployed_at, error_message')
        .in('project_id', projectIds)
        .eq('deployment_stage', 'stage')
        .order('created_at', { ascending: false });

      if (stageError) throw stageError;

      // Fetch latest prod deployments for each project
      const { data: prodDeployments, error: prodError } = await supabase
        .from('daveops_portfolio_deployments')
        .select('id, project_id, status, created_at, deployed_at, error_message')
        .in('project_id', projectIds)
        .eq('deployment_stage', 'prod')
        .order('created_at', { ascending: false });

      if (prodError) throw prodError;

      // Group deployments by project
      const statuses: Record<string, DeploymentStatus> = {};
      
      projectIds.forEach(projectId => {
        const lastStage = stageDeployments?.find(d => d.project_id === projectId);
        const lastProd = prodDeployments?.find(d => d.project_id === projectId);
        
        statuses[projectId] = {
          projectId,
          lastStageDeployment: lastStage || undefined,
          lastProdDeployment: lastProd || undefined,
        };
      });

      setDeploymentStatuses(statuses);
    } catch (error) {
      console.error('Error fetching deployment statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeploymentStatuses();
  }, [projectIds.join(',')]);

  return {
    deploymentStatuses,
    loading,
    refetch: fetchDeploymentStatuses
  };
};
