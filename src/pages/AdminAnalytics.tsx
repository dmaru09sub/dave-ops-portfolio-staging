
import React from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import PageAnalytics from '@/components/admin/page-analytics';

const AdminAnalytics = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed page view statistics and user behavior insights
          </p>
        </div>
        
        <PageAnalytics />
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
