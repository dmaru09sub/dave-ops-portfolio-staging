
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Clock, CheckCircle, XCircle, AlertCircle, Loader2, Github, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface DeploymentStatusDisplayProps {
  deployment?: { 
    status: string; 
    created_at: string; 
    deployed_at: string | null; 
    error_message: string | null;
    deployment_stage?: string;
  };
  sourceRepo: string;
  stageRepo?: string;
  loading: boolean;
  showOnlyFinalStatus?: boolean;
  deploymentStage?: 'stage' | 'prod';
  liveUrl?: string;
}

const DeploymentStatusDisplay: React.FC<DeploymentStatusDisplayProps> = ({ 
  deployment, 
  sourceRepo, 
  stageRepo,
  loading,
  showOnlyFinalStatus = false,
  deploymentStage,
  liveUrl
}) => {
  // Determine which repository's actions to link to based on the deployment stage
  const getActionsRepo = () => {
    if (deploymentStage === 'prod' && stageRepo) {
      // For STAGE → PROD deployments, link to the stage repository actions
      return stageRepo;
    }
    // For DEV → STAGE deployments, link to the source repository actions
    return sourceRepo;
  };

  const getDisplayRepo = () => {
    if (deploymentStage === 'prod' && stageRepo) {
      return stageRepo;
    }
    return sourceRepo;
  };

  const actionsRepo = getActionsRepo();
  const displayRepo = getDisplayRepo();
  const actionsUrl = `https://github.com/${actionsRepo}/actions`;
  const repoUrl = `https://github.com/${displayRepo}`;

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
        <span className="text-xs text-gray-500">Loading status...</span>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">No deployments yet</span>
        </div>
        <div className="space-y-1">
          <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <Github className="h-3 w-3" />
              {displayRepo}
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
            <a
              href={actionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              <Activity className="h-3 w-3" />
              View Actions
            </a>
          </Button>
          {liveUrl && (
            <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Live Site
              </a>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (deployment.status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'failed':
        return <XCircle className="h-3 w-3 text-red-500" />;
      case 'approved':
        return <Loader2 className="h-3 w-3 animate-spin text-blue-500" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (deployment.status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'approved':
        return 'text-blue-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    if (showOnlyFinalStatus) {
      switch (deployment.status) {
        case 'deployed':
        case 'stage_deployed':
        case 'prod_deployed':
          return 'LIVE';
        case 'failed':
          return 'FAILED';
        case 'approved':
          return 'DEPLOYING';
        case 'pending':
          return 'PENDING';
        default:
          return deployment.status.replace('_', ' ').toUpperCase();
      }
    }

    switch (deployment.status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return 'DEPLOYED';
      case 'failed':
        return 'FAILED';
      case 'approved':
        return 'IN PROGRESS';
      case 'pending':
        return 'PENDING';
      default:
        return deployment.status.replace('_', ' ').toUpperCase();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {getStatusIcon()}
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>
      <div className="text-xs text-muted-foreground">
        {deployment.deployed_at ? (
          <span>Deployed: {format(new Date(deployment.deployed_at), 'MMM d, HH:mm')}</span>
        ) : (
          <span>Started: {format(new Date(deployment.created_at), 'MMM d, HH:mm')}</span>
        )}
      </div>
      {deployment.error_message && (
        <div className="text-xs text-red-600 truncate max-w-[200px]" title={deployment.error_message}>
          Error: {deployment.error_message}
        </div>
      )}
      <div className="space-y-1">
        <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Github className="h-3 w-3" />
            {displayRepo}
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
          <a
            href={actionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Activity className="h-3 w-3" />
            GitHub Actions
          </a>
        </Button>
        {liveUrl && (
          <Button variant="ghost" size="sm" className="h-auto p-0 justify-start" asChild>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-600 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              Live Site
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeploymentStatusDisplay;
