
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Target } from 'lucide-react';
import type { TutorialSeries } from '@/types/tutorial-types';

interface TutorialSeriesNavigationProps {
  series: TutorialSeries[];
  currentSeriesId?: string;
  onSeriesSelect: (seriesId: string) => void;
}

const TutorialSeriesNavigation: React.FC<TutorialSeriesNavigationProps> = ({
  series,
  currentSeriesId,
  onSeriesSelect
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tutorial Series</h2>
      <div className="grid gap-4">
        {series.map((tutorialSeries) => (
          <Card 
            key={tutorialSeries.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentSeriesId === tutorialSeries.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onSeriesSelect(tutorialSeries.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{tutorialSeries.title}</CardTitle>
                <Badge className={getDifficultyColor(tutorialSeries.difficulty_level)}>
                  {tutorialSeries.difficulty_level}
                </Badge>
              </div>
              <CardDescription>{tutorialSeries.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{tutorialSeries.tutorials.length} tutorials</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tutorialSeries.estimated_duration} min</span>
                </div>
                {tutorialSeries.prerequisites.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{tutorialSeries.prerequisites.length} prerequisites</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorialSeriesNavigation;
