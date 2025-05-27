
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitBranch } from 'lucide-react';
import type { Project } from '../types';

interface RepositoryConfigSectionProps {
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
}

const RepositoryConfigSection: React.FC<RepositoryConfigSectionProps> = ({ formData, setFormData }) => {
  return (
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
  );
};

export default RepositoryConfigSection;
