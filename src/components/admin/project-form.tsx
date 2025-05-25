
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X, GitBranch, Globe, Workflow } from 'lucide-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="My Project"
          />
        </div>
        <div>
          <Label htmlFor="project_type">Project Type</Label>
          <Select
            value={formData.project_type || ''}
            onValueChange={(value) => setFormData({ ...formData, project_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue.js</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="static">Static HTML</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the project"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          3-Stage Repository Configuration
        </h4>
        
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-blue-50/30">
          <div>
            <Label htmlFor="source_repo">DEV Repository (Source)</Label>
            <Input
              id="source_repo"
              value={formData.source_repo || ''}
              onChange={(e) => setFormData({ ...formData, source_repo: e.target.value })}
              placeholder="username/dev-repository-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Primary development repository (usually private, contains Lovable references)
            </p>
          </div>

          <div>
            <Label htmlFor="stage_repo">STAGE Repository</Label>
            <Input
              id="stage_repo"
              value={formData.stage_repo || ''}
              onChange={(e) => setFormData({ ...formData, stage_repo: e.target.value })}
              placeholder="username/stage-repository-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Public staging repository with cleaned source code (no Lovable references)
            </p>
          </div>

          <div>
            <Label htmlFor="prod_repo">PROD Repository</Label>
            <Input
              id="prod_repo"
              value={formData.prod_repo || ''}
              onChange={(e) => setFormData({ ...formData, prod_repo: e.target.value })}
              placeholder="username/prod-repository-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Public production repository with built static files for GitHub Pages
            </p>
          </div>
        </div>
      </div>

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

      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Deployment URLs
        </h4>
        
        <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg bg-green-50/30">
          <div>
            <Label htmlFor="stage_url">Stage URL</Label>
            <Input
              id="stage_url"
              value={formData.stage_url || ''}
              onChange={(e) => setFormData({ ...formData, stage_url: e.target.value })}
              placeholder="https://username.github.io/stage-repo"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL where cleaned source code is deployed for testing
            </p>
          </div>

          <div>
            <Label htmlFor="prod_url">Production URL</Label>
            <Input
              id="prod_url"
              value={formData.prod_url || ''}
              onChange={(e) => setFormData({ ...formData, prod_url: e.target.value })}
              placeholder="https://username.github.io/prod-repo"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Final production URL where static build is hosted
            </p>
          </div>

          <div>
            <Label htmlFor="deployment_url">Legacy URL (Backward Compatibility)</Label>
            <Input
              id="deployment_url"
              value={formData.deployment_url || ''}
              onChange={(e) => setFormData({ ...formData, deployment_url: e.target.value })}
              placeholder="https://username.github.io/repo"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Legacy deployment URL for backward compatibility
            </p>
          </div>
        </div>
      </div>

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

      <div className="flex gap-2">
        <Button onClick={onSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;
