
import React from 'react';
import { TutorialStep } from './tutorial-step';

export const DependenciesStep = () => {
  return (
    <TutorialStep stepNumber={3} title="Install Essential Dependencies">
      <p className="text-sm text-muted-foreground">
        Install the core dependencies for a modern portfolio:
      </p>
      
      <div className="bg-gray-100 p-3 rounded-md space-y-2 overflow-x-auto">
        <div><code className="text-sm whitespace-nowrap">npm install react-router-dom</code></div>
        <div><code className="text-sm whitespace-nowrap">npm install @supabase/supabase-js</code></div>
        <div><code className="text-sm whitespace-nowrap">npm install @tanstack/react-query</code></div>
        <div><code className="text-sm whitespace-nowrap">npm install tailwindcss</code></div>
        <div><code className="text-sm whitespace-nowrap">npm install lucide-react</code></div>
        <div><code className="text-sm whitespace-nowrap">npm install date-fns</code></div>
      </div>
    </TutorialStep>
  );
};
