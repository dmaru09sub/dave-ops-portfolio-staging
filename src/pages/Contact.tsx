
import MainLayout from "@/components/layouts/main-layout";
import { SiteHeader } from "@/components/site-header";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfoSection } from "@/components/contact/contact-info-section";
import { PortfolioFooter } from "@/components/portfolio-footer";
import EnhancedContactForm from "@/components/contact/enhanced-contact-form";

const Contact = () => {
  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <ContactHero />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EnhancedContactForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </div>
      
      <PortfolioFooter />
    </MainLayout>
  );
};

export default Contact;
