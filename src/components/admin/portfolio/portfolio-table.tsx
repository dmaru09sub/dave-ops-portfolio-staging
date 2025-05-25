
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash, Eye, EyeOff } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  technologies: Json;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

interface PortfolioTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (project: Project) => void;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onTogglePublished
}) => {
  const getTechnologiesDisplay = (technologies: Json) => {
    if (Array.isArray(technologies)) {
      return technologies.slice(0, 3).join(', ') + (technologies.length > 3 ? '...' : '');
    }
    return '';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Technologies</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Featured</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>{getTechnologiesDisplay(project.technologies)}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTogglePublished(project)}
                className="flex items-center gap-1"
              >
                {project.published ? (
                  <>
                    <Eye className="h-3 w-3" />
                    Published
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3" />
                    Draft
                  </>
                )}
              </Button>
            </TableCell>
            <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(project.id)}
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

export default PortfolioTable;
