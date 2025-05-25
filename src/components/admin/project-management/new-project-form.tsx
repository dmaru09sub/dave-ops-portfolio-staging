
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../project-form';
import type { Project } from './types';

interface NewProjectFormProps {
  formData: Partial<Project>;
  saving: boolean;
  setFormData: (data: Partial<Project>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  formData,
  saving,
  setFormData,
  onSave,
  onCancel
}) => {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">New 3-Stage Project</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectForm
          formData={formData}
          setFormData={setFormData}
          onSave={onSave}
          onCancel={onCancel}
          saving={saving}
          isNew
        />
      </CardContent>
    </Card>
  );
};

export default NewProjectForm;
