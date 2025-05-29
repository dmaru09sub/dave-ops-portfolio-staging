
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { 
  Calendar, 
  Github, 
  User, 
  Tag, 
  Bot, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useChangelog } from '@/hooks/use-changelog';

const ImprovedChangelogSection: React.FC = () => {
  const { entries, loading } = useChangelog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchTerm || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || entry.change_type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Changes
        </CardTitle>
        <CardDescription>
          Latest updates and changelog entries ({filteredEntries.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Search changes..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1"
              />
            </div>
            
            <Select value={selectedType} onValueChange={(value) => {
              setSelectedType(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="feature">Features</SelectItem>
                <SelectItem value="bugfix">Bug Fixes</SelectItem>
                <SelectItem value="enhancement">Enhancements</SelectItem>
                <SelectItem value="breaking">Breaking</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Entries */}
          {paginatedEntries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No changelog entries found matching your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedEntries.map((entry) => (
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
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {entry.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(entry.created_at), 'MMM d, HH:mm')}
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
                    
                    {entry.github_commit_url && (
                      <a 
                        href={entry.github_commit_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 text-xs ml-4"
                      >
                        <Github className="h-3 w-3" />
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEntries.length)} of {filteredEntries.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovedChangelogSection;
