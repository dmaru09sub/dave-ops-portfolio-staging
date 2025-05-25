
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deploymentService } from '@/services/deployment-service';
import { useToast } from '@/hooks/use-toast';
import { Rocket, Upload } from 'lucide-react';

interface DeploymentButtonProps {
  projectId: string;
  projectName: string;
  stage: 'stage' | 'prod';
  sourceStage: string;
  targetStage: string;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
}

const DeploymentButton: React.FC<DeploymentButtonProps> = ({
  projectId,
  projectName,
  stage,
  sourceStage,
  targetStage,
  disabled = false,
  variant = 'default',
  size = 'sm'
}) => {
  const [deploying, setDeploying] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
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

  const getButtonText = () => {
    if (deploying) return 'Deploying...';
    return stage === 'stage' ? 'Deploy to Stage' : 'Deploy to Prod';
  };

  const getIcon = () => {
    return stage === 'stage' ? <Upload className="h-4 w-4" /> : <Rocket className="h-4 w-4" />;
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || deploying}
          className="flex items-center gap-2"
        >
          {getIcon()}
          {getButtonText()}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm {stage === 'stage' ? 'Stage' : 'Production'} Deployment
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              You are about to deploy <strong>{projectName}</strong> from{' '}
              <strong>{sourceStage}</strong> to <strong>{targetStage}</strong>.
            </p>
            {stage === 'stage' && (
              <p className="text-amber-600">
                This will clean Lovable references from your source code and deploy to the staging environment.
              </p>
            )}
            {stage === 'prod' && (
              <p className="text-red-600">
                This will build static files from your staging code and deploy to production. This action will make your changes live.
              </p>
            )}
            <p>Are you sure you want to continue?</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeploy} disabled={deploying}>
            {deploying ? 'Deploying...' : `Deploy to ${stage === 'stage' ? 'Stage' : 'Production'}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeploymentButton;
