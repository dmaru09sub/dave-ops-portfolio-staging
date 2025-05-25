import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { ExternalLink, Github, Code, Briefcase } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  demo_url: string;
  github_url: string;
  image_url: string;
  technologies: Json;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  live_url?: string;
  tech_stack?: string[];
  category?: string;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('daveops_projects')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getTechnologies = (technologies: Json): string[] => {
    if (Array.isArray(technologies)) {
      return technologies.filter((tech): tech is string => typeof tech === 'string');
    }
    return [];
  };

  const filteredProjects = filter === 'featured' 
    ? projects.filter(project => project.featured) 
    : projects;

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 bg-gray-200 rounded mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Briefcase className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight mb-4">Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              DevOps and cloud infrastructure projects
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All Projects
              </Button>
              <Button
                variant={filter === 'featured' ? 'default' : 'outline'}
                onClick={() => setFilter('featured')}
              >
                Featured
              </Button>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="relative overflow-hidden group hover:shadow-lg transition-all duration-200">
                  {project.featured && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.long_description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.long_description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {getTechnologies(project.technologies).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      {project.github_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo_url && (
                        <Button size="sm" asChild>
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.live_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <Card className="p-8">
                <Code className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">No projects found</h3>
                <p className="text-muted-foreground">
                  {filter === 'featured' 
                    ? "No featured projects available yet." 
                    : "Check back soon for new DevOps and cloud engineering projects."}
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Portfolio;
