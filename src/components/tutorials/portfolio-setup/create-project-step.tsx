
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { TutorialStep } from './tutorial-step';

export const CreateProjectStep = () => {
  return (
    <TutorialStep stepNumber={1} title="Create Your Portfolio Project">
      <div className="space-y-3">
        <h4 className="font-semibold text-base">Option A: Fork This Repository</h4>
        <p className="text-sm text-muted-foreground">
          Fork the Dave-Ops portfolio repository to get started with a complete setup:
        </p>
        <Button variant="outline" size="sm" asChild className="w-fit">
          <a
            href="https://github.com/dmaru09sub/dave-ops-portfolio-staging"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            Fork Dave-Ops Portfolio
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>

      <div className="border-t pt-4 space-y-3">
        <h4 className="font-semibold text-base">Option B: Create from Scratch</h4>
        <p className="text-sm text-muted-foreground">
          Start with a fresh React + TypeScript + Vite project:
        </p>
        <div className="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <code className="text-sm whitespace-nowrap">
            npm create vite@latest my-portfolio -- --template react-ts
          </code>
        </div>
      </div>
    </TutorialStep>
  );
};
