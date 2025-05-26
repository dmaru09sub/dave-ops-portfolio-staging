
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle, Timer, HelpCircle } from 'lucide-react';

interface EnhancedDeploymentStatusBadgeProps {
  status: string;
  stage?: 'dev' | 'stage' | 'prod';
  createdAt?: string;
}

const EnhancedDeploymentStatusBadge: React.FC<EnhancedDeploymentStatusBadgeProps> = ({ 
  status, 
  stage = 'prod',
  createdAt 
}) => {
  // Check if deployment is potentially timed out (over 30 minutes old and still pending/approved)
  const isTimedOut = () => {
    if (!createdAt || !['pending', 'approved'].includes(status)) return false;
    const created = new Date(createdAt);
    const now = new Date();
    const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);
    return diffMinutes > 30;
  };

  const getStageColors = () => {
    switch (stage) {
      case 'dev':
        return {
          background: 'bg-blue-50 border-blue-200',
          text: 'text-blue-700',
          icon: 'text-blue-500'
        };
      case 'stage':
        return {
          background: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-700',
          icon: 'text-yellow-500'
        };
      case 'prod':
        return {
          background: 'bg-green-50 border-green-200',
          text: 'text-green-700',
          icon: 'text-green-500'
        };
      default:
        return {
          background: 'bg-gray-50 border-gray-200',
          text: 'text-gray-700',
          icon: 'text-gray-500'
        };
    }
  };

  const getStatusIcon = () => {
    if (isTimedOut()) {
      return <Timer className="h-4 w-4 text-orange-500" />;
    }

    switch (status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'approved':
        const colors = getStageColors();
        return <AlertCircle className={`h-4 w-4 ${colors.icon}`} />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    if (isTimedOut()) {
      return 'Timed Out';
    }

    switch (status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return 'Deployed';
      case 'failed':
        return 'Failed';
      case 'approved':
        return 'Deploying';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const getStatusVariant = (): 'default' | 'secondary' | 'destructive' => {
    if (isTimedOut()) return 'secondary';
    
    switch (status) {
      case 'deployed':
      case 'stage_deployed':
      case 'prod_deployed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'approved':
      case 'pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge variant={getStatusVariant()} className="flex items-center gap-1">
      {getStatusIcon()}
      {getStatusText()}
    </Badge>
  );
};

export default EnhancedDeploymentStatusBadge;
