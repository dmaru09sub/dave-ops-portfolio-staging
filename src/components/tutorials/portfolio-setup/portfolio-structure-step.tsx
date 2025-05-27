
import React from 'react';
import { TutorialStep } from './tutorial-step';

export const PortfolioStructureStep = () => {
  return (
    <TutorialStep stepNumber={4} title="Create Basic Portfolio Structure">
      <p className="text-sm text-muted-foreground">
        Set up your basic portfolio pages and components:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Core Pages</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Home/Landing page</li>
            <li>• About page</li>
            <li>• Portfolio/Projects page</li>
            <li>• Contact page</li>
            <li>• Admin dashboard</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Key Components</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Site header with navigation</li>
            <li>• Project cards</li>
            <li>• Contact form</li>
            <li>• Skills section</li>
            <li>• Footer</li>
          </ul>
        </div>
      </div>
    </TutorialStep>
  );
};
