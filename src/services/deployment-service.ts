
import { supabase } from '@/integrations/supabase/client';

export const deploymentService = {
  async triggerDeployment(projectId?: string, stage: string = 'prod') {
    let newDeployment: any = null;
    
    try {
      console.log(`Creating ${stage} deployment record...`);
      
      // Create deployment record in database
      const deploymentData = {
        status: 'pending',
        deployment_stage: stage,
        notes: `Manual ${stage} deployment triggered from admin panel`,
        ...(projectId && { project_id: projectId })
      };

      const { data, error: dbError } = await supabase
        .from('daveops_portfolio_deployments')
        .insert(deploymentData)
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }
      
      newDeployment = data;
      console.log('Created deployment record:', newDeployment);

      console.log('Calling trigger-deployment function...');
      
      // Get the session to include auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      // Call the edge function with proper error handling
      const response = await fetch('https://nlzwrlgtjshcjfxfchyz.supabase.co/functions/v1/trigger-deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sendybGd0anNoY2pmeGZjaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTQ0OTksImV4cCI6MjA2MzM3MDQ5OX0.-HJhOWKhgGzH_h8bKSUJ6-p9QJ8ZUecXB9qTqMyYmKE'
        },
        body: JSON.stringify({ 
          deployment_id: newDeployment.id,
          project_id: projectId,
          deployment_stage: stage
        })
      });

      console.log('Function response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Function response error:', errorText);
        throw new Error(`Function call failed: ${response.status} ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Function response data:', responseData);

      return {
        success: true,
        message: `${responseData.project || 'Project'} ${stage} deployment has been triggered. Watch below for real-time updates.`
      };

    } catch (error: any) {
      console.error('Error triggering deployment:', error);
      
      // Update deployment status to failed if we have a deployment record
      if (newDeployment?.id) {
        try {
          await supabase
            .from('daveops_portfolio_deployments')
            .update({ 
              status: 'failed',
              error_message: error.message || 'Deployment failed to trigger'
            })
            .eq('id', newDeployment.id);
        } catch (updateError) {
          console.error('Error updating deployment status to failed:', updateError);
        }
      }
      
      throw new Error(`Failed to trigger ${stage} deployment: ${error.message || 'Unknown error'}`);
    }
  }
};
