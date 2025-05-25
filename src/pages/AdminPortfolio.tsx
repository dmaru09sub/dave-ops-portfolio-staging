
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import PortfolioForm from '@/components/admin/portfolio/portfolio-form';
import PortfolioTable from '@/components/admin/portfolio/portfolio-table';
import { usePortfolioManagement } from '@/components/admin/portfolio/use-portfolio-management';

const AdminPortfolio = () => {
  const {
    projects,
    loading,
    editingProject,
    isCreating,
    formData,
    setFormData,
    setIsCreating,
    handleSubmit,
    handleEdit,
    handleDelete,
    togglePublished,
    resetForm
  } = usePortfolioManagement();

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
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                isEditing={!!editingProject}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your portfolio projects</CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublished={togglePublished}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPortfolio;
