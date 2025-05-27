
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

export const ContactInfoSection = () => {
  const contactMethods = [
    {
      icon: Github,
      label: 'GitHub',
      value: '@dave-ops',
      href: 'https://github.com/dmaru09sub',
      color: 'hover:text-gray-900'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: 'https://www.linkedin.com/in/david-marusiak-a899a8198/',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      value: '@daveops_net',
      href: '',
      color: 'hover:text-blue-400'
    },
    {
      icon: Globe,
      label: 'Portfolio',
      value: 'dave-ops.net',
      href: 'https://dave-ops.net',
      color: 'hover:text-primary'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Other Ways to Connect</h2>
        <p className="text-muted-foreground">
          Prefer social media or want to check out my work? Find me here:
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods.map((method) => (
          <Card key={method.label} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <a
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 text-muted-foreground transition-colors duration-200 ${method.color}`}
              >
                <method.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{method.label}</div>
                  <div className="text-sm">{method.value}</div>
                </div>
              </a>
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
