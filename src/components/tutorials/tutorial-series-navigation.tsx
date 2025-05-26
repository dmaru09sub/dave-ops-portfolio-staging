
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TutorialSeriesService } from '@/services/tutorial-series-service';
import type { TutorialSeries } from '@/types/project-initialization';

interface TutorialSeriesNavigationProps {
  currentTutorialId?: string;
}

const TutorialSeriesNavigation: React.FC<TutorialSeriesNavigationProps> = ({ currentTutorialId }) => {
  const [tutorialSeries, setTutorialSeries] = useState<TutorialSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTutorialSeries = async () => {
      setLoading(true);
      const series = await TutorialSeriesService.getTutorialSeries();
      setTutorialSeries(series);
      setLoading(false);
    };

    loadTutorialSeries();
  }, []);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Learning Path</h1>
          <p className="text-muted-foreground">Loading tutorial series...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">DevOps Learning Path</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Master modern CI/CD and DevOps practices with our comprehensive tutorial series
        </p>
      </div>

      <div className="grid gap-6">
        {tutorialSeries.map((series, index) => (
          <Card key={series.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl">{series.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {series.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getDifficultyColor(series.difficulty_level || 'beginner')}>
                    {series.difficulty_level || 'beginner'}
                  </Badge>
                  {series.estimated_duration && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {formatDuration(series.estimated_duration)}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Prerequisites */}
                {series.prerequisites && Array.isArray(series.prerequisites) && series.prerequisites.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Prerequisites:</span>
                    <div className="flex gap-1">
                      {series.prerequisites.map((prereq, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress indicator (placeholder) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-muted-foreground">0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>

                {/* Tutorials in series */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What you'll learn:</h4>
                  <div className="grid gap-2">
                    {index === 0 && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span>Setting up your portfolio project from scratch</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span>Configuring Supabase database and authentication</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span>Understanding the 3-stage deployment pipeline</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Link to="/tutorials/cicd-pipeline" className="text-blue-600 hover:underline">
                            CI/CD Pipeline Setup (Available Now)
                          </Link>
                        </div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-yellow-600" />
                          <span>Adding new projects to the CI/CD pipeline</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-yellow-600" />
                          <span>Automated project initialization and validation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-yellow-600" />
                          <span>Managing GitHub secrets and workflows</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-yellow-600" />
                          <span>Troubleshooting deployment issues</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  {index === 0 ? (
                    <Button asChild>
                      <Link to="/tutorials/cicd-pipeline">
                        Start Learning
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Coming Soon
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    View Community
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Knowledge Base Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Knowledge Base
          </CardTitle>
          <CardDescription>
            Access detailed guides, troubleshooting tips, and best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Quick Start Guides</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Project Setup Requirements</li>
                <li>• Supabase Configuration</li>
                <li>• GitHub Secrets Management</li>
                <li>• Environment Variables Guide</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Troubleshooting</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Common Deployment Errors</li>
                <li>• Build Configuration Issues</li>
                <li>• Authentication Problems</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline">
              Browse All Articles
            </Button>
            <Button variant="ghost">
              Search Knowledge Base
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialSeriesNavigation;
