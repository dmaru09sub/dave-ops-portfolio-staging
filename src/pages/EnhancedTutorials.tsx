import React from 'react';
import MainLayout from '@/components/layouts/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EnhancedTutorials = () => {
  const tutorialSeries = [
    {
      id: 'portfolio-series',
      title: 'Complete Portfolio Development',
      description: 'Build a professional portfolio with automated CI/CD pipeline',
      difficulty: 'Intermediate',
      estimatedTime: '4-6 hours',
      tutorials: [
        {
          id: 'portfolio-setup',
          title: 'Portfolio Project Setup',
          description: 'Set up your basic portfolio structure with React, TypeScript, and Supabase',
          duration: '45 minutes',
          difficulty: 'Beginner',
          status: 'available',
          path: '/tutorials/portfolio-setup'
        },
        {
          id: 'cicd-pipeline',
          title: 'CI/CD Pipeline Setup', 
          description: 'Implement automated 3-stage deployment pipeline with GitHub Actions',
          duration: '60 minutes',
          difficulty: 'Intermediate',
          status: 'available',
          path: '/tutorials/cicd-pipeline'
        },
        {
          id: 'advanced-features',
          title: 'Advanced Portfolio Features',
          description: 'Add blog, contact forms, analytics, and admin dashboard',
          duration: '90 minutes', 
          difficulty: 'Advanced',
          status: 'coming-soon',
          path: '/tutorials/advanced-features'
        }
      ]
    },
    {
      id: 'cicd-series',
      title: 'CI/CD Deployment Pipeline',
      description: 'Automate your deployments with GitHub Actions',
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      tutorials: [
        {
          id: 'github-actions',
          title: 'Getting Started with GitHub Actions',
          description: 'Learn the basics of GitHub Actions and create your first workflow',
          duration: '30 minutes',
          difficulty: 'Beginner',
          status: 'available',
          path: '/tutorials/github-actions'
        },
        {
          id: 'docker-deployment',
          title: 'Deploying Docker Containers with CI/CD',
          description: 'Automate the deployment of Docker containers using GitHub Actions',
          duration: '45 minutes',
          difficulty: 'Intermediate',
          status: 'coming-soon',
          path: '/tutorials/docker-deployment'
        },
        {
          id: 'kubernetes-deployment',
          title: 'Automating Kubernetes Deployments',
          description: 'Set up a CI/CD pipeline for Kubernetes deployments',
          duration: '60 minutes',
          difficulty: 'Advanced',
          status: 'coming-soon',
          path: '/tutorials/kubernetes-deployment'
        }
      ]
    },
    {
      id: 'web-dev-series',
      title: 'Modern Web Development',
      description: 'Explore the latest web development technologies',
      difficulty: 'Intermediate',
      estimatedTime: '5-7 hours',
      tutorials: [
        {
          id: 'react-hooks',
          title: 'Mastering React Hooks',
          description: 'Learn how to use React Hooks to manage state and side effects',
          duration: '60 minutes',
          difficulty: 'Intermediate',
          status: 'available',
          path: '/tutorials/react-hooks'
        },
        {
          id: 'typescript-guide',
          title: 'Comprehensive TypeScript Guide',
          description: 'Learn TypeScript from basic to advanced concepts',
          duration: '90 minutes',
          difficulty: 'Intermediate',
          status: 'coming-soon',
          path: '/tutorials/typescript-guide'
        },
        {
          id: 'nextjs-tutorial',
          title: 'Building Full-Stack Apps with Next.js',
          description: 'Create a full-stack application using Next.js',
          duration: '120 minutes',
          difficulty: 'Advanced',
          status: 'coming-soon',
          path: '/tutorials/nextjs-tutorial'
        }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Enhanced Tutorials</h1>
            <p className="text-lg text-muted-foreground">
              Explore our in-depth tutorials to master modern web development and deployment techniques
            </p>
          </div>

          {tutorialSeries.map((series) => (
            <Card key={series.id}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{series.title}</CardTitle>
                <CardDescription>{series.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {series.tutorials.map((tutorial) => (
                    <Link to={tutorial.path} key={tutorial.id}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="text-lg font-medium">{tutorial.title}</CardTitle>
                          <CardDescription>{tutorial.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{tutorial.difficulty}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {tutorial.duration}
                            </span>
                          </div>
                          {tutorial.status === 'coming-soon' && (
                            <Badge variant="outline">Coming Soon</Badge>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default EnhancedTutorials;
