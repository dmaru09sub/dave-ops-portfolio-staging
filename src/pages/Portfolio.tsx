
import React from 'react';
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import EnhancedProjectCard from "@/components/enhanced-project-card";
import { PortfolioFooter } from "@/components/portfolio-footer";
import { PortfolioSkeleton } from "@/components/loading-states/portfolio-skeleton";
import { useProjects } from "@/hooks/use-projects";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";
import { useSiteTitle } from "@/hooks/use-site-title";
import { useSiteInfo } from "@/hooks/use-site-info";

const Portfolio = () => {
  usePageViewTracking();
  useSiteTitle('Portfolio');
  const { projects, loading, error } = useProjects();
  const { siteInfo } = useSiteInfo();

  const publishedProjects = projects.filter(project => project.published);
  const featuredProjects = publishedProjects.filter(project => project.featured);
  const regularProjects = publishedProjects.filter(project => !project.featured);

  const portfolioTitle = siteInfo.portfolio_title || siteInfo.site_name || 'My Portfolio';

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <PortfolioSkeleton count={6} />
          </div>
        </div>
        <PortfolioFooter />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="text-destructive">Failed to load projects: {error}</p>
          </div>
        </div>
        <PortfolioFooter />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{portfolioTitle}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of projects showcasing modern development practices, 
              cloud architecture, and DevOps automation.
            </p>
          </div>
          
          {publishedProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                New projects are being developed and will be showcased here soon. 
                Check back regularly for updates!
              </p>
            </div>
          ) : (
            <>
              {/* Featured Projects */}
              {featuredProjects.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-semibold mb-8 text-center">Featured Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project) => (
                      <EnhancedProjectCard 
                        key={project.id} 
                        project={project} 
                        variant="detailed"
                        showFeatured={false}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Regular Projects */}
              {regularProjects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-8 text-center">
                    {featuredProjects.length > 0 ? 'Other Projects' : 'Projects'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularProjects.map((project) => (
                      <EnhancedProjectCard 
                        key={project.id} 
                        project={project}
                        variant="default"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <PortfolioFooter />
    </MainLayout>
  );
};

export default Portfolio;
