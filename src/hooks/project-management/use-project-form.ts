
import { useState } from 'react';
import type { Project } from '@/components/admin/project-management/types';

export const useProjectForm = () => {
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newProject, setNewProject] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = (project: Project) => {
    setEditingProject(project.id);
    setFormData(project);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setNewProject(false);
    setFormData({});
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

  return {
    editingProject,
    newProject,
    formData,
    saving,
    setFormData,
    setSaving,
    handleEdit,
    handleCancel,
    handleNewProject
  };
};
