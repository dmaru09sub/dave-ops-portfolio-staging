
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bot, Save, X, Plus } from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';
import { useToast } from '@/hooks/use-toast';

interface ChangeEntry {
  title: string;
  description: string;
  userPrompt: string;
  changesMade: string[];
  affectedFiles: string[];
  changeType: 'feature' | 'bugfix' | 'enhancement' | 'breaking' | 'security';
  severity: 'minor' | 'major' | 'patch';
}

const AiChangeTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<ChangeEntry>({
    title: '',
    description: '',
    userPrompt: '',
    changesMade: [],
    affectedFiles: [],
    changeType: 'feature',
    severity: 'minor'
  });
  const [newChange, setNewChange] = useState('');
  const [newFile, setNewFile] = useState('');
  const { createEntry } = useChangelog();
  const { toast } = useToast();

  // Auto-detect when AI is making changes (this would be triggered by the AI)
  const startTracking = (prompt: string) => {
    setIsTracking(true);
    setCurrentEntry({
      ...currentEntry,
      userPrompt: prompt,
      title: `AI-Assisted: ${prompt.substring(0, 50)}...`,
      description: `Changes made in response to user request: "${prompt}"`
    });
  };

  const addChange = () => {
    if (newChange.trim()) {
      setCurrentEntry({
        ...currentEntry,
        changesMade: [...currentEntry.changesMade, newChange.trim()]
      });
      setNewChange('');
    }
  };

  const addFile = () => {
    if (newFile.trim()) {
      setCurrentEntry({
        ...currentEntry,
        affectedFiles: [...currentEntry.affectedFiles, newFile.trim()]
      });
      setNewFile('');
    }
  };

  const removeChange = (index: number) => {
    setCurrentEntry({
      ...currentEntry,
      changesMade: currentEntry.changesMade.filter((_, i) => i !== index)
    });
  };

  const removeFile = (index: number) => {
    setCurrentEntry({
      ...currentEntry,
      affectedFiles: currentEntry.affectedFiles.filter((_, i) => i !== index)
    });
  };

  const saveEntry = async () => {
    try {
      await createEntry({
        title: currentEntry.title,
        description: currentEntry.description,
        change_type: currentEntry.changeType,
        severity: currentEntry.severity,
        published: true,
        metadata: {
          ai_assisted: true,
          user_prompt: currentEntry.userPrompt,
          changes_made: currentEntry.changesMade,
          affected_files: currentEntry.affectedFiles,
          tracking_session: Date.now(),
          auto_tracked: true
        }
      });

      toast({
        title: 'Change Logged',
        description: 'AI-assisted change has been recorded in the changelog.',
      });

      // Reset tracking
      setIsTracking(false);
      setCurrentEntry({
        title: '',
        description: '',
        userPrompt: '',
        changesMade: [],
        affectedFiles: [],
        changeType: 'feature',
        severity: 'minor'
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to save changelog entry',
        variant: 'destructive'
      });
    }
  };

  if (!isTracking) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Change Tracker
          </CardTitle>
          <CardDescription>
            Track and document AI-assisted changes automatically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active AI session detected</p>
            <p className="text-sm">Changes will be tracked automatically when AI assistance is used</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Active AI Change Session
        </CardTitle>
        <CardDescription>
          Documenting changes made with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={currentEntry.title}
            onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
            placeholder="Brief description of the change"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={currentEntry.description}
            onChange={(e) => setCurrentEntry({ ...currentEntry, description: e.target.value })}
            rows={3}
            placeholder="Detailed description of what was changed"
          />
        </div>

        <div>
          <label className="text-sm font-medium">User Prompt</label>
          <Textarea
            value={currentEntry.userPrompt}
            onChange={(e) => setCurrentEntry({ ...currentEntry, userPrompt: e.target.value })}
            rows={2}
            placeholder="What did the user ask for?"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Change Type</label>
            <select
              value={currentEntry.changeType}
              onChange={(e) => setCurrentEntry({ ...currentEntry, changeType: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="feature">Feature</option>
              <option value="bugfix">Bug Fix</option>
              <option value="enhancement">Enhancement</option>
              <option value="breaking">Breaking Change</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Severity</label>
            <select
              value={currentEntry.severity}
              onChange={(e) => setCurrentEntry({ ...currentEntry, severity: e.target.value as any })}
              className="w-full p-2 border rounded"
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="patch">Patch</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Changes Made</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newChange}
              onChange={(e) => setNewChange(e.target.value)}
              placeholder="Describe a specific change"
              onKeyPress={(e) => e.key === 'Enter' && addChange()}
            />
            <Button onClick={addChange} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {currentEntry.changesMade.map((change, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="flex-1">{change}</Badge>
                <Button onClick={() => removeChange(index)} size="sm" variant="ghost">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Affected Files</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newFile}
              onChange={(e) => setNewFile(e.target.value)}
              placeholder="File path or component name"
              onKeyPress={(e) => e.key === 'Enter' && addFile()}
            />
            <Button onClick={addFile} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {currentEntry.affectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="secondary" className="flex-1">{file}</Badge>
                <Button onClick={() => removeFile(index)} size="sm" variant="ghost">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={saveEntry} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save to Changelog
          </Button>
          <Button 
            onClick={() => setIsTracking(false)} 
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiChangeTracker;
