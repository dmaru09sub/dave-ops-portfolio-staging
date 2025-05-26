
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  demo_url: string;
  github_url: string;
  image_url: string;
  technologies: any;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  live_url?: string;
  tech_stack?: string[];
  category?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  difficulty_level: string;
  estimated_duration: number;
  tags: any;
  published: boolean;
  coming_soon: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  youtube_url?: string;
  category?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  tags: any;
  featured_image: string;
  published: boolean;
  featured: boolean;
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface SiteInfo {
  id: string;
  setting_key: string;
  setting_value: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
  updated_at: string;
}

export const useDaveOpsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [siteInfo, setSiteInfo] = useState<Record<string, string>>({});
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects from the consolidated daveops_projects table
      const { data: projectsData, error: projectsError } = await supabase
        .from('daveops_projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (projectsError) throw projectsError;
      setProjects(projectsData as Project[] || []);

      // Fetch tutorials
      const { data: tutorialsData, error: tutorialsError } = await supabase
        .from('daveops_tutorials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (tutorialsError) throw tutorialsError;
      setTutorials(tutorialsData as Tutorial[] || []);

      // Fetch blog posts with type assertion
      try {
        const { data: blogData, error: blogError } = await (supabase as any)
          .from('daveops_blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (blogError) {
          console.warn('Blog posts error:', blogError);
          setBlogPosts([]);
        } else {
          setBlogPosts(blogData || []);
        }
      } catch (blogErr) {
        console.warn('Blog posts not available yet');
        setBlogPosts([]);
      }

      // Fetch about content
      const { data: aboutData, error: aboutError } = await supabase
        .from('daveops_about_content')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (aboutError) throw aboutError;
      setAboutContent(aboutData as AboutContent[] || []);

      // Fetch site info
      const { data: siteInfoData, error: siteInfoError } = await supabase
        .from('daveops_site_info')
        .select('*');

      if (siteInfoError) throw siteInfoError;
      
      const infoMap: Record<string, string> = {};
      (siteInfoData as SiteInfo[])?.forEach((item) => {
        infoMap[item.setting_key] = item.setting_value || '';
      });
      setSiteInfo(infoMap);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    projects,
    tutorials,
    blogPosts,
    siteInfo,
    aboutContent,
    loading,
    refetch: fetchData
  };
};
