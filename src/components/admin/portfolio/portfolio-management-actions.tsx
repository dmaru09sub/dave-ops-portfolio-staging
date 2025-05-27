
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Eye, EyeOff, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  published: boolean;
}

interface PortfolioManagementActionsProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (project: Project) => void;
}

const PortfolioManagementActions: React.FC<PortfolioManagementActionsProps> = ({
  project,
  onEdit,
  onDelete,
  onTogglePublished
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(project)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onTogglePublished(project)}
      >
        {project.published ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(project.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PortfolioManagementActions;
