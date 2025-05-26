
import { useState } from 'react';

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

const initialFormData: BlogFormData = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
  featured_image: '',
  published: true,
  featured: false,
  slug: '',
  read_time: 5
};

export const useBlogForm = () => {
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingPost(null);
    setIsCreating(false);
  };

  const startCreating = () => {
    setIsCreating(true);
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

  return {
    formData,
    setFormData,
    editingPost,
    isCreating,
    resetForm,
    startCreating,
    handleEdit
  };
};
