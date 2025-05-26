
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SiteHeader } from '@/components/site-header';
import MainLayout from '@/components/layouts/main-layout';
import { GitBranch, Settings, Rocket, Upload, CheckCircle, AlertTriangle, Info, Code, Database, Globe } from 'lucide-react';

const CICDTutorial = () => {
  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <GitBranch className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold tracking-tight mb-4">3-Stage CI/CD Pipeline Guide</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to add new projects to the DEV → STAGE → PROD deployment pipeline
            </p>
          </div>

          <div className="space-y-8">
            {}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Project Requirements
                </CardTitle>
                <CardDescription>
                  What your project needs before adding to the pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Supported Project Types</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">React + Vite</Badge>
                      <Badge variant="outline">Next.js (Static)</Badge>
                      <Badge variant="outline">Vue.js</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Required Repository Structure</h4>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <div>your-project/</div>
                      <div>├── package.json</div>
                      <div>├── src/</div>
                      <div>├── public/</div>
                      <div>└── .github/workflows/ (optional)</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Build Configuration</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Must have a valid <code className="bg-gray-100 px-1 rounded">package.json</code></li>
                      <li>Build command should output to <code className="bg-gray-100 px-1 rounded">dist/</code> or <code className="bg-gray-100 px-1 rounded">build/</code></li>
                      <li>Default build command: <code className="bg-gray-100 px-1 rounded">npm run build</code></li>
                      <li>Custom build commands supported</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Common Issues & Solutions
                </CardTitle>
                <CardDescription>
                  Troubleshooting deployment problems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-700">Build Failures</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      <li>Check build command is correct in project settings</li>
                      <li>Verify package.json has all required dependencies</li>
                      <li>Ensure output directory is 'dist' or 'build'</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700">Permission Errors</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      <li>Verify PORTFOLIO_TOKEN has write access to repositories</li>
                      <li>Check repository visibility settings</li>
                      <li>Ensure token hasn't expired</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700">GitHub Pages Issues</h4>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      <li>Enable GitHub Pages in repository settings</li>
                      <li>Set source to "GitHub Actions"</li>
                      <li>Check if custom domain is configured correctly</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Future Enhancements
                </CardTitle>
                <CardDescription>
                  Planned improvements to the pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Pipeline Improvements</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Automated testing integration</li>
                      <li>Performance monitoring</li>
                      <li>Rollback capabilities</li>
                      <li>Multi-environment support</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Developer Experience</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>One-click project setup</li>
                      <li>Template repository generation</li>
                      <li>Advanced deployment analytics</li>
                      <li>Slack/Discord notifications</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-primary/5">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you run into issues or have questions about the CI/CD pipeline, feel free to reach out.
                  </p>
                  <Badge variant="outline">This system is open-source and available for public use</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CICDTutorial;
