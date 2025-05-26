
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
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

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  tags: string;
  featured_image: string;
  published: boolean;
  featured: boolean;
  slug: string;
  read_time: number;
}

export const useBlogOperations = () => {
  const { toast } = useToast();

  const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    try {
      const { data, error } = await (supabase as any)
        .from('daveops_blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching blog posts:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  };

  const saveBlogPost = async (formData: BlogFormData, editingPost?: BlogPost | null) => {
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingPost) {
        const { error } = await (supabase as any)
          .from('daveops_blog_posts')
          .update(blogData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        const { error } = await (supabase as any)
          .from('daveops_blog_posts')
          .insert([blogData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post created successfully' });
      }
      return true;
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return false;

    try {
      const { error } = await (supabase as any)
        .from('daveops_blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Blog post deleted successfully' });
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive'
      });
      return false;
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await (supabase as any)
        .from('daveops_blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error toggling published status:', error);
      return false;
    }
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      const { error } = await (supabase as any)
        .from('daveops_blog_posts')
        .update({ featured: !post.featured })
        .eq('id', post.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error toggling featured status:', error);
      return false;
    }
  };

  return {
    fetchBlogPosts,
    saveBlogPost,
    deleteBlogPost,
    togglePublished,
    toggleFeatured
  };
};
