
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ExternalLink, Folder, Github, Activity } from 'lucide-react';
import { format } from 'date-fns';
import EnhancedDeploymentStatusBadge from './enhanced-deployment-status-badge';
import { Badge } from '@/components/ui/badge';

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

interface DeploymentHistoryProps {
  deployments: Deployment[];
}

const formatRepoUrl = (repo: string | null | undefined) => {
  if (!repo) return null;
  if (repo.startsWith('http')) return repo;
  return `https://github.com/${repo}`;
};

const getDeploymentUrl = (deployment: Deployment) => {
  const project = deployment.daveops_deployment_projects;
  if (!project) return null;

  // Use explicit deployment URL first
  if (deployment.deployment_url) return deployment.deployment_url;
  
  // Fall back to stage/prod URLs based on deployment stage
  if (deployment.deployment_stage === 'stage' && project.stage_url) {
    return project.stage_url;
  }
  if (deployment.deployment_stage === 'prod' && project.prod_url) {
    return project.prod_url;
  }
  
  // If no public URL, show the relevant GitHub repo
  if (deployment.deployment_stage === 'stage' && project.stage_repo) {
    return formatRepoUrl(project.stage_repo);
  }
  if (deployment.deployment_stage === 'prod' && project.prod_repo) {
    return formatRepoUrl(project.prod_repo);
  }
  
  // Ultimate fallback to source repo
  return formatRepoUrl(project.source_repo);
};

const getActionLogsUrl = (deployment: Deployment) => {
  const project = deployment.daveops_deployment_projects;
  if (!project || !project.source_repo) return null;
  
  // GitHub Actions logs URL format: https://github.com/owner/repo/actions
  const sourceRepoUrl = formatRepoUrl(project.source_repo);
  return sourceRepoUrl ? `${sourceRepoUrl}/actions` : null;
};

const getStageVariant = (stage: string | null) => {
  switch (stage) {
    case 'stage':
      return 'secondary';
    case 'prod':
      return 'default';
    default:
      return 'outline';
  }
};

const getStageColor = (stage: string | null) => {
  switch (stage) {
    case 'stage':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'prod':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-300';
  }
};

const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ deployments }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment History</CardTitle>
        <CardDescription>
          Recent deployments across all projects with enhanced status tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        {deployments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No deployments yet. Trigger your first deployment above.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Deployed</TableHead>
                <TableHead>Links</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((deployment) => {
                const deploymentUrl = getDeploymentUrl(deployment);
                const actionLogsUrl = getActionLogsUrl(deployment);
                const stage = deployment.deployment_stage as 'dev' | 'stage' | 'prod' || 'prod';
                
                return (
                  <TableRow key={deployment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {deployment.daveops_deployment_projects?.name || 'Unknown Project'}
                          </span>
                          {deployment.daveops_deployment_projects?.project_type && (
                            <Badge variant="outline" className="text-xs w-fit">
                              {deployment.daveops_deployment_projects.project_type}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStageVariant(deployment.deployment_stage)}
                        className={getStageColor(deployment.deployment_stage)}
                      >
                        {deployment.deployment_stage?.toUpperCase() || 'PROD'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <EnhancedDeploymentStatusBadge 
                        status={deployment.status} 
                        stage={stage}
                        createdAt={deployment.created_at}
                      />
                    </TableCell>
                    <TableCell>
                      {format(new Date(deployment.created_at), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      {deployment.deployed_at ? 
                        format(new Date(deployment.deployed_at), 'MMM d, yyyy HH:mm') : 
                        '-'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {deploymentUrl && (
                          <a 
                            href={deploymentUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1 text-xs"
                          >
                            {deploymentUrl.includes('github.com') ? (
                              <>
                                <Github className="h-3 w-3" />
                                Repository
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-3 w-3" />
                                Live Site
                              </>
                            )}
                          </a>
                        )}
                        {actionLogsUrl && (
                          <a 
                            href={actionLogsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline inline-flex items-center gap-1 text-xs"
                          >
                            <Activity className="h-3 w-3" />
                            Action Logs
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {deployment.error_message || deployment.notes || '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;
