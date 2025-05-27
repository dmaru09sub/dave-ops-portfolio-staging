
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateCardProps {
  onNewProject: () => void;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ onNewProject }) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Get Started with CI/CD</h3>
        <p className="text-muted-foreground mb-4">
          Add your first project to begin using the automated deployment pipeline
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onNewProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Project
          </Button>
          <Button variant="outline" asChild>
            <Link to="/tutorials/cicd-pipeline">
              <BookOpen className="h-4 w-4 mr-2" />
              Read Tutorial
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
