
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnifiedMarkdownRenderer } from "@/components/markdown/unified-markdown-renderer";
import { useAboutContent } from "@/hooks/use-about-content";

export const EnhancedAboutContent = () => {
  const { aboutContent, loading, error } = useAboutContent();

  // Default content when no active content is found
  const defaultContent = {
    title: "About Dave-Ops",
    content: `# Welcome to Dave-Ops

This portfolio was engineered as a **showcase of modern cloud architecture**, automation, and creativity. Built on a foundation of cutting-edge technologies—including:

- Cloud-native solutions
- AI integrations  
- DevOps pipelines
- Edge Functions
- Performant static React frontend

This site reflects deep expertise in **integration**, **troubleshooting**, and **scalable web development**.

## Core Features

At its core, the portfolio is backed by a robust admin management portal, enabling full end-to-end CI/CD automation. Not only does this system manage the portfolio itself, but it also orchestrates and maintains all referenced GitHub projects, ensuring that every element is always up-to-date and production-ready.

## Educational Mission

As my journey continues, I'll be sharing the knowledge behind this platform through a series of **YouTube tutorials**—breaking down how each piece fits together and exploring the latest trends in:

- DevOps best practices
- Cloud architecture
- AI integration strategies

Whether you're an aspiring developer, a seasoned engineer, or simply curious, I invite you to **learn, build, and grow** along with me.

---

> *"The best way to learn is by doing, and the best way to do is by sharing knowledge."*`
  };

  if (loading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-fit border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Unable to load about content: {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  const displayContent = aboutContent || defaultContent;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-2xl">{displayContent.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <UnifiedMarkdownRenderer 
          content={displayContent.content}
          className="text-muted-foreground leading-relaxed"
        />
      </CardContent>
    </Card>
  );
};
