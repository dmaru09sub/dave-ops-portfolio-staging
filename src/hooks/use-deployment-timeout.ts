
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDeploymentTimeout = () => {
  const [lastCheck, setLastCheck] = useState<Date>(new Date());

  const checkAndUpdateTimeouts = async () => {
    try {
      // Find deployments that are over 30 minutes old and still pending/approved
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      
      const { data: timedOutDeployments, error } = await supabase
        .from('daveops_portfolio_deployments')
        .select('id, status, created_at')
        .in('status', ['pending', 'approved'])
        .lt('created_at', thirtyMinutesAgo.toISOString());

      if (error) throw error;

      // Update timed out deployments
      if (timedOutDeployments && timedOutDeployments.length > 0) {
        const updates = timedOutDeployments.map(deployment => 
          supabase
            .from('daveops_portfolio_deployments')
            .update({ 
              status: 'failed',
              error_message: 'Deployment timed out after 30 minutes'
            })
            .eq('id', deployment.id)
        );

        await Promise.all(updates);
        console.log(`Updated ${timedOutDeployments.length} timed out deployments`);
      }

      setLastCheck(new Date());
    } catch (error) {
      console.error('Error checking deployment timeouts:', error);
    }
  };

  useEffect(() => {
    // Check immediately
    checkAndUpdateTimeouts();

    // Set up interval to check every 5 minutes
    const interval = setInterval(checkAndUpdateTimeouts, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { lastCheck, checkAndUpdateTimeouts };
};
