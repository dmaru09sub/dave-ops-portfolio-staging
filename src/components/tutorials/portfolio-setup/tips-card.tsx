
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TipsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tips & Best Practices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-600 text-sm">Repository Naming</h4>
          <p className="text-xs text-muted-foreground">
            Use clear, consistent naming for your repositories: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">yourname-portfolio-dev</code>, 
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">yourname-portfolio-stage</code>, <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">yourname.github.io</code>
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-yellow-600 text-sm">Environment Variables</h4>
          <p className="text-xs text-muted-foreground">
            Keep your Supabase keys and other secrets secure. Use GitHub Secrets for CI/CD workflows.
          </p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-green-600 text-sm">Version Control</h4>
          <p className="text-xs text-muted-foreground">
            Commit regularly with clear messages. Use branches for features and keep main branch stable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
