
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';
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
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>
          Configure a new project for the 3-stage deployment pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Portfolio Project"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="project_type">Project Type</Label>
            <Select
              value={formData.project_type || 'react'}
              onValueChange={(value) => setFormData({ ...formData, project_type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="static">Static</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the project"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="source_repo">Source Repository *</Label>
          <Input
            id="source_repo"
            value={formData.source_repo || ''}
            onChange={(e) => setFormData({ ...formData, source_repo: e.target.value })}
            placeholder="username/repository-name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stage_repo">Stage Repository</Label>
            <Input
              id="stage_repo"
              value={formData.stage_repo || ''}
              onChange={(e) => setFormData({ ...formData, stage_repo: e.target.value })}
              placeholder="username/repository-stage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prod_repo">Production Repository</Label>
            <Input
              id="prod_repo"
              value={formData.prod_repo || ''}
              onChange={(e) => setFormData({ ...formData, prod_repo: e.target.value })}
              placeholder="username/repository-prod"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="build_command">Build Command</Label>
            <Input
              id="build_command"
              value={formData.build_command || 'npm run build'}
              onChange={(e) => setFormData({ ...formData, build_command: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_workflow_file">Workflow File</Label>
            <Input
              id="github_workflow_file"
              value={formData.github_workflow_file || 'clean-and-deploy.yml'}
              onChange={(e) => setFormData({ ...formData, github_workflow_file: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_source_private"
            checked={formData.is_source_private || false}
            onCheckedChange={(checked) => setFormData({ ...formData, is_source_private: checked })}
          />
          <Label htmlFor="is_source_private">Source repository is private</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={formData.active !== false}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label htmlFor="active">Project is active</Label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Project'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewProjectForm;
