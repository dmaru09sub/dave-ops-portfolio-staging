
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDeploymentTimeout = () => {
  useEffect(() => {
    const checkTimeouts = async () => {
      try {
        // Get deployments that are still in progress and older than 30 minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
        
        const { data: timedOutDeployments, error } = await supabase
          .from('daveops_portfolio_deployments')
          .select('id, project_id, deployment_stage, status, created_at')
          .in('status', ['pending', 'in_progress'])
          .lt('created_at', thirtyMinutesAgo);

        if (error) {
          console.error('Error checking deployment timeouts:', error);
          return;
        }

        // Update timed out deployments
        if (timedOutDeployments && timedOutDeployments.length > 0) {
          for (const deployment of timedOutDeployments) {
            await supabase
              .from('daveops_portfolio_deployments')
              .update({
                status: 'failed',
                error_message: 'Deployment timed out after 30 minutes',
                updated_at: new Date().toISOString()
              })
              .eq('id', deployment.id);
          }
          
          console.log(`Updated ${timedOutDeployments.length} timed out deployments`);
        }
      } catch (error) {
        console.error('Error in timeout check:', error);
      }
    };

    // Check for timeouts every 5 minutes
    const interval = setInterval(checkTimeouts, 5 * 60 * 1000);
    
    // Run initial check
    checkTimeouts();

    return () => clearInterval(interval);
  }, []);
};
