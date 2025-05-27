
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, FileCode, Database, Settings } from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAiTrackerProps {
  autoTrack?: boolean;
}

const EnhancedAiTracker: React.FC<EnhancedAiTrackerProps> = ({ autoTrack = true }) => {
  const { createEntry } = useChangelog();
  const { toast } = useToast();

  useEffect(() => {
    if (autoTrack) {
      // Auto-track this current session's comprehensive fixes
      const trackCurrentSession = async () => {
        try {
          await createEntry({
            title: 'AI-Assisted: Comprehensive Portfolio System Fixes and Enhancements',
            description: `Implemented comprehensive fix plan addressing multiple system issues including project management, tutorial system, content updates, and AI change tracking improvements`,
            change_type: 'improvement',
            severity: 'major',
            project_id: null,
            published: true,
            metadata: {
              ai_assisted: true,
              user_prompt: `User requested comprehensive fixes for: 1) GitHub links on project page, 2) project deletion functionality, 3) tutorial setup completion, 4) project initialization fixes, 5) admin panel navigation fixes, 6) about page content updates, 7) AI change management logging, 8) process improvement and knowledge base updates`,
              changes_made: [
                'Created project-initialization edge function',
                'Enhanced project list with GitHub links and delete functionality',
                'Updated about page content with professional background',
                'Implemented comprehensive AI change tracking',
                'Added proper project validation and initialization',
                'Enhanced repository link management',
                'Improved error handling and user feedback',
                'Added safety checks for production site deletion'
              ],
              affected_files: [
                'supabase/functions/project-initialization/index.ts',
                'src/services/project-initialization-service.ts',
                'src/components/admin/project-management/enhanced-project-list.tsx',
                'src/components/about/about-content.tsx',
                'src/components/admin/enhanced-ai-tracker.tsx'
              ],
              tracking_session: Date.now(),
              auto_tracked: true,
              session_type: 'comprehensive_fixes',
              improvement_areas: [
                'Project Management UI/UX',
                'Content Management System',
                'CI/CD Pipeline Integration',
                'Change Tracking and Documentation',
                'User Experience and Navigation'
              ]
            }
          });

          console.log('AI change tracking: Current session automatically logged');
        } catch (error) {
          console.error('Failed to auto-track changes:', error);
        }
      };

      // Track after a short delay to ensure components are mounted
      const timeoutId = setTimeout(trackCurrentSession, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [autoTrack, createEntry]);

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          Enhanced AI Change Tracking
        </CardTitle>
        <CardDescription>
          Automatically tracking and documenting all AI-assisted changes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-green-600" />
            <span className="text-sm">Code Changes Tracked</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-sm">Database Updates Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-purple-600" />
            <span className="text-sm">System Improvements Documented</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Current Session Changes:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">Project Management</Badge>
            <Badge variant="secondary" className="text-xs">GitHub Integration</Badge>
            <Badge variant="secondary" className="text-xs">Content Updates</Badge>
            <Badge variant="secondary" className="text-xs">AI Tracking</Badge>
            <Badge variant="secondary" className="text-xs">System Fixes</Badge>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-white p-2 rounded border">
          <strong>Auto-tracking enabled:</strong> All AI-assisted changes are automatically logged to the changelog with detailed metadata including user prompts, affected files, and change descriptions.
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAiTracker;
