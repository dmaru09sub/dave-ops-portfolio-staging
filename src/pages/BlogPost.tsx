
import { useParams, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/main-layout';
import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDaveOpsData } from '@/hooks/use-daveops-data';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import { MarkdownRenderer } from '@/components/markdown/markdown-renderer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts, loading } = useDaveOpsData();
  useScrollToTop();

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const post = blogPosts?.find(p => p.slug === slug && p.published);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-6 pb-8">
              <div className="space-y-4">
                {post.featured && (
                  <Badge variant="secondary" className="w-fit">
                    Featured
                  </Badge>
                )}
                <CardTitle className="text-4xl font-bold leading-tight">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time} min read</span>
                  </div>
                </div>
                {post.excerpt && (
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>
              
              {post.featured_image && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </CardHeader>
            
            <CardContent className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.content || ''} />
            </CardContent>
            
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <CardContent className="pt-0">
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
