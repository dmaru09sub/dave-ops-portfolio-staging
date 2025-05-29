
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useTutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('daveops_tutorials')
        .select('*')
        .order('sort_order', { ascending: true });

      if (fetchError) throw fetchError;
      setTutorials(data as Tutorial[] || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tutorials';
      setError(errorMessage);
      console.error('Error fetching tutorials:', err);
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
    fetchTutorials();
  }, []);

  return {
    tutorials,
    loading,
    error,
    refetch: fetchTutorials
  };
};
