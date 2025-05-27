
import { supabase } from '@/integrations/supabase/client';
import type { 
  ProjectInitializationStatus,
  ProjectValidationResult,
  ProjectInitializationResult 
} from '@/types/project-initialization';

export class ProjectInitializationService {
  static async initializeProject(projectId: string): Promise<ProjectInitializationResult> {
    try {
      const { data, error } = await supabase.functions.invoke('project-initialization', {
        body: { projectId, action: 'initialize' }
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Project initialization failed:', error);
      throw new Error(error.message || 'Failed to initialize project');
    }
  }

  static async getInitializationStatus(projectId: string): Promise<ProjectInitializationStatus | null> {
    try {
      const { data, error } = await supabase
        .from('daveops_project_initialization_status')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) return null;

      // Ensure validation_errors is always an array
      const validationErrors = Array.isArray(data.validation_errors) 
        ? data.validation_errors 
        : data.validation_errors 
          ? [data.validation_errors] 
          : [];

      return {
        id: data.id,
        project_id: data.project_id,
        configuration_complete: data.configuration_complete,
        workflow_files_created: data.workflow_files_created,
        secrets_configured: data.secrets_configured,
        github_pages_enabled: data.github_pages_enabled,
        repository_structure_valid: data.repository_structure_valid,
        initial_deployment_successful: data.initial_deployment_successful,
        validation_errors: validationErrors,
        last_validation_at: data.last_validation_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error('Failed to get initialization status:', error);
      return null;
    }
  }

  static async validateProject(projectId: string): Promise<ProjectValidationResult> {
    try {
      const { data, error } = await supabase.functions.invoke('project-initialization', {
        body: { projectId, action: 'validate' }
      });

      if (error) throw error;
      
      const status = data.data as ProjectInitializationStatus;
      const isValid = status?.configuration_complete && 
                     status?.workflow_files_created && 
                     status?.secrets_configured;
      
      return {
        isValid,
        errors: status?.validation_errors || [],
        warnings: [],
        recommendations: isValid ? [] : [
          'Complete project initialization to enable full functionality',
          'Ensure all required secrets are configured',
          'Verify GitHub workflow files are properly set up'
        ],
        requiredActions: []
      };
    } catch (error: any) {
      return {
        isValid: false,
        errors: [error.message || 'Validation failed'],
        warnings: [],
        recommendations: ['Try initializing the project again'],
        requiredActions: []
      };
    }
  }
}
