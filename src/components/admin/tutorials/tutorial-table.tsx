
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash, Eye, EyeOff } from 'lucide-react';
import type { Tutorial } from '@/types/tutorial';

interface TutorialTableProps {
  tutorials: Tutorial[];
  onEdit: (tutorial: Tutorial) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (tutorial: Tutorial) => void;
}

const TutorialTable: React.FC<TutorialTableProps> = ({
  tutorials,
  onEdit,
  onDelete,
  onTogglePublished
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutorials</CardTitle>
        <CardDescription>Manage your tutorials</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutorials.map((tutorial) => (
              <TableRow key={tutorial.id}>
                <TableCell className="font-medium">{tutorial.title}</TableCell>
                <TableCell className="capitalize">{tutorial.difficulty_level}</TableCell>
                <TableCell>{tutorial.estimated_duration} min</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTogglePublished(tutorial)}
                    className="flex items-center gap-1"
                  >
                    {tutorial.published ? (
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
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(tutorial)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(tutorial.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TutorialTable;
