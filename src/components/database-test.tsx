
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface TestResult {
  table: string;
  operation: string;
  status: 'success' | 'error' | 'testing';
  message: string;
  data?: any;
  error?: any;
}

const DatabaseTest: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runDatabaseTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      {
        table: 'daveops_site_info',
        operation: 'SELECT (public access)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_site_info')
            .select('*')
            .limit(5);
          return { data, error };
        }
      },
      {
        table: 'daveops_about_content',
        operation: 'SELECT (published=true)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_about_content')
            .select('*')
            .eq('published', true)
            .limit(5);
          return { data, error };
        }
      },
      {
        table: 'daveops_portfolio_projects',
        operation: 'SELECT (published=true)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_portfolio_projects')
            .select('*')
            .eq('published', true)
            .limit(5);
          return { data, error };
        }
      },
      {
        table: 'daveops_tutorials',
        operation: 'SELECT (published=true)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_tutorials')
            .select('*')
            .eq('published', true)
            .limit(5);
          return { data, error };
        }
      },
      {
        table: 'daveops_page_views',
        operation: 'INSERT (page tracking)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_page_views')
            .insert({
              page_path: '/test',
              session_id: 'test-session-' + Date.now(),
              user_agent: 'Database Test'
            })
            .select();
          return { data, error };
        }
      },
      {
        table: 'daveops_contact_submissions',
        operation: 'INSERT (contact form)',
        test: async () => {
          const { data, error } = await supabase
            .from('daveops_contact_submissions')
            .insert({
              name: 'Test User',
              email: 'test@example.com',
              subject: 'Database Test',
              message: 'This is a test submission from the database test component'
            })
            .select();
          return { data, error };
        }
      }
    ];

    for (const test of tests) {
      setTestResults(prev => [...prev, {
        table: test.table,
        operation: test.operation,
        status: 'testing',
        message: 'Running test...'
      }]);

      try {
        const result = await test.test();
        
        setTestResults(prev => prev.map(item => 
          item.table === test.table && item.operation === test.operation
            ? {
                ...item,
                status: result.error ? 'error' : 'success',
                message: result.error 
                  ? `Error: ${result.error.message}` 
                  : `Success: ${result.data?.length || 0} records`,
                data: result.data,
                error: result.error
              }
            : item
        ));
      } catch (error) {
        console.error('Test error:', error);
        setTestResults(prev => prev.map(item => 
          item.table === test.table && item.operation === test.operation
            ? {
                ...item,
                status: 'error',
                message: `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                error: error
              }
            : item
        ));
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runDatabaseTests();
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'testing':
        return <AlertCircle className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      testing: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Database Connection Test
          <Button onClick={runDatabaseTests} disabled={isRunning} size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Testing...' : 'Re-run Tests'}
          </Button>
        </CardTitle>
        <CardDescription>
          Testing database access and RLS policies for public data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{testResults.length}</div>
            <div className="text-sm text-muted-foreground">Total Tests</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{successCount}</div>
            <div className="text-sm text-muted-foreground">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{errorCount}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
        </div>

        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="font-medium">{result.table}</div>
                  <div className="text-sm text-muted-foreground">{result.operation}</div>
                  <div className={`text-sm mt-1 ${result.status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                    {result.message}
                  </div>
                  {result.error && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">Error Details</summary>
                      <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(result.error, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
              {getStatusBadge(result.status)}
            </div>
          ))}
        </div>

        {errorCount === 0 && testResults.length > 0 && !isRunning && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">✅ All Tests Passed!</h4>
            <p className="text-sm text-green-700">
              Database access is working correctly. All RLS policies are properly configured for public access.
            </p>
          </div>
        )}

        {errorCount > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">❌ Some Tests Failed</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Check if RLS policies allow public access to published content</li>
              <li>• Verify anonymous users can access required tables</li>
              <li>• Contact form and page views should allow anonymous INSERT</li>
              <li>• Check Supabase project settings and API keys</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
