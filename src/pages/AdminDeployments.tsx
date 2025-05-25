
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { useToast } from '@/hooks/use-toast';
import DeploymentHeader from '@/components/admin/deployment-header';
import DeploymentTrigger from '@/components/admin/deployment-trigger';
import DeploymentHistory from '@/components/admin/deployment-history';
import ProjectManagement from '@/components/admin/project-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeploymentState } from '@/hooks/use-deployment-state';
import { deploymentService } from '@/services/deployment-service';

const AdminDeployments = () => {
  const { deployments, loading, deploying, setDeploying } = useDeploymentState();
  const { toast } = useToast();

  const triggerDeployment = async (projectId?: string, stage: string = 'prod') => {
    if (deploying) return;
    
    setDeploying(true);
    
    try {
      const result = await deploymentService.triggerDeployment(projectId, stage);
      
      toast({
        title: 'Deployment Started',
        description: result.message,
      });

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

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <DeploymentHeader />
        
        <Tabs defaultValue="deploy" className="space-y-6">
          <TabsList>
            <TabsTrigger value="deploy">Deploy</TabsTrigger>
            <TabsTrigger value="manage">Manage Projects</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deploy" className="space-y-6">
            <DeploymentTrigger 
              onTriggerDeployment={triggerDeployment}
              deploying={deploying}
            />
          </TabsContent>
          
          <TabsContent value="manage">
            <ProjectManagement />
          </TabsContent>
          
          <TabsContent value="history">
            <DeploymentHistory deployments={deployments} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDeployments;
