
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { AboutHero } from "@/components/about/about-hero";
import { EnhancedAboutContent } from "@/components/about/enhanced-about-content";
import { EnhancedContactInfo } from "@/components/about/enhanced-contact-info";
import { PortfolioFooter } from "@/components/portfolio-footer";
import { useAboutData } from "@/hooks/use-about-data";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";
import { useSiteTitle } from "@/hooks/use-site-title";

const About = () => {
  usePageViewTracking();
  useSiteTitle('About');
  const { aboutContent, siteInfo, loading } = useAboutData();

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-96 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="lg:col-span-1">
                  <div className="h-64 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
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
        <div className="max-w-4xl mx-auto">
          <AboutHero />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EnhancedAboutContent />



            </div>
            <div className="lg:col-span-1">
              <EnhancedContactInfo siteInfo={siteInfo} />
            </div>
          </div>
        </div>
      </div>

      <PortfolioFooter />
    </MainLayout>
  );
};

export default About;
