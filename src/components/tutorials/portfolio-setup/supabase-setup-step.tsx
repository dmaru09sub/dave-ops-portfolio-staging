
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, Globe } from 'lucide-react';
import { TutorialStep } from './tutorial-step';

export const SupabaseSetupStep = () => {
  return (
    <TutorialStep stepNumber={5} title="Set Up Supabase Backend">
      <p className="text-sm text-muted-foreground">
        Create a Supabase project for data management and authentication:
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-sm">Create a new project at supabase.com</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-sm">Configure authentication providers</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-sm">Set up basic tables for portfolio data</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-sm">Configure Row Level Security (RLS)</span>
        </div>
      </div>

      <Button variant="outline" size="sm" asChild className="w-fit">
        <a
          href="https://supabase.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Create Supabase Project
          <ExternalLink className="h-3 w-3" />
        </a>
      </Button>
    </TutorialStep>
  );
};
