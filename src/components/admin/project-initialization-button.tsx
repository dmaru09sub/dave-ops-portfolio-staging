
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, Settings, PlayCircle } from 'lucide-react';
import { useProjectInitialization } from '@/hooks/use-project-initialization';

interface ProjectInitializationButtonProps {
  projectId: string;
  projectName: string;
}

const ProjectInitializationButton: React.FC<ProjectInitializationButtonProps> = ({
  projectId,
  projectName
}) => {
  const {
    initializationStatus,
    validationResult,
    loading,
    initializing,
    needsInitialization,
    isConfigurationComplete,
    initializeProject
  } = useProjectInitialization(projectId);

  if (loading) {
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Checking initialization status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = () => {
    if (isConfigurationComplete) return 'bg-green-100 text-green-800 border-green-200';
    if (initializationStatus && !isConfigurationComplete) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getStatusIcon = () => {
    if (isConfigurationComplete) return <CheckCircle className="h-4 w-4" />;
    if (initializationStatus && !isConfigurationComplete) return <AlertCircle className="h-4 w-4" />;
    return <Settings className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (isConfigurationComplete) return 'Ready for Deployment';
    if (initializationStatus && !isConfigurationComplete) return 'Needs Configuration';
    return 'Not Initialized';
  };

  return (
    <Card className={`mb-4 border ${getStatusColor().includes('green') ? 'border-green-200' : getStatusColor().includes('yellow') ? 'border-yellow-200' : 'border-blue-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Project Initialization</CardTitle>
          <Badge className={getStatusColor()}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </Badge>
        </div>
        <CardDescription className="text-xs">
          {isConfigurationComplete 
            ? `${projectName} is fully configured and ready for CI/CD deployments`
            : `${projectName} requires initialization to enable automated deployments`
          }
        </CardDescription>
      </CardHeader>
      
      {needsInitialization && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {validationResult && validationResult.requiredActions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Required Actions:</h4>
                <ul className="space-y-1">
                  {validationResult.requiredActions.slice(0, 3).map((action) => (
                    <li key={action.id} className="text-xs flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{action.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              size="sm" 
              onClick={initializeProject}
              disabled={initializing}
              className="w-full"
            >
              <PlayCircle className="h-3 w-3 mr-2" />
              {initializing ? 'Initializing...' : 'Initialize Project'}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ProjectInitializationButton;
