
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Edit, Eye, EyeOff } from 'lucide-react';

interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url: string;
  published: boolean;
  sort_order: number;
  is_active: boolean;
  updated_at: string;
}

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    published: true
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_about_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setContent(data);
        setFormData({
          title: data.title || '',
          content: data.content || '',
          image_url: data.image_url || '',
          published: data.published
        });
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch about content',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (content) {
        // Update existing content
        const { error } = await supabase
          .from('daveops_about_content')
          .update({
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url,
            published: formData.published,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'About content updated successfully' });
      } else {
        // Create new content
        const { error } = await supabase
          .from('daveops_about_content')
          .insert([{
            section_key: 'main',
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url,
            published: formData.published,
            is_active: true,
            sort_order: 0
          }]);

        if (error) throw error;
        toast({ title: 'Success', description: 'About content created successfully' });
      }

      setEditing(false);
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async () => {
    if (!content) return;

    try {
      const { error } = await supabase
        .from('daveops_about_content')
        .update({ published: !content.published })
        .eq('id', content.id);

      if (error) throw error;
      fetchContent();
      toast({ 
        title: 'Success', 
        description: `Content ${!content.published ? 'published' : 'unpublished'} successfully` 
      });
    } catch (error) {
      console.error('Error toggling published status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update published status',
        variant: 'destructive'
      });
    }
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
          <h1 className="text-3xl font-bold">About Content Management</h1>
          <div className="flex gap-2">
            {content && (
              <Button
                variant="outline"
                onClick={togglePublished}
                className="flex items-center gap-2"
              >
                {content.published ? (
                  <>
                    <Eye className="h-4 w-4" />
                    Published
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Draft
                  </>
                )}
              </Button>
            )}
            {!editing && (
              <Button onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
            )}
          </div>
        </div>

        {editing ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit About Content</CardTitle>
              <CardDescription>
                Update the main about content that appears on the About page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="About Dave-Ops"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    placeholder="Write your about content here..."
                    className="min-h-[300px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Image URL (Optional)</label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span className="text-sm">Published</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Content'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Current About Content</CardTitle>
              <CardDescription>
                {content ? 'Preview of the active about content' : 'No active about content found'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {content ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {new Date(content.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="whitespace-pre-line text-sm">{content.content}</p>
                  </div>
                  {content.image_url && (
                    <div>
                      <p className="text-sm font-medium">Image URL:</p>
                      <p className="text-sm text-muted-foreground break-all">{content.image_url}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No about content found</p>
                  <Button onClick={() => setEditing(true)}>
                    Create About Content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
