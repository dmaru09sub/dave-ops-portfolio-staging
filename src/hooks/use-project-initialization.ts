
import { useState, useEffect } from 'react';
import { ProjectInitializationService } from '@/services/project-initialization-service';
import type { ProjectValidationResult } from '@/types/project-initialization';
import { useToast } from '@/hooks/use-toast';

// Use the service interface directly to avoid type conflicts
type ProjectInitializationStatus = Awaited<ReturnType<typeof ProjectInitializationService.getInitializationStatus>>;

export const useProjectInitialization = (projectId?: string) => {
  const [initializationStatus, setInitializationStatus] = useState<ProjectInitializationStatus>(null);
  const [validationResult, setValidationResult] = useState<ProjectValidationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(false);
  const { toast } = useToast();

  const loadStatus = async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const [status, validation] = await Promise.all([
        ProjectInitializationService.getInitializationStatus(projectId),
        ProjectInitializationService.validateProject(projectId)
      ]);
      
      setInitializationStatus(status);
      setValidationResult(validation);
    } catch (error) {
      console.error('Error loading project initialization status:', error);
      toast({
        title: 'Error',
        description: 'Failed to load project initialization status',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeProject = async () => {
    if (!projectId || initializing) return;
    
    setInitializing(true);
    try {
      const result = await ProjectInitializationService.initializeProject(projectId);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message
        });
        await loadStatus(); // Reload status after initialization
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
      setInitializing(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, [projectId]);

  const isConfigurationComplete = initializationStatus?.configuration_complete ?? false;
  const needsInitialization = !initializationStatus || !isConfigurationComplete;

  return {
    initializationStatus,
    validationResult,
    loading,
    initializing,
    needsInitialization,
    isConfigurationComplete,
    initializeProject,
    refreshStatus: loadStatus
  };
};
