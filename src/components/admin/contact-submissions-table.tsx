
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Mail, MailOpen, Trash, ExternalLink } from 'lucide-react';

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

interface ContactSubmissionsTableProps {
  submissions: ContactSubmission[];
  onRowClick: (submission: ContactSubmission) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const ContactSubmissionsTable: React.FC<ContactSubmissionsTableProps> = ({
  submissions,
  onRowClick,
  onDelete,
  formatDate
}) => {
  const handleReplyClick = (submission: ContactSubmission) => {
    window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}&body=Hi ${submission.name},%0D%0A%0D%0A`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions.map((submission) => (
          <TableRow 
            key={submission.id}
            className={`cursor-pointer hover:bg-accent ${!submission.read ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
            onClick={() => onRowClick(submission)}
          >
            <TableCell>
              {submission.read ? (
                <MailOpen className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Mail className="h-4 w-4 text-blue-600" />
              )}
            </TableCell>
            <TableCell className="font-medium">
              {submission.name}
            </TableCell>
            <TableCell>
              {submission.subject || 'No subject'}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(submission.created_at)}
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                submission.replied 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : submission.read
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {submission.replied ? 'Replied' : submission.read ? 'Read' : 'Unread'}
              </span>
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReplyClick(submission)}
                  title="Reply via email"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(submission.id)}
                  title="Delete"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactSubmissionsTable;
