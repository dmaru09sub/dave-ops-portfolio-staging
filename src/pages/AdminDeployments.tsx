import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import DeploymentStageCard from '@/components/admin/deployment-stage-card';
import DeploymentHistory from '@/components/admin/deployment-history';
import { useDeploymentState } from '@/hooks/use-deployment-state';
import { useDeploymentProjects } from '@/hooks/use-deployment-projects';
import EnhancedAiTracker from '@/components/admin/enhanced-ai-tracker';

const AdminDeployments = () => {
  const { deployments, loading } = useDeploymentState();
  const { projects } = useDeploymentProjects();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Enhanced AI Tracker */}
        <EnhancedAiTracker autoTrack={true} />
        
        {projects.map((project) => (
          <DeploymentStageCard key={project.id} project={project} />
        ))}

        <DeploymentHistory deployments={deployments} />
      </div>
    </AdminLayout>
  );
};

export default AdminDeployments;
