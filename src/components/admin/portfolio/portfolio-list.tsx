
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PortfolioTable from './portfolio-table';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  technologies: any;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

interface PortfolioListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (project: Project) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({
  projects,
  onEdit,
  onDelete,
  onTogglePublished
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your portfolio projects</CardDescription>
      </CardHeader>
      <CardContent>
        <PortfolioTable
          projects={projects}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePublished={onTogglePublished}
        />
      </CardContent>
    </Card>
  );
};

export default PortfolioList;
