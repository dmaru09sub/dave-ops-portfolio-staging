
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Workflow } from 'lucide-react';
import type { Project } from '../types';

interface WorkflowConfigSectionProps {
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
}

const WorkflowConfigSection: React.FC<WorkflowConfigSectionProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium flex items-center gap-2">
        <Workflow className="h-4 w-4" />
        Workflow Configuration
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
        <div>
          <Label htmlFor="github_workflow_file">DEV → STAGE Workflow</Label>
          <Select
            value={formData.github_workflow_file || ''}
            onValueChange={(value) => setFormData({ ...formData, github_workflow_file: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select workflow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clean-and-deploy.yml">clean-and-deploy.yml (Clean Lovable + Deploy)</SelectItem>
              <SelectItem value="deploy-portfolio.yml">deploy-portfolio.yml (Legacy Portfolio)</SelectItem>
              <SelectItem value="custom.yml">custom.yml (Custom Workflow)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">
            Workflow that removes Lovable references and deploys clean source to STAGE
          </p>
        </div>
        
        <div>
          <Label htmlFor="build_command">Build Command</Label>
          <Input
            id="build_command"
            value={formData.build_command || 'npm run build'}
            onChange={(e) => setFormData({ ...formData, build_command: e.target.value })}
            placeholder="npm run build"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Command used to build static files for production
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkflowConfigSection;
