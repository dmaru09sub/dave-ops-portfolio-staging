
import React from 'react';
import { SiteHeader } from "@/components/site-header";
import MainLayout from "@/components/layouts/main-layout";
import { PortfolioFooter } from "@/components/portfolio-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ExternalLink, Play, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";
import { useSiteTitle } from "@/hooks/use-site-title";

const Tutorials = () => {
  usePageViewTracking();
  useSiteTitle('Tutorials');

  const tutorials = [
    {
      id: "portfolio-setup",
      title: "Portfolio Setup Guide",
      description: "Step-by-step guide to setting up your own portfolio using modern web technologies and best practices.",
      difficulty: "Beginner",
      duration: "30 min",
      topics: ["React", "TypeScript", "Supabase", "Portfolio"],
      link: "/tutorials/portfolio-setup",
      available: true,
      featured: true
    },
    {
      id: "cicd-pipeline",
      title: "Complete CI/CD Pipeline Setup",
      description: "Learn to build a comprehensive 3-stage deployment pipeline with GitHub Actions, automated testing, and production deployment.",
      difficulty: "Intermediate",
      duration: "45 min",
      topics: ["GitHub Actions", "CI/CD", "DevOps", "Automation"],
      link: "/tutorials/cicd-pipeline",
      available: true,
      featured: true
    },
    {
      id: "devops-best-practices",
      title: "DevOps Best Practices",
      description: "Essential DevOps practices for modern development teams including infrastructure as code and monitoring.",
      difficulty: "Advanced",
      duration: "60 min",
      topics: ["DevOps", "Infrastructure", "Monitoring", "Security"],
      link: "#",
      available: false,
      comingSoon: true
    },
    {
      id: "cloud-architecture",
      title: "Scalable Cloud Architecture",
      description: "Design and implement scalable cloud solutions using modern cloud-native technologies and patterns.",
      difficulty: "Advanced",
      duration: "75 min",
      topics: ["Cloud", "Architecture", "Scalability", "Microservices"],
      link: "#",
      available: false,
      comingSoon: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Tutorials & Guides</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn modern DevOps practices, cloud architecture, and automation through 
              comprehensive, hands-on tutorials designed for real-world applications.
            </p>
          </div>

          {/* Featured Tutorials */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Featured Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.filter(tutorial => tutorial.featured).map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tutorial.difficulty}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutorial.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {tutorial.available ? (
                      <Button asChild className="w-full">
                        <Link to={tutorial.link}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Tutorial
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Tutorials */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">All Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm line-clamp-3">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tutorial.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {tutorial.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tutorial.topics.length - 3}
                        </Badge>
                      )}
                    </div>

                    {tutorial.available ? (
                      <Button asChild className="w-full">
                        <Link to={tutorial.link}>
                          <Play className="h-3 w-3 mr-2" />
                          Start
                        </Link>
                      </Button>
                    ) : tutorial.comingSoon ? (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        Unavailable
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Want to suggest a tutorial?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Have an idea for a tutorial or want to see coverage of a specific topic? 
                  I'd love to hear from you and create content that helps the community.
                </p>
                <Button asChild>
                  <Link to="/contact">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get in Touch
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <PortfolioFooter />
    </MainLayout>
  );
};

export default Tutorials;
