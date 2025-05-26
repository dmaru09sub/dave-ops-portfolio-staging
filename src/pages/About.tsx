
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { AboutHero } from "@/components/about/about-hero";
import { AboutContent } from "@/components/about/about-content";
import { ContactInfo } from "@/components/about/contact-info";
import { useAboutData } from "@/hooks/use-about-data";

const About = () => {
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
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <AboutHero />
          <div className="space-y-8">
            <AboutContent aboutContent={aboutContent} />
            <ContactInfo siteInfo={siteInfo} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
