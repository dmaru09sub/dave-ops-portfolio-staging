
import { useState, useEffect } from 'react';
import { useBlogOperations } from './use-blog-operations';
import { useBlogForm } from './use-blog-form';

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

export const useBlogManagement = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const {
    fetchBlogPosts,
    saveBlogPost,
    deleteBlogPost,
    togglePublished,
    toggleFeatured
  } = useBlogOperations();
  
  const {
    formData,
    setFormData,
    editingPost,
    isCreating,
    resetForm,
    startCreating,
    handleEdit
  } = useBlogForm();

  const loadBlogPosts = async () => {
    setLoading(true);
    const posts = await fetchBlogPosts();
    setBlogPosts(posts);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveBlogPost(formData, editingPost);
    if (success) {
      resetForm();
      loadBlogPosts();
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteBlogPost(id);
    if (success) {
      loadBlogPosts();
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    const success = await togglePublished(post);
    if (success) {
      loadBlogPosts();
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    const success = await toggleFeatured(post);
    if (success) {
      loadBlogPosts();
    }
  };

  useEffect(() => {
    loadBlogPosts();
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
    handleDelete: handleDelete,
    togglePublished: handleTogglePublished,
    toggleFeatured: handleToggleFeatured,
    resetForm,
    startCreating
  };
};
