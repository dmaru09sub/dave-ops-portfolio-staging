
import { supabase } from '@/integrations/supabase/client';
import type { 
  ProjectInitializationStatus
} from '@/types/project-initialization';

interface RawProjectInitializationStatus {
  id: string;
  project_id: string;
  configuration_complete: boolean;
  workflow_files_created: boolean;
  secrets_configured: boolean;
  github_pages_enabled: boolean;
  repository_structure_valid: boolean;
  initial_deployment_successful: boolean;
  validation_errors: any;
  last_validation_at: string | null;
  created_at: string;
  updated_at: string;
}

export class ProjectStatusService {
  static async getInitializationStatus(projectId: string): Promise<ProjectInitializationStatus | null> {
    const { data, error } = await supabase
      .from('daveops_project_initialization_status')
      .select('*')
      .eq('project_id', projectId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching initialization status:', error);
      throw error;
    }

    if (!data) return null;

    // Transform raw data to proper types
    const rawData = data as RawProjectInitializationStatus;
    return {
      ...rawData,
      validation_errors: Array.isArray(rawData.validation_errors) 
        ? rawData.validation_errors 
        : []
    };
  }

  static async updateInitializationStep(
    projectId: string, 
    step: keyof Omit<ProjectInitializationStatus, 'id' | 'project_id' | 'created_at' | 'updated_at'>,
    completed: boolean
  ): Promise<void> {
    const updateData = {
      [step]: completed,
      updated_at: new Date().toISOString()
    };

    // Check if all steps are complete
    if (completed) {
      const status = await this.getInitializationStatus(projectId);
      if (status) {
        const allStepsComplete = 
          status.workflow_files_created &&
          status.secrets_configured &&
          status.repository_structure_valid &&
          status.github_pages_enabled &&
          status.initial_deployment_successful;

        if (allStepsComplete) {
          updateData.configuration_complete = true;
        }
      }
    }

    const { error } = await supabase
      .from('daveops_project_initialization_status')
      .update(updateData)
      .eq('project_id', projectId);

    if (error) {
      console.error('Error updating initialization step:', error);
      throw error;
    }
  }
}
