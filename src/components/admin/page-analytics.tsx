
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePageViewStats } from '@/hooks/use-page-view-stats';
import { Eye, Users, Calendar, TrendingUp, Activity, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PageAnalytics: React.FC = () => {
  const { data: pageStats, isLoading, error, refetch } = usePageViewStats();

  const formatPagePath = (path: string) => {
    if (path === '/') return 'Home';
    return path.replace('/', '').replace(/^\w/, c => c.toUpperCase());
  };

  const totalViews = pageStats?.reduce((sum, page) => sum + page.total_views, 0) || 0;
  const totalUniqueViews = pageStats?.reduce((sum, page) => sum + page.unique_views, 0) || 0;
  const todayViews = pageStats?.reduce((sum, page) => sum + page.views_today, 0) || 0;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Page Analytics
          </CardTitle>
          <CardDescription>Loading page view statistics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
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
            Analytics Error
          </CardTitle>
          <CardDescription>Failed to load page view statistics</CardDescription>
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
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUniqueViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unique sessions tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Views</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Views since midnight</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Page Performance
          </CardTitle>
          <CardDescription>
            Detailed breakdown of page views and engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pageStats && pageStats.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Total Views</TableHead>
                  <TableHead className="text-right">Unique Views</TableHead>
                  <TableHead className="text-right">Today</TableHead>
                  <TableHead className="text-right">This Week</TableHead>
                  <TableHead className="text-right">This Month</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageStats.map((page) => (
                  <TableRow key={page.page_path}>
                    <TableCell className="font-medium">
                      {formatPagePath(page.page_path)}
                      <div className="text-xs text-muted-foreground">{page.page_path}</div>
                    </TableCell>
                    <TableCell className="text-right">{page.total_views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.unique_views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.views_today.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.views_this_week.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{page.views_this_month.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No Data Available</p>
              <p>No page view data available yet. Visit some pages to start tracking!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PageAnalytics;
