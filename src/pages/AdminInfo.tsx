
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, ExternalLink } from 'lucide-react';

interface SiteInfo {
  id: string;
  setting_key: string;
  setting_value: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

const AdminInfo = () => {
  const [siteInfo, setSiteInfo] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSiteInfo();
  }, []);

  const fetchSiteInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_site_info')
        .select('*');

      if (error) throw error;

      const infoMap: Record<string, string> = {};
      (data as SiteInfo[])?.forEach((item) => {
        infoMap[item.setting_key] = item.setting_value || '';
      });
      
      setSiteInfo(infoMap);
    } catch (error) {
      console.error('Error fetching site info:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch site information',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSiteInfo = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('daveops_site_info')
        .upsert({ 
          setting_key: key, 
          setting_value: value,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'setting_key' 
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating site info:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatePromises = Object.entries(siteInfo).map(([key, value]) =>
        updateSiteInfo(key, value)
      );

      await Promise.all(updatePromises);

      toast({
        title: 'Success',
        description: 'Site information updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update site information',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setSiteInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Site Information</h1>
            <p className="text-muted-foreground">
              Manage your site's basic information and social links
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Core site details and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  value={siteInfo.site_title || ''}
                  onChange={(e) => handleInputChange('site_title', e.target.value)}
                  placeholder="Dave-Ops.Net"
                />
              </div>

              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={siteInfo.site_description || ''}
                  onChange={(e) => handleInputChange('site_description', e.target.value)}
                  placeholder="DevOps Portfolio and Tutorials"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={siteInfo.contact_email || ''}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="admin@dave-ops.net"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Your professional social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="github_url"
                    value={siteInfo.github_url || ''}
                    onChange={(e) => handleInputChange('github_url', e.target.value)}
                    placeholder="https://github.com/dmaru09sub"
                  />
                  {siteInfo.github_url && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={siteInfo.github_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="linkedin_url"
                    value={siteInfo.linkedin_url || ''}
                    onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {siteInfo.linkedin_url && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={siteInfo.linkedin_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="twitter_url"
                    value={siteInfo.twitter_url || ''}
                    onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                    placeholder="https://twitter.com/your-handle"
                  />
                  {siteInfo.twitter_url && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={siteInfo.twitter_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="youtube_url">YouTube Channel URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="youtube_url"
                    value={siteInfo.youtube_url || ''}
                    onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                    placeholder="https://youtube.com/@your-channel"
                  />
                  {siteInfo.youtube_url && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={siteInfo.youtube_url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How your information appears across the site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{siteInfo.site_title || 'Site Title'}</h3>
              <p className="text-muted-foreground mb-2">
                {siteInfo.site_description || 'Site description will appear here'}
              </p>
              <p className="text-sm">
                Contact: {siteInfo.contact_email || 'contact@example.com'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminInfo;
