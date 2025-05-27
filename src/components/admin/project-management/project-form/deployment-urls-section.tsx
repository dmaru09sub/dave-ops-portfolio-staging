
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';
import type { Project } from '../types';

interface DeploymentUrlsSectionProps {
  formData: Partial<Project>;
  setFormData: (data: Partial<Project>) => void;
}

const DeploymentUrlsSection: React.FC<DeploymentUrlsSectionProps> = ({ formData, setFormData }) => {
  return (
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
  );
};

export default DeploymentUrlsSection;
