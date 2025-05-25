
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDeploymentProjects } from '@/hooks/use-deployment-projects';
import { useChangelog } from '@/hooks/use-changelog';
import ProjectForm from './project-form';
import ProjectCard from './project-card';

interface Project {
  id: string;
  name: string;
  description: string | null;
  github_repo: string;
  source_repo: string;
  stage_repo: string | null;
  prod_repo: string | null;
  github_workflow_file: string;
  deployment_url: string | null;
  stage_url: string | null;
  prod_url: string | null;
  build_command: string | null;
  project_type: string | null;
  active: boolean;
  is_source_private: boolean | null;
  stage_branch: string | null;
  prod_branch: string | null;
  created_at: string;
  updated_at: string;
}

const ProjectManagement: React.FC = () => {
  const { projects, loading, refetch } = useDeploymentProjects();
  const { createEntry } = useChangelog();
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newProject, setNewProject] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleEdit = (project: Project) => {
    setEditingProject(project.id);
    setFormData(project);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setNewProject(false);
    setFormData({});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (newProject) {
        if (!formData.name || !formData.source_repo) {
          throw new Error('Name and source repository are required');
        }
        
        const { error } = await supabase
          .from('daveops_deployment_projects')
          .insert([{
            ...formData,
            github_repo: formData.source_repo,
            active: Boolean(formData.active ?? true)
          } as any]);
        
        if (error) throw error;
        
        toast({
          title: 'Project Created',
          description: 'New deployment project has been created successfully.',
        });

        // Create comprehensive changelog entry for project creation
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
        
      } else {
        const { error } = await supabase
          .from('daveops_deployment_projects')
          .update({
            ...formData,
            github_repo: formData.source_repo,
            active: Boolean(formData.active ?? true)
          })
          .eq('id', editingProject);
        
        if (error) throw error;
        
        toast({
          title: 'Project Updated',
          description: 'Project configuration has been updated.',
        });

        // Create comprehensive changelog entry for project update
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
      }
      
      handleCancel();
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save project',
        variant: 'destructive',
      });

      // Log error in changelog
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
    } finally {
      setSaving(false);
    }
  };

  const handleNewProject = () => {
    setNewProject(true);
    setFormData({
      name: '',
      description: '',
      source_repo: '',
      stage_repo: '',
      prod_repo: '',
      github_workflow_file: 'clean-and-deploy.yml',
      stage_url: '',
      prod_url: '',
      deployment_url: '',
      build_command: 'npm run build',
      project_type: 'react',
      active: true,
      is_source_private: true,
      stage_branch: 'main',
      prod_branch: 'main'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          3-Stage Deployment Projects
        </CardTitle>
        <CardDescription>
          Configure DEV → STAGE → PROD deployment pipeline with automatic Lovable reference cleaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
          <Button
            onClick={handleNewProject}
            disabled={newProject || editingProject}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {newProject && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">New 3-Stage Project</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectForm
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onCancel={handleCancel}
                saving={saving}
                isNew
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id}>
              {editingProject === project.id ? (
                <Card>
                  <CardContent className="p-6">
                    <ProjectForm
                      formData={formData}
                      setFormData={setFormData}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      saving={saving}
                    />
                  </CardContent>
                </Card>
              ) : (
                <ProjectCard
                  project={project}
                  onEdit={handleEdit}
                  onRefetch={refetch}
                  editingProject={editingProject}
                  newProject={newProject}
                />
              )}
            </div>
          ))}
        </div>

        {projects.length === 0 && !newProject && (
          <div className="text-center py-8 text-muted-foreground">
            No projects configured yet. Add your first 3-stage project to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectManagement;
