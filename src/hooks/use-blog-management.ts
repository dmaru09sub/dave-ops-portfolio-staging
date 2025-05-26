
import { useState, useEffect } from 'react';
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

export const useBlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    featured_image: '',
    published: true,
    featured: false,
    slug: '',
    read_time: 5
  });

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_blog_posts' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Blog posts table not found:', error);
        setBlogPosts([]);
        return;
      }
      
      // Only cast to BlogPost[] if we have valid data
      if (Array.isArray(data)) {
        setBlogPosts(data as BlogPost[]);
      } else {
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
      toast({
        title: 'Info',
        description: 'Blog posts will be available once the database is set up',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('daveops_blog_posts' as any)
          .update(blogData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        const { error } = await supabase
          .from('daveops_blog_posts' as any)
          .insert([blogData]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post created successfully' });
      }

      resetForm();
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post. Please ensure the database is properly set up.',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    const tagsArray = Array.isArray(post.tags) ? post.tags : [];
    setFormData({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content || '',
      slug: post.slug,
      tags: tagsArray.join(', '),
      featured_image: post.featured_image || '',
      published: post.published,
      featured: post.featured,
      read_time: post.read_time || 5
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('daveops_blog_posts' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Blog post deleted successfully' });
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog post',
        variant: 'destructive'
      });
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('daveops_blog_posts' as any)
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      fetchBlogPosts();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('daveops_blog_posts' as any)
        .update({ featured: !post.featured })
        .eq('id', post.id);

      if (error) throw error;
      fetchBlogPosts();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      featured_image: '',
      published: true,
      featured: false,
      slug: '',
      read_time: 5
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    blogPosts,
    loading,
    formData,
    setFormData,
    isCreating,
    editingPost,
    handleSubmit,
    handleEdit,
    handleDelete,
    togglePublished,
    toggleFeatured,
    resetForm,
    startCreating
  };
};
