
import React from 'react';
import { useParams } from 'react-router-dom';
import { SiteHeader } from '@/components/site-header';
import MainLayout from '@/components/layouts/main-layout';
import TutorialSeriesNavigation from '@/components/tutorials/tutorial-series-navigation';
import CICDTutorial from './CICDTutorial';

const EnhancedTutorials = () => {
  const { tutorialId } = useParams();

  const renderTutorialContent = () => {
    switch (tutorialId) {
      case 'cicd-pipeline':
        return <CICDTutorial />;
      case 'portfolio-setup':
        return <PortfolioSetupTutorial />;
      case 'project-initialization':
        return <ProjectInitializationTutorial />;
      default:
        return <TutorialSeriesNavigation currentTutorialId={tutorialId} />;
    }
  };

  if (tutorialId) {
    return renderTutorialContent();
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <TutorialSeriesNavigation />
      </div>
    </MainLayout>
  );
};

// Placeholder components for new tutorials
const PortfolioSetupTutorial = () => (
  <MainLayout>
    <SiteHeader />
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Setting Up Your Portfolio Project</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Learn how to create your own version of this DevOps portfolio system
        </p>
        {}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p>This tutorial will explain:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>How the project validation system works</li>
            <li>Automated workflow file generation</li>
            <li>GitHub secrets configuration</li>
            <li>Troubleshooting common initialization issues</li>
          </ul>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default EnhancedTutorials;
