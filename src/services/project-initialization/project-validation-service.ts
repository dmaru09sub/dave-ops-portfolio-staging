
import { supabase } from '@/integrations/supabase/client';
import type { ProjectValidationResult } from '@/types/project-initialization';

export class ProjectValidationService {
  static async validateProject(projectId: string): Promise<ProjectValidationResult> {
    try {
      // Get project details
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
          recommendations: [],
          requiredActions: []
        };
      }

      const errors: string[] = [];
      const warnings: string[] = [];
      const recommendations: string[] = [];

      // Basic validation
      if (!project.source_repo) {
        errors.push('Source repository is required');
        recommendations.push('Configure the main development repository');
      }

      if (!project.github_workflow_file) {
        errors.push('GitHub workflow file is required');
        recommendations.push('Set up the deployment workflow configuration');
      }

      if (!project.stage_repo && !project.prod_repo) {
        warnings.push('No deployment repositories configured');
        recommendations.push('Set up stage and production repositories for complete pipeline');
      }

      if (!project.build_command) {
        warnings.push('No build command specified, using default');
        recommendations.push('Specify a custom build command if needed');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        recommendations,
        requiredActions: []
      };
    } catch (error) {
      console.error('Error validating project:', error);
      return {
        isValid: false,
        errors: ['Validation failed'],
        warnings: [],
        recommendations: ['Try validating the project again'],
        requiredActions: []
      };
    }
  }
}
