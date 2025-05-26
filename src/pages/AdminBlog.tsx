
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useBlogManagement } from '@/hooks/use-blog-management';
import BlogForm from '@/components/admin/blog/blog-form';
import BlogTable from '@/components/admin/blog/blog-table';

const AdminBlog = () => {
  const {
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
  } = useBlogManagement();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button onClick={startCreating}>
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Button>
        </div>

        {isCreating && (
          <BlogForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingPost}
          />
        )}

        <BlogTable
          blogPosts={blogPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublished={togglePublished}
          onToggleFeatured={toggleFeatured}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
