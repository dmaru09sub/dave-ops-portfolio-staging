
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
}

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch contact submissions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daveops_contact_submissions')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      fetchSubmissions();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAsReplied = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daveops_contact_submissions')
        .update({ replied: true, read: true })
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Marked as replied' });
      fetchSubmissions();
    } catch (error) {
      console.error('Error marking as replied:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive'
      });
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const { error } = await supabase
        .from('daveops_contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Submission deleted successfully' });
      fetchSubmissions();
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete submission',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return {
    submissions,
    loading,
    markAsRead,
    markAsReplied,
    deleteSubmission,
    fetchSubmissions
  };
};
