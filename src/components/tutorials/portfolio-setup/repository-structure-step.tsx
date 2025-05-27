
import React from 'react';
import { Github } from 'lucide-react';
import { TutorialStep } from './tutorial-step';

export const RepositoryStructureStep = () => {
  return (
    <TutorialStep stepNumber={2} title="Repository Structure Setup">
      <p className="text-sm text-muted-foreground">
        Set up your repository structure for the 3-stage deployment pipeline:
      </p>
      
      <div className="space-y-3">
        <div className="border rounded p-3 bg-blue-50">
          <h4 className="font-semibold text-blue-800 flex items-center gap-2 text-sm">
            <Github className="h-4 w-4 flex-shrink-0" />
            Source Repository (Private)
          </h4>
          <p className="text-xs text-blue-600 mt-1 break-all">
            <code>your-username/your-portfolio-dev</code> - Development work with Lovable integration
          </p>
        </div>
        
        <div className="border rounded p-3 bg-yellow-50">
          <h4 className="font-semibold text-yellow-800 flex items-center gap-2 text-sm">
            <Github className="h-4 w-4 flex-shrink-0" />
            Stage Repository (Public)
          </h4>
          <p className="text-xs text-yellow-600 mt-1 break-all">
            <code>your-username/your-portfolio-stage</code> - Clean code for testing
          </p>
        </div>
        
        <div className="border rounded p-3 bg-green-50">
          <h4 className="font-semibold text-green-800 flex items-center gap-2 text-sm">
            <Github className="h-4 w-4 flex-shrink-0" />
            Production Repository (Public)
          </h4>
          <p className="text-xs text-green-600 mt-1 break-all">
            <code>your-username/your-username.github.io</code> - Static files for GitHub Pages
          </p>
        </div>
      </div>
    </TutorialStep>
  );
};
