
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ExternalLink, Github, User, Calendar, Tag } from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';

const ChangelogSection: React.FC = () => {
  const { entries, loading } = useChangelog();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
          <CardDescription>Latest updates and changelog entries</CardDescription>
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

  const recentEntries = entries.slice(0, 10);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Changes
        </CardTitle>
        <CardDescription>
          Latest updates and changelog entries across all projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No changelog entries yet. Changes will appear here automatically.
          </div>
        ) : (
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChangelogSection;
