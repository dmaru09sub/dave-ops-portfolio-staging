
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch, Globe, Github, Code } from 'lucide-react';
import DeploymentButton from './deployment-button';
import DeploymentStatusDisplay from './deployment-status-display';
import { useProjectDeploymentStatus } from '@/hooks/use-project-deployment-status';

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

interface ImprovedDeploymentStageCardProps {
  project: Project;
}

const ImprovedDeploymentStageCard: React.FC<ImprovedDeploymentStageCardProps> = ({ project }) => {
  const { deploymentStatuses, loading } = useProjectDeploymentStatus([project.id]);
  const projectStatus = deploymentStatuses[project.id];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {}
      <Card className="border-yellow-200 bg-yellow-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-yellow-600" />
              STAGE
            </CardTitle>
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Public
            </Badge>
          </div>
          <CardDescription className="text-xs text-yellow-700">
            Clean source code without Lovable references
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-1 gap-2">
            {project.stage_repo && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-yellow-600">Repository</p>
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3 text-yellow-500" />
                  <a
                    href={`https://github.com/${project.stage_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-yellow-600 hover:underline"
                  >
                    {project.stage_repo}
                  </a>
                </div>
              </div>
            )}
            
            {project.stage_url && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-yellow-600">URL</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
                  <a
                    href={project.stage_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-yellow-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Stage Site
                  </a>
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-center pt-2">
            <DeploymentButton
              projectId={project.id}
              projectName={project.name}
              stage="prod"
              sourceStage="STAGE"
              targetStage="PROD"
              disabled={!project.prod_repo || !project.active}
              variant="outline"
            />
          </div>

          <div className="border-t border-yellow-200 pt-2">
            <p className="text-xs font-medium text-yellow-600 mb-2">Last STAGE → PROD Deployment</p>
            <DeploymentStatusDisplay 
              deployment={projectStatus?.lastProdDeployment}
              sourceRepo={project.source_repo}
              stageRepo={project.stage_repo || undefined}
              deploymentStage="prod"
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>

      {/* PROD Stage - Green Theme */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-600" />
              PROD
            </CardTitle>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              Live
            </Badge>
          </div>
          <CardDescription className="text-xs text-green-700">
            Production build with static files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-1 gap-2">
            {project.prod_repo && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-green-600">Repository</p>
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3 text-green-500" />
                  <a
                    href={`https://github.com/${project.prod_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline"
                  >
                    {project.prod_repo}
                  </a>
                </div>
              </div>
            )}
            
            {project.prod_url && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-green-600">URL</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
                  <a
                    href={project.prod_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    View Live Site
                  </a>
                </Button>
              </div>
            )}
            
            {project.deployment_url && project.deployment_url !== project.prod_url && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-green-600">Legacy URL</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
                  <a
                    href={project.deployment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Legacy Site
                  </a>
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-green-200 pt-2">
            <p className="text-xs font-medium text-green-600 mb-2">Production Status</p>
            <DeploymentStatusDisplay 
              deployment={projectStatus?.lastProdDeployment}
              sourceRepo={project.source_repo}
              stageRepo={project.stage_repo || undefined}
              deploymentStage="prod"
              loading={loading}
              showOnlyFinalStatus={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedDeploymentStageCard;
