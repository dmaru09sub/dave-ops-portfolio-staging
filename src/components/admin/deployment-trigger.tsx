
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rocket, ExternalLink, AlertCircle, GitBranch, Code, Globe } from 'lucide-react';
import ProjectSelector from './project-selector';
import { useDeploymentProjects } from '@/hooks/use-deployment-projects';

interface DeploymentTriggerProps {
  onTriggerDeployment: (projectId?: string, stage?: string) => void;
  deploying: boolean;
}

const DeploymentTrigger: React.FC<DeploymentTriggerProps> = ({ onTriggerDeployment, deploying }) => {
  const { projects, loading: projectsLoading } = useDeploymentProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [deploymentStage, setDeploymentStage] = useState<string>('stage');

  const handleDeploy = () => {
    onTriggerDeployment(selectedProject || undefined, deploymentStage);
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  const getStageInfo = (stage: string) => {
    if (!selectedProjectData) return null;
    
    switch (stage) {
      case 'stage':
        return {
          icon: <GitBranch className="h-4 w-4" />,
          title: 'Deploy to Staging',
          description: 'Clean source code and deploy to staging environment',
          repo: selectedProjectData.stage_repo,
          url: selectedProjectData.stage_url,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 border-yellow-200'
        };
      case 'prod':
        return {
          icon: <Globe className="h-4 w-4" />,
          title: 'Deploy to Production',
          description: 'Build and deploy static files to production',
          repo: selectedProjectData.prod_repo,
          url: selectedProjectData.prod_url,
          color: 'text-green-600',
          bgColor: 'bg-green-50 border-green-200'
        };
      default:
        return null;
    }
  };

  const stageInfo = getStageInfo(deploymentStage);

  return (
    <div className="space-y-6">
      <ProjectSelector
        projects={projects}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        loading={projectsLoading}
      />

      {selectedProject && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Deployment Stage Selection
            </CardTitle>
            <CardDescription>
              Choose which stage of the pipeline to deploy to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Deployment Stage</label>
                <Select value={deploymentStage} onValueChange={setDeploymentStage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stage">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-yellow-600" />
                        <span>Stage - Clean source code deployment</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="prod">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-green-600" />
                        <span>Production - Static build deployment</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {stageInfo && (
                <div className={`p-4 border rounded-lg ${stageInfo.bgColor}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={stageInfo.color}>{stageInfo.icon}</span>
                    <h4 className={`font-medium ${stageInfo.color}`}>{stageInfo.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{stageInfo.description}</p>
                  
                  {stageInfo.repo ? (
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium">Target Repository:</span>
                        <code className="ml-2 bg-white px-2 py-1 rounded text-xs">{stageInfo.repo}</code>
                      </div>
                      {stageInfo.url && (
                        <div>
                          <span className="font-medium">Deployment URL:</span>
                          <a 
                            href={stageInfo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`ml-2 hover:underline inline-flex items-center gap-1 ${stageInfo.color}`}
                          >
                            {stageInfo.url.replace('https://', '')}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-800">
                        {deploymentStage === 'stage' ? 'Stage repository' : 'Production repository'} not configured for this project
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Deploy Project
          </CardTitle>
          <CardDescription>
            {selectedProjectData && stageInfo ? (
              <>
                Deploy <strong>{selectedProjectData.name}</strong> to{' '}
                <span className={stageInfo.color}>
                  {deploymentStage === 'stage' ? 'Staging' : 'Production'}
                </span>
                {stageInfo.url && (
                  <>
                    {' '}at{' '}
                    <a 
                      href={stageInfo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {stageInfo.url.replace('https://', '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                )}
              </>
            ) : (
              'Select a project above to enable deployment'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProjectData && stageInfo && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">What happens during {deploymentStage} deployment:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Triggers GitHub Actions workflow on <code>{selectedProjectData.source_repo}</code></li>
                  
                  {deploymentStage === 'stage' && (
                    <>
                      <li>• Removes all Lovable branding and development references</li>
                      <li>• Cleans up development-specific files and comments</li>
                      <li>• Pushes cleaned source code to <code>{selectedProjectData.stage_repo}</code></li>
                      <li>• Deploys source code to staging environment</li>
                    </>
                  )}
                  
                  {deploymentStage === 'prod' && (
                    <>
                      <li>• Runs build process: <code>{selectedProjectData.build_command || 'npm run build'}</code></li>
                      <li>• Generates optimized static files</li>
                      <li>• Pushes built files to <code>{selectedProjectData.prod_repo}</code></li>
                      <li>• Deploys to production GitHub Pages</li>
                    </>
                  )}
                  
                  <li>• Updates deployment tracking in admin panel</li>
                </ul>
              </div>
            )}
            
            {!selectedProject && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Please select a project before deploying
                </span>
              </div>
            )}

            {selectedProject && stageInfo && !stageInfo.repo && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  {deploymentStage === 'stage' ? 'Stage repository' : 'Production repository'} must be configured before deployment
                </span>
              </div>
            )}
            
            <Button 
              onClick={handleDeploy} 
              disabled={deploying || !selectedProject || !stageInfo?.repo || projectsLoading}
              className="flex items-center gap-2"
            >
              <Rocket className="h-4 w-4" />
              {deploying ? 'Deploying...' : `Deploy to ${deploymentStage === 'stage' ? 'Staging' : 'Production'}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeploymentTrigger;
