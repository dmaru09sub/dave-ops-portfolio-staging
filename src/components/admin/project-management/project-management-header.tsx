
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectManagementHeaderProps {
  projectCount: number;
  onNewProject: () => void;
  disabled: boolean;
}

const ProjectManagementHeader: React.FC<ProjectManagementHeaderProps> = ({
  projectCount,
  onNewProject,
  disabled
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold">Projects ({projectCount})</h3>
        <Link to="/tutorials">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View Tutorials
          </Button>
        </Link>
      </div>
      <Button onClick={onNewProject} disabled={disabled}>
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectManagementHeader;
