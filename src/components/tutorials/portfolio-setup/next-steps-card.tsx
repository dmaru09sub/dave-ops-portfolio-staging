
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NextStepsCard = () => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 text-lg">
          <Rocket className="h-5 w-5" />
          Next: Set Up CI/CD Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-green-700">
          Once you have your basic portfolio structure ready, proceed to the CI/CD tutorial to set up automated deployments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="sm">
            <Link to="/tutorials/cicd-pipeline" className="flex items-center gap-2">
              CI/CD Pipeline Tutorial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/tutorials">
              All Tutorials
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
