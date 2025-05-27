
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ViewLiveSiteButton from '@/components/admin/view-live-site-button';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useTutorialManagement } from '@/hooks/use-tutorial-management';
import { useTutorialSeriesManagement } from '@/hooks/use-tutorial-series-management';
import TutorialForm from '@/components/admin/tutorials/tutorial-form';
import TutorialTable from '@/components/admin/tutorials/tutorial-table';
import TutorialSeriesForm from '@/components/admin/tutorial-series/tutorial-series-form';
import TutorialSeriesTable from '@/components/admin/tutorial-series/tutorial-series-table';

const AdminTutorials = () => {
  const [activeTab, setActiveTab] = useState('series');
  
  // Individual tutorials management
  const {
    tutorials,
    loading: tutorialsLoading,
    formData: tutorialFormData,
    setFormData: setTutorialFormData,
    isCreating: isCreatingTutorial,
    editingTutorial,
    handleSubmit: handleTutorialSubmit,
    handleEdit: handleTutorialEdit,
    handleDelete: handleTutorialDelete,
    togglePublished: toggleTutorialPublished,
    resetForm: resetTutorialForm,
    startCreating: startCreatingTutorial
  } = useTutorialManagement();

  // Tutorial series management
  const {
    tutorialSeries,
    loading: seriesLoading,
    formData: seriesFormData,
    setFormData: setSeriesFormData,
    isCreating: isCreatingSeries,
    editingSeries,
    handleSubmit: handleSeriesSubmit,
    handleEdit: handleSeriesEdit,
    handleDelete: handleSeriesDelete,
    handleTogglePublished: toggleSeriesPublished,
    resetForm: resetSeriesForm,
    startCreating: startCreatingSeries
  } = useTutorialSeriesManagement();

  const loading = tutorialsLoading || seriesLoading;

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
              Manage tutorial series and individual tutorials including CI/CD pipeline guides and DevOps content
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ViewLiveSiteButton />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="series">Tutorial Series</TabsTrigger>
            <TabsTrigger value="individual">Individual Tutorials</TabsTrigger>
          </TabsList>

          <TabsContent value="series" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Tutorial Series</h2>
              <Button onClick={startCreatingSeries}>
                <Plus className="h-4 w-4 mr-2" />
                Add Tutorial Series
              </Button>
            </div>

            {isCreatingSeries && (
              <TutorialSeriesForm
                formData={seriesFormData}
                setFormData={setSeriesFormData}
                onSubmit={handleSeriesSubmit}
                onCancel={resetSeriesForm}
                isEditing={!!editingSeries}
              />
            )}

            <TutorialSeriesTable
              tutorialSeries={tutorialSeries}
              onEdit={handleSeriesEdit}
              onDelete={handleSeriesDelete}
              onTogglePublished={toggleSeriesPublished}
            />
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Individual Tutorials</h2>
              <Button onClick={startCreatingTutorial}>
                <Plus className="h-4 w-4 mr-2" />
                Add Individual Tutorial
              </Button>
            </div>

            {isCreatingTutorial && (
              <TutorialForm
                formData={tutorialFormData}
                setFormData={setTutorialFormData}
                onSubmit={handleTutorialSubmit}
                onCancel={resetTutorialForm}
                isEditing={!!editingTutorial}
              />
            )}

            <TutorialTable
              tutorials={tutorials}
              onEdit={handleTutorialEdit}
              onDelete={handleTutorialDelete}
              onTogglePublished={toggleTutorialPublished}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminTutorials;
