
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ViewLiveSiteButton from '@/components/admin/view-live-site-button';
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
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage blog posts for your portfolio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ViewLiveSiteButton />
            <Button onClick={startCreating} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Blog Post
            </Button>
          </div>
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

        {!loading && blogPosts.length === 0 && !isCreating && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first blog post</p>
            <Button onClick={startCreating}>Create Blog Post</Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
