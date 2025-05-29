
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Youtube, Globe, Mail, ExternalLink } from 'lucide-react';
import { useSiteInfo } from '@/hooks/use-site-info';

export const EnhancedContactInfoSection = () => {
  const { siteInfo } = useSiteInfo();

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: siteInfo.contact_email || 'admin@dave-ops.net',
      href: `mailto:${siteInfo.contact_email || 'admin@dave-ops.net'}`,
      color: 'hover:text-blue-600',
      show: !!siteInfo.contact_email
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@dave-ops',
      href: siteInfo.github_url || 'https://github.com/dmaru09sub',
      color: 'hover:text-gray-900',
      show: true
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: siteInfo.linkedin_url || '#',
      color: 'hover:text-blue-600',
      show: !!siteInfo.linkedin_url
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@daveops_net',
      href: siteInfo.twitter_url || '#',
      color: 'hover:text-blue-400',
      show: !!siteInfo.twitter_url
    },
    {
      icon: Youtube,
      label: 'YouTube',
      value: 'Tutorials & Content',
      href: siteInfo.youtube_url || '#',
      color: 'hover:text-red-600',
      show: !!siteInfo.youtube_url
    },
    {
      icon: Globe,
      label: 'Portfolio',
      value: siteInfo.site_title || 'dave-ops.net',
      href: window.location.origin,
      color: 'hover:text-primary',
      show: true
    }
  ].filter(method => method.show && method.href !== '#');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
        <p className="text-muted-foreground">
          Prefer social media or want to check out my work? Find me here:
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {contactMethods.map((method) => (
          <Card key={method.label} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full justify-start h-auto p-0"
                asChild
              >
                <a
                  href={method.href}
                  target={method.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 text-muted-foreground transition-colors duration-200 ${method.color}`}
                >
                  <method.icon className="w-5 h-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{method.label}</div>
                    <div className="text-sm opacity-75">{method.value}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Response Time</h3>
          <p className="text-sm text-muted-foreground">
            I typically respond to inquiries within 24 hours during business days.
            For urgent matters, please mention it in your subject line.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
