
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, History, Settings, Activity, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { deploymentService } from '@/services/deployment-service';
import { useDeploymentState } from '@/hooks/use-deployment-state';
import { useDeploymentTimeout } from '@/hooks/use-deployment-timeout';
import DeploymentTrigger from '@/components/admin/deployment-trigger';
import DeploymentHistory from '@/components/admin/deployment-history';
import ProjectManagement from '@/components/admin/project-management';
import RealTimeStatus from '@/components/admin/real-time-status';
import ComprehensiveAITracker from '@/components/admin/comprehensive-ai-tracker';

const AdminDeployments = () => {
  const [deploying, setDeploying] = useState(false);
  const { deployments, loading, fetchDeployments } = useDeploymentState();
  const { toast } = useToast();
  
  // Initialize timeout checking
  useDeploymentTimeout();

  const handleDeployment = async (projectId?: string, stage?: string) => {
    if (!projectId || !stage) {
      toast({
        title: 'Error',
        description: 'Please select a project and deployment stage',
        variant: 'destructive',
      });
      return;
    }

    setDeploying(true);
    try {
      const result = await deploymentService.triggerDeployment(projectId, stage);
      
      toast({
        title: 'Deployment Started',
        description: result.message,
      });
      
      // Refresh deployments list
      fetchDeployments();
      
    } catch (error: any) {
      toast({
        title: 'Deployment Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setDeploying(false);
    }
  };

  return (
    <RealTimeStatus>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Deployment Management</h1>
              <p className="text-muted-foreground">
                Manage your 3-stage deployment pipeline: DEV → STAGE → PROD
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="https://daveops-portfolio.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </a>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="deploy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deploy" className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                Deploy
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                AI Tracking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deploy" className="space-y-6">
              <DeploymentTrigger
                onTriggerDeployment={handleDeployment}
                deploying={deploying}
              />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <DeploymentHistory deployments={deployments} />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectManagement />
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <ComprehensiveAITracker />
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </RealTimeStatus>
  );
};

export default AdminDeployments;
