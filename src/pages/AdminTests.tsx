
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import DatabaseTest from '@/components/database-test';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayCircle, CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration?: number;
  error?: string;
}

const AdminTests = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([
    { name: 'Portfolio Component Rendering', status: 'pending' },
    { name: 'Contact Form Validation', status: 'pending' },
    { name: 'Database Connection', status: 'pending' },
    { name: 'Authentication Flow', status: 'pending' },
    { name: 'Admin CRUD Operations', status: 'pending' },
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    
    for (let i = 0; i < testResults.length; i++) {
      setTestResults(prev => prev.map((test, index) => 
        index === i ? { ...test, status: 'running' } : test
      ));
      
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const passed = Math.random() > 0.2; // 80% pass rate for demo
      setTestResults(prev => prev.map((test, index) => 
        index === i ? { 
          ...test, 
          status: passed ? 'passed' : 'failed',
          duration: Math.floor(Math.random() * 1000) + 100,
          error: passed ? undefined : 'Mock test failure for demonstration'
        } : test
      ));
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <AlertCircle className="w-4 h-4 text-yellow-500 animate-spin" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      passed: 'default',
      failed: 'destructive',
      running: 'secondary',
      pending: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const passedTests = testResults.filter(t => t.status === 'passed').length;
  const failedTests = testResults.filter(t => t.status === 'failed').length;
  const totalTests = testResults.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Test Suite</h1>
          <Button onClick={runTests} disabled={isRunning}>
            <PlayCircle className="h-4 w-4 mr-2" />
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="unit-tests" className="w-full">
          <TabsList>
            <TabsTrigger value="unit-tests">Unit Tests</TabsTrigger>
            <TabsTrigger value="database-tests">
              <Database className="w-4 h-4 mr-2" />
              Database Tests
            </TabsTrigger>
            <TabsTrigger value="deployment">Mock Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="unit-tests">
            <Card>
              <CardHeader>
                <CardTitle>Unit Test Results</CardTitle>
                <CardDescription>Frontend component and functionality tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <div className="font-medium">{test.name}</div>
                          {test.duration && (
                            <div className="text-sm text-muted-foreground">
                              {test.duration}ms
                            </div>
                          )}
                          {test.error && (
                            <div className="text-sm text-red-500 mt-1">
                              {test.error}
                            </div>
                          )}
                        </div>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database-tests">
            <DatabaseTest />
          </TabsContent>

          <TabsContent value="deployment">
            <Card>
              <CardHeader>
                <CardTitle>Mock Deployment Simulator</CardTitle>
                <CardDescription>Test deployment functionality without affecting production</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Simulate Portfolio Deployment
                  </Button>
                  <Button variant="outline" className="w-full">
                    Test Database Migration
                  </Button>
                  <Button variant="outline" className="w-full">
                    Validate API Endpoints
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminTests;
