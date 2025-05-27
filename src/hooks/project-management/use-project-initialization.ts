
import { useState } from 'react';
import { ProjectInitializationService } from '@/services/project-initialization-service';
import type { ProjectInitializationStatus, ProjectValidationResult } from '@/types/project-initialization';
import { useToast } from '@/hooks/use-toast';

export const useProjectInitialization = () => {
  const [initializationStatus, setInitializationStatus] = useState<ProjectInitializationStatus | null>(null);
  const [validationResult, setValidationResult] = useState<ProjectValidationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();

  const initializeProject = async (projectId: string) => {
    if (!projectId || isInitializing) return;
    
    setIsInitializing(true);
    try {
      const result = await ProjectInitializationService.initializeProject(projectId);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error initializing project:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize project',
        variant: 'destructive'
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return {
    initializationStatus,
    validationResult,
    loading,
    isInitializing,
    initializeProject,
  };
};
