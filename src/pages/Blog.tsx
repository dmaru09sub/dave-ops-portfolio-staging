
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/main-layout";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDaveOpsData } from "@/hooks/use-daveops-data";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { blogPosts, loading } = useDaveOpsData();
  
  const filteredBlogs = (blogPosts || []).filter(post => 
    post.published && (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  if (loading) {
    return (
      <MainLayout>
        <SiteHeader />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SiteHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Blog
            </h1>
            <p className="text-muted-foreground">
              Thoughts, ideas, and updates about DevOps, cloud architecture, and modern development
            </p>
          </div>
          
          <div className="relative">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto glass-effect"
            />
          </div>
          
          <div className="grid gap-6">
            {filteredBlogs.map((post) => (
              <Card key={post.id} className="hover-lift card-shadow overflow-hidden">
                <CardHeader className="space-y-1">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    {post.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.read_time} min read</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                  {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                  >
                    Read more
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            
            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchTerm ? "No articles found matching your search." : "No blog posts available yet. Check back soon!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
