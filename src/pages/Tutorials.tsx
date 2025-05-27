
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { Clock, ExternalLink, GitBranch, BookOpen, Target } from "lucide-react";
import { Link } from 'react-router-dom';
import { TutorialSeriesService } from '@/services/tutorial-series-service';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import type { TutorialSeries, TutorialItem } from '@/types/tutorial-types';

const Tutorials = () => {
  useScrollToTop();
  
  const [tutorialSeries, setTutorialSeries] = useState<TutorialSeries[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorialSeries = async () => {
      try {
        const data = await TutorialSeriesService.getTutorialSeries();
        setTutorialSeries(data);
      } catch (error) {
        console.error('Error fetching tutorial series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorialSeries();
  }, []);

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTutorialCard = (tutorial: TutorialItem) => {
    const isCI_CD = tutorial.title.toLowerCase().includes('ci/cd') || tutorial.title.toLowerCase().includes('pipeline');
    const isComingSoon = tutorial.status === 'coming-soon';
    const duration = tutorial.duration || tutorial.estimated_duration;
    const difficulty = tutorial.difficulty || 'beginner';
    const tutorialPath = tutorial.path || `/tutorials/${tutorial.id}`;
    
    return (
      <Card key={tutorial.id} className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              {isCI_CD && <GitBranch className="h-5 w-5 text-primary flex-shrink-0 mt-1" />}
              <div className="min-w-0 flex-1">
                <CardTitle className="text-base font-medium leading-tight">{tutorial.title}</CardTitle>
                <CardDescription className="text-sm mt-1 line-clamp-2">{tutorial.description}</CardDescription>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-2">
              {isComingSoon && <Badge variant="outline" className="text-xs">Coming Soon</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {duration} min
                </div>
              )}
              {difficulty && (
                <Badge className={`${getDifficultyColor(difficulty)} text-xs`}>
                  {difficulty}
                </Badge>
              )}
            </div>
            
            {isComingSoon ? (
              <Button variant="outline" disabled size="sm" className="text-xs">
                Coming Soon
              </Button>
            ) : (
              <Link to={tutorialPath}>
                <Button size="sm" className="text-xs">
                  Read Tutorial
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">DevOps Tutorials</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our in-depth tutorial series to master modern web development and deployment techniques
            </p>
          </div>

          <div className="space-y-8">
            {tutorialSeries.length > 0 ? (
              tutorialSeries.map((series) => (
                <Card key={series.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-xl md:text-2xl font-semibold">{series.title}</CardTitle>
                        <CardDescription className="text-sm md:text-base mt-2">{series.description}</CardDescription>
                      </div>
                      <Badge className={`${getDifficultyColor(series.difficulty_level)} flex-shrink-0 w-fit`}>
                        {series.difficulty_level}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 flex-shrink-0" />
                        <span>{series.tutorials.length} tutorials</span>
                      </div>
                      {series.estimated_duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{Math.round(series.estimated_duration / 60)} hours</span>
                        </div>
                      )}
                      {series.prerequisites.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 flex-shrink-0" />
                          <span>{series.prerequisites.length} prerequisites</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {series.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Prerequisites:</h4>
                        <div className="flex flex-wrap gap-2">
                          {series.prerequisites.map((prereq, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{prereq}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {series.tutorials.map((tutorial) => renderTutorialCard(tutorial))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">More tutorial series coming soon!</h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                    I'm working on creating comprehensive tutorial series covering DevOps best practices, 
                    cloud architecture patterns, and automation workflows.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Tutorials;
