
import React from 'react';
import BasicInfoSection from './project-management/project-form/basic-info-section';
import RepositoryConfigSection from './project-management/project-form/repository-config-section';
import WorkflowConfigSection from './project-management/project-form/workflow-config-section';
import DeploymentUrlsSection from './project-management/project-form/deployment-urls-section';
import ProjectSettingsSection from './project-management/project-form/project-settings-section';
import FormActions from './project-management/project-form/form-actions';
import type { Project } from './project-management/types';

interface ProjectFormProps {
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSave,
  onCancel,
  saving,
  isNew = false
}) => {
  return (
    <div className="space-y-6">
      <BasicInfoSection formData={formData} setFormData={setFormData} />
      <RepositoryConfigSection formData={formData} setFormData={setFormData} />
      <WorkflowConfigSection formData={formData} setFormData={setFormData} />
      <DeploymentUrlsSection formData={formData} setFormData={setFormData} />
      <ProjectSettingsSection formData={formData} setFormData={setFormData} />
      <FormActions saving={saving} onSave={onSave} onCancel={onCancel} />
    </div>
  );
};

export default ProjectForm;
