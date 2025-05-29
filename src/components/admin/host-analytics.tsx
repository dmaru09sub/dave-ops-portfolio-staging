
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useHostViewStats } from '@/hooks/use-page-view-stats';
import { Globe, TrendingUp, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HostAnalytics: React.FC = () => {
  const { data: hostStats, isLoading, error, refetch } = useHostViewStats();

  const formatHostname = (hostname: string) => {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'Local Development';
    if (hostname.includes('lovable.app')) return 'Lovable Preview';
    if (hostname.includes('github.io')) return 'GitHub Pages';
    if (hostname === 'dave-ops.net' || hostname === 'www.dave-ops.net') return 'Production Site';
    return hostname;
  };

  const getHostType = (hostname: string) => {
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'development';
    if (hostname.includes('lovable.app')) return 'staging';
    if (hostname.includes('github.io')) return 'production';
    if (hostname === 'dave-ops.net' || hostname === 'www.dave-ops.net') return 'production';
    return 'other';
  };

  const getHostBadgeColor = (hostname: string) => {
    const type = getHostType(hostname);
    switch (type) {
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Host Analytics
          </CardTitle>
          <CardDescription>Loading host-based page view statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Host Analytics Error
          </CardTitle>
          <CardDescription>Failed to load host analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              Error: {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Host Analytics
        </CardTitle>
        <CardDescription>
          Page views broken down by hosting environment and domain
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hostStats && hostStats.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Host</TableHead>
                <TableHead className="text-right">Total Views</TableHead>
                <TableHead className="text-right">Unique Views</TableHead>
                <TableHead className="text-right">Today</TableHead>
                <TableHead className="text-right">This Week</TableHead>
                <TableHead className="text-right">This Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostStats.map((host) => (
                <TableRow key={host.hostname}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{formatHostname(host.hostname)}</div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getHostBadgeColor(host.hostname)}`}>
                          {getHostType(host.hostname)}
                        </span>
                        <div className="text-xs text-muted-foreground">{host.origin}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{host.total_views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{host.unique_views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{host.views_today.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{host.views_this_week.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{host.views_this_month.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No Host Data Available</p>
            <p>No host analytics data available yet. Visit pages to start tracking!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HostAnalytics;
