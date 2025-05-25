
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { User, MapPin, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
}

interface SiteInfo {
  setting_key: string;
  setting_value: string;
}

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([]);
  const [siteInfo, setSiteInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about content
        const { data: aboutData, error: aboutError } = await supabase
          .from('daveops_about_content')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true });

        if (aboutError) throw aboutError;
        setAboutContent(aboutData || []);

        // Fetch site info for contact details
        const { data: siteInfoData, error: siteInfoError } = await supabase
          .from('daveops_site_info')
          .select('setting_key, setting_value');

        if (siteInfoError) throw siteInfoError;
        
        const infoMap: Record<string, string> = {};
        (siteInfoData as SiteInfo[])?.forEach((item) => {
          infoMap[item.setting_key] = item.setting_value || '';
        });
        setSiteInfo(infoMap);

      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <div className="text-center mb-12">
            <User className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground">
              DevOps Engineer & Cloud Infrastructure Specialist
            </p>
          </div>

          <div className="space-y-8">
            {aboutContent.length > 0 ? (
              aboutContent.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">About content coming soon</h3>
                  <p className="text-muted-foreground">
                    Check back soon for more information about my background and experience.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Connect with me on various platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {siteInfo.contact_email && (
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
                      <Mail className="w-4 h-4" />
                      {siteInfo.contact_email}
                    </Badge>
                  )}
                  {siteInfo.github_url && (
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Badge>
                  )}
                  {siteInfo.linkedin_url && (
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Badge>
                  )}
                  {siteInfo.twitter_url && (
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
