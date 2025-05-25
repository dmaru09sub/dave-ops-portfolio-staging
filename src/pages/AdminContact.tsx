
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactSubmissionsTable from '@/components/admin/contact-submissions-table';
import ContactMessageDetails from '@/components/admin/contact-message-details';
import { useContactSubmissions } from '@/hooks/use-contact-submissions';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  created_at: string;
}

const AdminContact = () => {
  const {
    submissions,
    loading,
    markAsRead,
    markAsReplied,
    deleteSubmission
  } = useContactSubmissions();
  
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const handleRowClick = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    if (!submission.read) {
      markAsRead(submission.id);
    }
  };

  const handleMarkAsReplied = (id: string) => {
    markAsReplied(id);
  };

  const handleDelete = (id: string) => {
    deleteSubmission(id);
    setSelectedSubmission(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString();
  };

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
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage contact form submissions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  {submissions.filter(s => !s.read).length} unread messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactSubmissionsTable
                  submissions={submissions}
                  onRowClick={handleRowClick}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <ContactMessageDetails
              submission={selectedSubmission}
              onClose={() => setSelectedSubmission(null)}
              onMarkAsReplied={handleMarkAsReplied}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContact;
