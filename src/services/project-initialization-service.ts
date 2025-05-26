
import { supabase } from '@/integrations/supabase/client';
import type { 
  ProjectInitializationStatus, 
  ProjectValidationResult, 
  RequiredAction,
  RawProjectInitializationStatus 
} from '@/types/project-initialization';

export class ProjectInitializationService {
  
  static async validateProject(projectId: string): Promise<ProjectValidationResult> {
    try {
      const { data: project, error: projectError } = await supabase
        .from('daveops_deployment_projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return {
          isValid: false,
          errors: ['Project not found'],
          warnings: [],
          requiredActions: []
        };
      }

      const errors: string[] = [];
      const warnings: string[] = [];
      const requiredActions: RequiredAction[] = [];

      // Validate repository configuration
      if (!project.source_repo) {
        errors.push('Source repository not configured');
        requiredActions.push({
          id: 'setup-source-repo',
          title: 'Configure Source Repository',
          description: 'Set up the source repository URL',
          type: 'repository',
          status: 'pending',
          automated: false
        });
      }

      if (!project.stage_repo) {
        warnings.push('Stage repository not configured');
        requiredActions.push({
          id: 'setup-stage-repo',
          title: 'Configure Stage Repository',
          description: 'Set up the staging repository for clean deployments',
          type: 'repository',
          status: 'pending',
          automated: true
        });
      }

      if (!project.prod_repo) {
        warnings.push('Production repository not configured');
        requiredActions.push({
          id: 'setup-prod-repo',
          title: 'Configure Production Repository',
          description: 'Set up the production repository for live deployments',
          type: 'repository',
          status: 'pending',
          automated: true
        });
      }

      // Check for workflow files
      requiredActions.push({
        id: 'create-workflows',
        title: 'Create GitHub Workflows',
        description: 'Generate and push required CI/CD workflow files',
        type: 'workflow',
        status: 'pending',
        automated: true
      });

      // Check for secrets configuration
      requiredActions.push({
        id: 'configure-secrets',
        title: 'Configure GitHub Secrets',
        description: 'Set up required secrets (PORTFOLIO_TOKEN, SUPABASE_ANON_KEY)',
        type: 'secrets',
        status: 'pending',
        automated: false
      });

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        requiredActions
      };
    } catch (error) {
      console.error('Error validating project:', error);
      return {
        isValid: false,
        errors: ['Validation failed due to system error'],
        warnings: [],
        requiredActions: []
      };
    }
  }

  static async initializeProject(projectId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Get project details
      const { data: project, error: projectError } = await supabase
        .from('daveops_deployment_projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError || !project) {
        return { success: false, message: 'Project not found' };
      }

      // Create initialization status record
      const { error: statusError } = await supabase
        .from('daveops_project_initialization_status')
        .upsert({
          project_id: projectId,
          workflow_files_created: false,
          secrets_configured: false,
          repository_structure_valid: false,
          github_pages_enabled: false,
          initial_deployment_successful: false,
          configuration_complete: false,
          last_validation_at: new Date().toISOString(),
          validation_errors: []
        });

      if (statusError) {
        console.error('Error creating initialization status:', statusError);
        return { success: false, message: 'Failed to initialize project tracking' };
      }

      // Trigger workflow creation (this would be done via GitHub API in production)
      await this.createWorkflowFiles(project);

      return { success: true, message: 'Project initialization started' };
    } catch (error) {
      console.error('Error initializing project:', error);
      return { success: false, message: 'Initialization failed' };
    }
  }

  private static async createWorkflowFiles(project: any): Promise<void> {
    // In a real implementation, this would use GitHub API to create/push workflow files
    // For now, we'll simulate the process and update the status
    console.log('Creating workflow files for project:', project.name);
    
    // Simulate workflow creation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update status
    await supabase
      .from('daveops_project_initialization_status')
      .update({ 
        workflow_files_created: true,
        last_validation_at: new Date().toISOString()
      })
      .eq('project_id', project.id);
  }

  static async getInitializationStatus(projectId: string): Promise<ProjectInitializationStatus | null> {
    try {
      const { data, error } = await supabase
        .from('daveops_project_initialization_status')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (error) {
        console.error('Error fetching initialization status:', error);
        return null;
      }

      // Transform raw data to typed interface
      const rawData = data as RawProjectInitializationStatus;
      
      return {
        ...rawData,
        validation_errors: Array.isArray(rawData.validation_errors) 
          ? rawData.validation_errors 
          : rawData.validation_errors 
            ? [String(rawData.validation_errors)]
            : []
      };
    } catch (error) {
      console.error('Error getting initialization status:', error);
      return null;
    }
  }
}
