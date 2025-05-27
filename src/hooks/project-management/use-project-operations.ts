
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useChangelog } from '@/hooks/use-changelog';
import type { Project } from '@/components/admin/project-management/types';

export const useProjectOperations = () => {
  const { createEntry } = useChangelog();
  const { toast } = useToast();

  const createProject = async (formData: Partial<Project>) => {
    if (!formData.name || !formData.source_repo) {
      throw new Error('Name and source repository are required');
    }
    
    const projectData = {
      name: formData.name,
      description: formData.description,
      github_repo: formData.source_repo,
      source_repo: formData.source_repo,
      stage_repo: formData.stage_repo,
      prod_repo: formData.prod_repo,
      github_workflow_file: formData.github_workflow_file,
      deployment_url: formData.deployment_url,
      stage_url: formData.stage_url,
      prod_url: formData.prod_url,
      build_command: formData.build_command,
      project_type: formData.project_type,
      active: Boolean(formData.active),
      is_source_private: Boolean(formData.is_source_private),
      stage_branch: formData.stage_branch,
      prod_branch: formData.prod_branch
    };
    
    const { error } = await supabase
      .from('daveops_deployment_projects')
      .insert([projectData]);
    
    if (error) throw error;
    
    toast({
      title: 'Project Created',
      description: 'New deployment project has been created successfully.',
    });

    await createEntry({
      title: `AI-Assisted: Created new deployment project: ${formData.name}`,
      description: `Added new 3-stage deployment project with DEV → STAGE → PROD pipeline using AI assistance`,
      change_type: 'feature',
      severity: 'minor',
      project_id: null,
      published: true,
      metadata: {
        action: 'project_created',
        project_name: formData.name,
        source_repo: formData.source_repo,
        ai_assisted: true,
        user_prompt: 'User requested creation of new deployment project',
        changes_made: [
          'Created new project configuration',
          'Set up 3-stage deployment pipeline',
          'Configured GitHub workflow integration'
        ],
        affected_components: ['project-management', 'deployment-system'],
        deployment_stage: formData.stage_repo ? 'stage' : 'prod'
      }
    });
  };

  const updateProject = async (editingProject: string, formData: Partial<Project>) => {
    const updateData = {
      name: formData.name,
      description: formData.description,
      github_repo: formData.source_repo,
      source_repo: formData.source_repo,
      stage_repo: formData.stage_repo,
      prod_repo: formData.prod_repo,
      github_workflow_file: formData.github_workflow_file,
      deployment_url: formData.deployment_url,
      stage_url: formData.stage_url,
      prod_url: formData.prod_url,
      build_command: formData.build_command,
      project_type: formData.project_type,
      active: Boolean(formData.active),
      is_source_private: Boolean(formData.is_source_private),
      stage_branch: formData.stage_branch,
      prod_branch: formData.prod_branch
    };
    
    const { error } = await supabase
      .from('daveops_deployment_projects')
      .update(updateData)
      .eq('id', editingProject);
    
    if (error) throw error;
    
    toast({
      title: 'Project Updated',
      description: 'Project configuration has been updated.',
    });

    await createEntry({
      title: `AI-Assisted: Updated deployment project: ${formData.name}`,
      description: `Modified configuration for 3-stage deployment project using AI assistance`,
      change_type: 'improvement',
      severity: 'minor',
      project_id: editingProject,
      published: true,
      metadata: {
        action: 'project_updated',
        project_name: formData.name,
        project_id: editingProject,
        ai_assisted: true,
        user_prompt: 'User requested project configuration update',
        changes_made: [
          'Updated project settings',
          'Modified deployment configuration',
          'Refined pipeline parameters'
        ],
        affected_components: ['project-management', 'deployment-config']
      }
    });
  };

  const logError = async (newProject: boolean, formData: Partial<Project>, editingProject: string | null, error: any) => {
    await createEntry({
      title: `Error: Failed to ${newProject ? 'create' : 'update'} project: ${formData.name}`,
      description: `Project ${newProject ? 'creation' : 'update'} failed with error: ${error.message}`,
      change_type: 'bugfix',
      severity: 'major',
      project_id: editingProject,
      published: true,
      metadata: {
        action: 'project_error',
        error_message: error.message,
        error_type: 'project_save_failure',
        ai_assisted: true,
        context: newProject ? 'project_creation' : 'project_update'
      }
    });
  };

  return {
    createProject,
    updateProject,
    logError
  };
};
