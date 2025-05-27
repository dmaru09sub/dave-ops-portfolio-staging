
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Loader2 } from 'lucide-react';
import { useProjectInitialization } from '@/hooks/project-management/use-project-initialization';
import { useToast } from '@/hooks/use-toast';

interface ProjectInitializationButtonProps {
  projectId: string;
  projectName: string;
  variant?: "default" | "outline";
  size?: "sm" | "lg";
}

const ProjectInitializationButton: React.FC<ProjectInitializationButtonProps> = ({
  projectId,
  projectName,
  variant = "default",
  size = "sm"
}) => {
  const { initializeProject, isInitializing } = useProjectInitialization();
  const { toast } = useToast();

  const handleInitialization = async () => {
    if (!projectId) {
      toast({
        title: 'Error',
        description: 'Project ID is required for initialization',
        variant: 'destructive',
      });
      return;
    }

    try {
      await initializeProject(projectId);
      toast({
        title: 'Success',
        description: `${projectName} initialization started successfully`,
      });
    } catch (error: any) {
      toast({
        title: 'Initialization Failed',
        description: error.message || 'Failed to initialize project repositories',
        variant: 'destructive',
      });
    }
  };

  if (isInitializing) {
    return (
      <Button variant={variant} size={size} disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Initializing...
      </Button>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleInitialization}
      className="flex items-center gap-2"
    >
      <Settings className="h-4 w-4" />
      Initialize Project
    </Button>
  );
};

export default ProjectInitializationButton;
