
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
  is_active?: boolean;
}

export const useAboutContent = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('daveops_about_content')
        .select('*')
        .eq('published', true)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (fetchError) throw fetchError;
      setAboutContent(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch about content';
      setError(errorMessage);
      console.error('Error fetching about content:', err);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  return {
    aboutContent,
    loading,
    error,
    refetch: fetchAboutContent
  };
};
