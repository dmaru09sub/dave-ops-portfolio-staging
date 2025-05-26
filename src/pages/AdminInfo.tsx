
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import ViewLiveSiteButton from '@/components/admin/view-live-site-button';
import { Button } from '@/components/ui/button';
import { useSiteInfo } from '@/hooks/use-site-info';
import { Save } from 'lucide-react';
import BasicInfoSection from '@/components/admin/site-info/basic-info-section';
import SocialLinksSection from '@/components/admin/site-info/social-links-section';
import SiteInfoPreview from '@/components/admin/site-info/site-info-preview';

const AdminInfo = () => {
  const {
    siteInfo,
    loading,
    saving,
    handleSave,
    handleInputChange
  } = useSiteInfo();

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
            <h1 className="text-3xl font-bold">Site Information</h1>
            <p className="text-muted-foreground">
              Manage your site's basic information and social links
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ViewLiveSiteButton />
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BasicInfoSection 
            siteInfo={siteInfo}
            onInputChange={handleInputChange}
          />
          <SocialLinksSection 
            siteInfo={siteInfo}
            onInputChange={handleInputChange}
          />
        </div>

        <SiteInfoPreview siteInfo={siteInfo} />
      </div>
    </AdminLayout>
  );
};

export default AdminInfo;
