
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DeploymentProject {
  id: string;
  name: string;
  project_type: string | null;
  deployment_url: string | null;
  source_repo: string;
  stage_repo: string | null;
  prod_repo: string | null;
  stage_url: string | null;
  prod_url: string | null;
}

interface Deployment {
  id: string;
  status: string;
  created_at: string;
  approved_at: string | null;
  deployed_at: string | null;
  deployment_url: string | null;
  commit_hash: string | null;
  notes: string | null;
  error_message: string | null;
  project_id: string | null;
  deployment_stage: string | null;
  daveops_deployment_projects?: DeploymentProject;
}

export const useDeploymentState = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);
  const { toast } = useToast();

  const fetchSingleDeployment = async (deploymentId: string) => {
    try {
      const { data, error } = await supabase
        .from('daveops_portfolio_deployments')
        .select(`
          *,
          daveops_deployment_projects (
            id,
            name,
            project_type,
            deployment_url,
            source_repo,
            stage_repo,
            prod_repo,
            stage_url,
            prod_url
          )
        `)
        .eq('id', deploymentId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching single deployment:', error);
      return null;
    }
  };

  const fetchDeployments = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_portfolio_deployments')
        .select(`
          *,
          daveops_deployment_projects (
            id,
            name,
            project_type,
            deployment_url,
            source_repo,
            stage_repo,
            prod_repo,
            stage_url,
            prod_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeployments(data || []);
    } catch (error) {
      console.error('Error fetching deployments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch deployment history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeployments();
    
    // Set up real-time subscription with more robust error handling
    const channel = supabase
      .channel('deployments-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daveops_portfolio_deployments'
        },
        (payload) => {
          console.log('Real-time deployment update:', payload);
          
          if (payload.eventType === 'INSERT') {
            // Fetch the full deployment data with project info
            fetchSingleDeployment(payload.new.id).then((newDeployment) => {
              if (newDeployment) {
                setDeployments(prev => [newDeployment, ...prev]);
              }
            });
          } else if (payload.eventType === 'UPDATE') {
            setDeployments(prev => 
              prev.map(deployment => 
                deployment.id === payload.new.id 
                  ? { ...deployment, ...payload.new } as Deployment
                  : deployment
              )
            );
            
            // Show toast for status changes
            const newDeployment = payload.new as Deployment;
            if (newDeployment.status === 'deployed') {
              toast({
                title: 'Deployment Complete!',
                description: 'Your project has been successfully deployed.',
              });
            } else if (newDeployment.status === 'failed') {
              toast({
                title: 'Deployment Failed',
                description: newDeployment.error_message || 'The deployment encountered an error.',
                variant: 'destructive',
              });
            }
          } else if (payload.eventType === 'DELETE') {
            setDeployments(prev => 
              prev.filter(deployment => deployment.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return {
    deployments,
    loading,
    deploying,
    setDeploying,
    fetchDeployments
  };
};
