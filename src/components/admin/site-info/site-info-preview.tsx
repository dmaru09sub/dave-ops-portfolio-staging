
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SiteInfoPreviewProps {
  siteInfo: Record<string, string>;
}

const SiteInfoPreview: React.FC<SiteInfoPreviewProps> = ({ siteInfo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>
          How your information appears across the site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold text-lg">{siteInfo.site_title || 'Site Title'}</h3>
          <p className="text-muted-foreground mb-2">
            {siteInfo.site_description || 'Site description will appear here'}
          </p>
          <p className="text-sm">
            Contact: {siteInfo.contact_email || 'contact@example.com'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteInfoPreview;
