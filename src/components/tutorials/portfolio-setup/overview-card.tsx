
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const OverviewCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">What You'll Build</CardTitle>
        <CardDescription>
          A complete portfolio website with automated 3-stage deployment pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg bg-blue-50">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-semibold text-blue-800 text-sm">DEV</h3>
            <p className="text-xs text-blue-600">Development with Lovable references</p>
          </div>
          <div className="text-center p-4 border rounded-lg bg-yellow-50">
            <div className="text-2xl mb-2">🧪</div>
            <h3 className="font-semibold text-yellow-800 text-sm">STAGE</h3>
            <p className="text-xs text-yellow-600">Clean testing environment</p>
          </div>
          <div className="text-center p-4 border rounded-lg bg-green-50">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-semibold text-green-800 text-sm">PROD</h3>
            <p className="text-xs text-green-600">Live production site</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
