
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChangelogEntry {
  id: string;
  project_id: string | null;
  version: string | null;
  title: string;
  description: string | null;
  change_type: string;
  severity: string;
  github_commit_hash: string | null;
  github_commit_url: string | null;
  pull_request_number: number | null;
  pull_request_url: string | null;
  author_name: string | null;
  author_email: string | null;
  author_github_username: string | null;
  deployment_id: string | null;
  tags: any;
  metadata: any;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories: any;
  affected_files: any;
  project_name: string | null;
}

interface CreateChangelogEntry {
  title: string;
  description?: string;
  change_type?: string;
  severity?: string;
  project_id?: string;
  github_commit_hash?: string;
  github_commit_url?: string;
  pull_request_number?: number;
  pull_request_url?: string;
  author_name?: string;
  author_email?: string;
  author_github_username?: string;
  deployment_id?: string;
  version?: string;
  tags?: any;
  metadata?: any;
  published?: boolean;
}

export const useChangelog = (projectId?: string) => {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_changelog_entries_with_categories', {
        project_id_param: projectId || null,
        limit_param: 50,
        offset_param: 0
      });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      console.error('Error fetching changelog entries:', error);
      toast({
        title: 'Error',
        description: 'Failed to load changelog entries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entry: CreateChangelogEntry) => {
    try {
      if (!entry.title) {
        throw new Error('Title is required for changelog entry');
      }

      const { error } = await supabase
        .from('daveops_changelog_entries')
        .insert([entry]);

      if (error) throw error;
      
      toast({
        title: 'Changelog Entry Created',
        description: 'New changelog entry has been added successfully.',
      });
      
      fetchEntries();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create changelog entry',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [projectId]);

  return {
    entries,
    loading,
    refetch: fetchEntries,
    createEntry
  };
};
