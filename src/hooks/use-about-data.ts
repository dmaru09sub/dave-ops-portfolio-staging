
import { useState, useEffect } from 'react';
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

export const useAboutData = () => {
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

  return { aboutContent, siteInfo, loading };
};
