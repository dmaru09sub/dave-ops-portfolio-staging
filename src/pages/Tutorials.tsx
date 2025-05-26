import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { Clock, ExternalLink, GitBranch } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import type { Json } from '@/integrations/supabase/types';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
  difficulty_level?: string;
  estimated_duration?: number;
  tags: Json;
  published: boolean;
  coming_soon: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const { data, error } = await supabase
          .from('daveops_tutorials')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setTutorials(data || []);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTagsArray = (tags: Json): string[] => {
    if (Array.isArray(tags)) {
      return tags.filter(tag => typeof tag === 'string') as string[];
    }
    return [];
  };

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">DevOps Tutorials</h1>
            <p className="text-xl text-muted-foreground">
              Learn modern DevOps practices, cloud architecture, and automation techniques
            </p>
          </div>

          <div className="space-y-6">
            {}
            {tutorials.length > 0 ? (
              tutorials.map((tutorial) => (
                <Card key={tutorial.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{tutorial.title}</CardTitle>
                        <CardDescription>{tutorial.description}</CardDescription>
                      </div>
                      {tutorial.coming_soon && (
                        <Badge variant="outline">Coming Soon</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tutorial.content && (
                        <p className="text-muted-foreground line-clamp-3">
                          {tutorial.content.substring(0, 200)}...
                        </p>
                      )}
                      
                      {tutorial.tags && getTagsArray(tutorial.tags).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {getTagsArray(tutorial.tags).map((tag, index) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {tutorial.estimated_duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {tutorial.estimated_duration} min read
                            </div>
                          )}
                          {tutorial.difficulty_level && (
                            <Badge className={getDifficultyColor(tutorial.difficulty_level)}>
                              {tutorial.difficulty_level}
                            </Badge>
                          )}
                        </div>
                        
                        <Button variant="outline" disabled={tutorial.coming_soon}>
                          {tutorial.coming_soon ? 'Coming Soon' : 'Read Tutorial'}
                          {!tutorial.coming_soon && <ExternalLink className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">More tutorials coming soon!</h3>
                  <p className="text-muted-foreground">
                    I'm working on creating comprehensive tutorials covering DevOps best practices, 
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
