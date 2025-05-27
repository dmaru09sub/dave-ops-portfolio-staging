
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Project } from '../types';

interface ProjectSettingsSectionProps {
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
}

const ProjectSettingsSection: React.FC<ProjectSettingsSectionProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stage_branch">Stage Branch</Label>
          <Input
            id="stage_branch"
            value={formData.stage_branch || 'main'}
            onChange={(e) => setFormData({ ...formData, stage_branch: e.target.value })}
            placeholder="main"
          />
        </div>
        <div>
          <Label htmlFor="prod_branch">Production Branch</Label>
          <Input
            id="prod_branch"
            value={formData.prod_branch || 'main'}
            onChange={(e) => setFormData({ ...formData, prod_branch: e.target.value })}
            placeholder="main"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={Boolean(formData.active)}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label htmlFor="active">Active</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="is_source_private"
            checked={Boolean(formData.is_source_private)}
            onCheckedChange={(checked) => setFormData({ ...formData, is_source_private: checked })}
          />
          <Label htmlFor="is_source_private">Source Repository is Private</Label>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettingsSection;
