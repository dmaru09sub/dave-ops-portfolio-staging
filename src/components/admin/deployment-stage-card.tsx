import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch, Globe, Github } from 'lucide-react';
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

interface DeploymentStageCardProps {
  project: Project;
}

const DeploymentStageCard: React.FC<DeploymentStageCardProps> = ({ project }) => {
  const { deploymentStatuses, loading } = useProjectDeploymentStatus([project.id]);
  const projectStatus = deploymentStatuses[project.id];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {}
          <div className="border-t pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Last DEV → STAGE Deployment</p>
            <DeploymentStatusDisplay 
              deployment={projectStatus?.lastStageDeployment}
              sourceRepo={project.source_repo}
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>

      {}
          <div className="border-t pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Last STAGE → PROD Deployment</p>
            <DeploymentStatusDisplay 
              deployment={projectStatus?.lastProdDeployment}
              sourceRepo={project.source_repo}
              loading={loading}
            />
          </div>
        </CardContent>
      </Card>

      {/* PROD Stage */}
      <Card className="border-green-200 bg-green-50/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-600" />
              PROD
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Production build with static files
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="grid grid-cols-1 gap-2">
            {project.prod_repo && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Repository</p>
                <div className="flex items-center gap-1">
                  <Github className="h-3 w-3" />
                  <a
                    href={`https://github.com/${project.prod_repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {project.prod_repo}
                  </a>
                </div>
              </div>
            )}
            
            {project.prod_url && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">URL</p>
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
                <p className="text-xs font-medium text-muted-foreground">Legacy URL</p>
                <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
                  <a
                    href={project.deployment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Legacy Site
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Final Production Status */}
          <div className="border-t pt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Production Status</p>
            <DeploymentStatusDisplay 
              deployment={projectStatus?.lastProdDeployment}
              sourceRepo={project.source_repo}
              loading={loading}
              showOnlyFinalStatus={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentStageCard;
