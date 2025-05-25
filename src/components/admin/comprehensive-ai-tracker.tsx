
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Bot, User, Filter, Calendar, GitCommit } from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';
import { format } from 'date-fns';

const ComprehensiveAITracker: React.FC = () => {
  const { entries, loading } = useChangelog();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showAIOnly, setShowAIOnly] = useState(false);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || entry.change_type === filterType;
    const matchesSeverity = filterSeverity === 'all' || entry.severity === filterSeverity;
    const matchesAI = !showAIOnly || (entry.metadata as any)?.ai_assisted === true;
    
    return matchesSearch && matchesType && matchesSeverity && matchesAI;
  });

  const getAIContext = (metadata: any) => {
    if (!metadata?.ai_assisted) return null;
    
    return {
      userPrompt: metadata.user_prompt || 'No prompt recorded',
      changesMade: metadata.changes_made || [],
      affectedComponents: metadata.affected_components || [],
      action: metadata.action || 'unknown'
    };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-green-100 text-green-800';
      case 'bugfix': return 'bg-red-100 text-red-800';
      case 'improvement': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'major': return 'bg-orange-500 text-white';
      case 'minor': return 'bg-yellow-500 text-black';
      case 'patch': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>AI Change Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Comprehensive AI Change Tracker
        </CardTitle>
        <CardDescription>
          Track all changes made with AI assistance, including prompts and context
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search changes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
              <SelectItem value="bugfix">Bug Fixes</SelectItem>
              <SelectItem value="improvement">Improvements</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="major">Major</SelectItem>
              <SelectItem value="minor">Minor</SelectItem>
              <SelectItem value="patch">Patch</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showAIOnly ? "default" : "outline"}
            onClick={() => setShowAIOnly(!showAIOnly)}
            className="flex items-center gap-2"
          >
            <Bot className="h-4 w-4" />
            AI Only
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {entries.filter(e => (e.metadata as any)?.ai_assisted).length}
            </div>
            <div className="text-sm text-blue-600">AI-Assisted Changes</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {entries.filter(e => e.change_type === 'feature').length}
            </div>
            <div className="text-sm text-green-600">New Features</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {entries.filter(e => e.change_type === 'bugfix').length}
            </div>
            <div className="text-sm text-red-600">Bug Fixes</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {entries.filter(e => e.severity === 'critical' || e.severity === 'major').length}
            </div>
            <div className="text-sm text-purple-600">Critical/Major</div>
          </div>
        </div>

        {/* Change List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No changes found matching your filters.
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const aiContext = getAIContext(entry.metadata);
              
              return (
                <Card key={entry.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {aiContext && <Bot className="h-4 w-4 text-blue-600" />}
                            <h4 className="font-medium">{entry.title}</h4>
                          </div>
                          {entry.description && (
                            <p className="text-sm text-muted-foreground">{entry.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(entry.change_type)}>
                            {entry.change_type}
                          </Badge>
                          <Badge className={getSeverityColor(entry.severity)}>
                            {entry.severity}
                          </Badge>
                        </div>
                      </div>

                      {/* AI Context */}
                      {aiContext && (
                        <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                            <Bot className="h-3 w-3" />
                            AI Assistance Details
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">User Prompt:</span>
                              <p className="text-blue-700 italic">"{aiContext.userPrompt}"</p>
                            </div>
                            
                            {aiContext.changesMade.length > 0 && (
                              <div>
                                <span className="font-medium">Changes Made:</span>
                                <ul className="list-disc list-inside text-blue-700 ml-2">
                                  {aiContext.changesMade.map((change: string, idx: number) => (
                                    <li key={idx}>{change}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {aiContext.affectedComponents.length > 0 && (
                              <div>
                                <span className="font-medium">Affected Components:</span>
                                <div className="flex gap-1 flex-wrap mt-1">
                                  {aiContext.affectedComponents.map((component: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {component}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(entry.created_at), 'MMM dd, yyyy HH:mm')}
                        </div>
                        {entry.project_id && (
                          <div className="flex items-center gap-1">
                            <GitCommit className="h-3 w-3" />
                            Project: {entry.project_id.slice(0, 8)}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComprehensiveAITracker;
