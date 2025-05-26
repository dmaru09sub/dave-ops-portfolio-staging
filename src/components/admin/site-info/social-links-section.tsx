
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink } from 'lucide-react';

interface SocialLinksSectionProps {
  siteInfo: Record<string, string>;
  onInputChange: (key: string, value: string) => void;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  siteInfo,
  onInputChange
}) => {
  const socialFields = [
    {
      key: 'github_url',
      label: 'GitHub URL',
      placeholder: 'https://github.com/dmaru09sub'
    },
    {
      key: 'linkedin_url',
      label: 'LinkedIn URL',
      placeholder: 'https://linkedin.com/in/your-profile'
    },
    {
      key: 'twitter_url',
      label: 'Twitter URL',
      placeholder: 'https://twitter.com/your-handle'
    },
    {
      key: 'youtube_url',
      label: 'YouTube Channel URL',
      placeholder: 'https://youtube.com/@your-channel'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
        <CardDescription>
          Your professional social media profiles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialFields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <Label htmlFor={key}>{label}</Label>
            <div className="flex gap-2">
              <Input
                id={key}
                value={siteInfo[key] || ''}
                onChange={(e) => onInputChange(key, e.target.value)}
                placeholder={placeholder}
              />
              {siteInfo[key] && (
                <Button variant="outline" size="icon" asChild>
                  <a href={siteInfo[key]} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SocialLinksSection;
