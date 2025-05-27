
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Twitter, Youtube, ExternalLink } from "lucide-react";

interface EnhancedContactInfoProps {
  siteInfo: Record<string, string>;
}

export const EnhancedContactInfo = ({ siteInfo }: EnhancedContactInfoProps) => {
  const contactLinks = [
    {
      key: 'contact_email',
      label: 'Email',
      icon: Mail,
      href: siteInfo.contact_email ? `mailto:${siteInfo.contact_email}` : null,
      value: siteInfo.contact_email
    },
    {
      key: 'github_url',
      label: 'GitHub',
      icon: Github,
      href: siteInfo.github_url,
      value: siteInfo.github_url ? 'GitHub Profile' : null
    },
    {
      key: 'linkedin_url',
      label: 'LinkedIn',
      icon: Linkedin,
      href: siteInfo.linkedin_url,
      value: siteInfo.linkedin_url ? 'LinkedIn Profile' : null
    },
    {
      key: 'twitter_url',
      label: 'Twitter',
      icon: Twitter,
      href: siteInfo.twitter_url,
      value: siteInfo.twitter_url ? 'Twitter Profile' : null
    },
    {
      key: 'youtube_url',
      label: 'YouTube',
      icon: Youtube,
      href: siteInfo.youtube_url,
      value: siteInfo.youtube_url ? 'YouTube Channel' : null
    }
  ].filter(link => link.value); // Only show links that have values

  if (contactLinks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Get in Touch
          </CardTitle>
          <CardDescription>
            Contact information will appear here once configured
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Get in Touch
        </CardTitle>
        <CardDescription>
          Connect with me on various platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {contactLinks.map((link) => {
          const Icon = link.icon;
          
          if (!link.href) {
            return (
              <Badge key={link.key} variant="outline" className="flex items-center gap-2 px-3 py-2">
                <Icon className="w-4 h-4" />
                {link.value}
              </Badge>
            );
          }

          return (
            <Button
              key={link.key}
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <Icon className="w-4 h-4" />
                {link.label}
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
