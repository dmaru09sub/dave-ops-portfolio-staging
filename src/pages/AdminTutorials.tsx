
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ViewLiveSiteButton from '@/components/admin/view-live-site-button';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTutorialManagement } from '@/hooks/use-tutorial-management';
import TutorialForm from '@/components/admin/tutorials/tutorial-form';
import TutorialTable from '@/components/admin/tutorials/tutorial-table';

const AdminTutorials = () => {
  const {
    tutorials,
    loading,
    formData,
    setFormData,
    isCreating,
    editingTutorial,
    handleSubmit,
    handleEdit,
    handleDelete,
    togglePublished,
    resetForm,
    startCreating
  } = useTutorialManagement();

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
            <h1 className="text-3xl font-bold">Tutorials Management</h1>
            <p className="text-muted-foreground">
              Manage tutorials including CI/CD pipeline guides and DevOps content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ViewLiveSiteButton />
            <Button onClick={startCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tutorial
            </Button>
          </div>
        </div>

        {isCreating && (
          <TutorialForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            isEditing={!!editingTutorial}
          />
        )}

        <TutorialTable
          tutorials={tutorials}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublished={togglePublished}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminTutorials;
