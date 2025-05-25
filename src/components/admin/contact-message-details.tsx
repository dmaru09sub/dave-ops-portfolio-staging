
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

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

interface ContactMessageDetailsProps {
  submission: ContactSubmission | null;
  onClose: () => void;
  onMarkAsReplied: (id: string) => void;
  formatDate: (dateString: string) => string;
}

const ContactMessageDetails: React.FC<ContactMessageDetailsProps> = ({
  submission,
  onClose,
  onMarkAsReplied,
  formatDate
}) => {
  if (!submission) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
          Select a message to view details
        </CardContent>
      </Card>
    );
  }

  const handleReplyClick = () => {
    window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}&body=Hi ${submission.name},%0D%0A%0D%0A`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Message Details
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">From</label>
          <p className="font-medium">{submission.name}</p>
          <p className="text-sm text-muted-foreground">{submission.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Subject</label>
          <p>{submission.subject || 'No subject'}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Date</label>
          <p className="text-sm">{formatDate(submission.created_at)}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Message</label>
          <div className="mt-1 p-3 bg-muted rounded-md">
            <p className="whitespace-pre-wrap text-sm">{submission.message}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleReplyClick}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Reply via Email
          </Button>
          
          {!submission.replied && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onMarkAsReplied(submission.id)}
            >
              Mark as Replied
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMessageDetails;
