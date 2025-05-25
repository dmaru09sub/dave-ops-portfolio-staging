
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PortfolioForm from './portfolio-form';

interface PortfolioFormData {
  title: string;
  description: string;
  long_description: string;
  technologies: string;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

interface PortfolioEditorProps {
  formData: PortfolioFormData;
  setFormData: (data: PortfolioFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Project' : 'Create New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <PortfolioForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isEditing={isEditing}
        />
      </CardContent>
    </Card>
  );
};

export default PortfolioEditor;
