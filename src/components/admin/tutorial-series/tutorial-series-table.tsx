
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Eye, EyeOff, BookOpen } from 'lucide-react';
import type { TutorialSeries } from '@/types/tutorial-types';

interface TutorialSeriesTableProps {
  tutorialSeries: TutorialSeries[];
  onEdit: (series: TutorialSeries) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (series: TutorialSeries) => void;
}

const TutorialSeriesTable: React.FC<TutorialSeriesTableProps> = ({
  tutorialSeries,
  onEdit,
  onDelete,
  onTogglePublished
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tutorial Series</CardTitle>
        <CardDescription>Manage your tutorial series and their content</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tutorials</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutorialSeries.map((series) => (
              <TableRow key={series.id}>
                <TableCell className="font-medium">{series.title}</TableCell>
                <TableCell>
                  <Badge className={getDifficultyColor(series.difficulty_level)}>
                    {series.difficulty_level}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {series.tutorials.length}
                  </div>
                </TableCell>
                <TableCell>
                  {series.estimated_duration ? `${Math.round(series.estimated_duration / 60)}h` : '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTogglePublished(series)}
                    className="flex items-center gap-1"
                  >
                    {series.published ? (
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
                      onClick={() => onEdit(series)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(series.id)}
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

export default TutorialSeriesTable;
