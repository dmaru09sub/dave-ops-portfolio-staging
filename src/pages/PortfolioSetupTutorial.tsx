
import React from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Badge } from '@/components/ui/badge';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { PrerequisitesCard } from '@/components/tutorials/portfolio-setup/prerequisites-card';
import { OverviewCard } from '@/components/tutorials/portfolio-setup/overview-card';
import { CreateProjectStep } from '@/components/tutorials/portfolio-setup/create-project-step';
import { RepositoryStructureStep } from '@/components/tutorials/portfolio-setup/repository-structure-step';
import { DependenciesStep } from '@/components/tutorials/portfolio-setup/dependencies-step';
import { PortfolioStructureStep } from '@/components/tutorials/portfolio-setup/portfolio-structure-step';
import { SupabaseSetupStep } from '@/components/tutorials/portfolio-setup/supabase-setup-step';
import { NextStepsCard } from '@/components/tutorials/portfolio-setup/next-steps-card';
import { TipsCard } from '@/components/tutorials/portfolio-setup/tips-card';

const PortfolioSetupTutorial = () => {
  useScrollToTop();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge className="bg-blue-100 text-blue-800">Tutorial Series - Part 1</Badge>
            <h1 className="text-3xl md:text-4xl font-bold">Portfolio Project Setup</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn how to set up your own Dave-Ops style portfolio with automated CI/CD deployment pipeline
            </p>
          </div>

          {/* Prerequisites */}
          <PrerequisitesCard />

          {/* Overview */}
          <OverviewCard />

          {/* Steps */}
          <CreateProjectStep />
          <RepositoryStructureStep />
          <DependenciesStep />
          <PortfolioStructureStep />
          <SupabaseSetupStep />

          {/* Next Steps */}
          <NextStepsCard />

          {/* Tips & Best Practices */}
          <TipsCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default PortfolioSetupTutorial;
