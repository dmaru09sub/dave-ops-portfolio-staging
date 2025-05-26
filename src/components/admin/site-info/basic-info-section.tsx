
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoSectionProps {
  siteInfo: Record<string, string>;
  onInputChange: (key: string, value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  siteInfo,
  onInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Core site details and metadata
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="site_title">Site Title</Label>
          <Input
            id="site_title"
            value={siteInfo.site_title || ''}
            onChange={(e) => onInputChange('site_title', e.target.value)}
            placeholder="Dave-Ops.Net"
          />
        </div>

        <div>
          <Label htmlFor="site_description">Site Description</Label>
          <Textarea
            id="site_description"
            value={siteInfo.site_description || ''}
            onChange={(e) => onInputChange('site_description', e.target.value)}
            placeholder="DevOps Portfolio and Tutorials"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            type="email"
            value={siteInfo.contact_email || ''}
            onChange={(e) => onInputChange('contact_email', e.target.value)}
            placeholder="admin@dave-ops.net"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
