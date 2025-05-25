
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { 
  ExternalLink, 
  Github, 
  User, 
  Calendar, 
  Tag, 
  Bot, 
  Filter,
  FileText,
  Code,
  Search
} from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';

const EnhancedChangelogSection: React.FC = () => {
  const { entries, loading } = useChangelog();
  const [filter, setFilter] = useState<'all' | 'ai' | 'manual'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEntries = entries.filter(entry => {
    const matchesFilter = filter === 'all' || 
      (filter === 'ai' && entry.metadata?.ai_assisted) ||
      (filter === 'manual' && !entry.metadata?.ai_assisted);
    
    const matchesSearch = !searchTerm || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || entry.change_type === selectedType;
    
    return matchesFilter && matchesSearch && matchesType;
  });

  const aiAssistedEntries = entries.filter(entry => entry.metadata?.ai_assisted);
  const manualEntries = entries.filter(entry => !entry.metadata?.ai_assisted);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Changelog</CardTitle>
          <CardDescription>Comprehensive change tracking with AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-green-100 text-green-800';
      case 'bugfix': return 'bg-red-100 text-red-800';
      case 'enhancement': return 'bg-blue-100 text-blue-800';
      case 'breaking': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderChangeEntry = (entry: any) => (
    <div key={entry.id} className="border-l-2 border-blue-200 pl-4 pb-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {entry.metadata?.ai_assisted && (
              <Bot className="h-4 w-4 text-blue-500" />
            )}
            <h4 className="font-medium">{entry.title}</h4>
            <Badge 
              variant="secondary" 
              className={getChangeTypeColor(entry.change_type)}
            >
              {entry.change_type}
            </Badge>
            {entry.severity && (
              <Badge variant="outline" className="text-xs">
                {entry.severity}
              </Badge>
            )}
          </div>
          
          {entry.description && (
            <p className="text-sm text-muted-foreground">
              {entry.description}
            </p>
          )}

          {entry.metadata?.user_prompt && (
            <div className="bg-blue-50 p-2 rounded text-sm">
              <strong>User Request:</strong> {entry.metadata.user_prompt}
            </div>
          )}

          {entry.metadata?.changes_made && Array.isArray(entry.metadata.changes_made) && (
            <div className="space-y-1">
              <strong className="text-xs">Changes Made:</strong>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                {entry.metadata.changes_made.map((change: string, index: number) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          )}

          {entry.metadata?.affected_files && Array.isArray(entry.metadata.affected_files) && (
            <div className="space-y-1">
              <strong className="text-xs">Affected Files:</strong>
              <div className="flex flex-wrap gap-1">
                {entry.metadata.affected_files.map((file: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {file}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(entry.created_at), 'MMM d, yyyy HH:mm')}
            </div>
            
            {entry.author_name && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {entry.author_name}
              </div>
            )}
            
            {entry.project_name && (
              <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {entry.project_name}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-1 ml-4">
          {entry.github_commit_url && (
            <a 
              href={entry.github_commit_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1 text-xs"
            >
              <Github className="h-3 w-3" />
              Commit
            </a>
          )}
          {entry.pull_request_url && (
            <a 
              href={entry.pull_request_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline inline-flex items-center gap-1 text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              PR #{entry.pull_request_number}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Enhanced Changelog
        </CardTitle>
        <CardDescription>
          Comprehensive change tracking with AI assistance and detailed metadata
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search changes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">All Types</option>
                <option value="feature">Features</option>
                <option value="bugfix">Bug Fixes</option>
                <option value="enhancement">Enhancements</option>
                <option value="breaking">Breaking</option>
                <option value="security">Security</option>
              </select>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">AI-Assisted</p>
                    <p className="text-2xl font-bold">{aiAssistedEntries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Manual</p>
                    <p className="text-2xl font-bold">{manualEntries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Total</p>
                    <p className="text-2xl font-bold">{entries.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
            <TabsList>
              <TabsTrigger value="all">All Changes</TabsTrigger>
              <TabsTrigger value="ai">
                <Bot className="h-4 w-4 mr-1" />
                AI-Assisted
              </TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No changes found matching your filters.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map(renderChangeEntry)}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No AI-assisted changes found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map(renderChangeEntry)}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              {filteredEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No manual changes found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map(renderChangeEntry)}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedChangelogSection;
