
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
  is_active?: boolean;
}

interface AboutContentProps {
  aboutContent: AboutContent | null;
}

export const AboutContent = ({ aboutContent }: AboutContentProps) => {
  // Default content when no active content is found
  const defaultContent = {
    title: "About Dave-Ops",
    content: `This portfolio was engineered as a showcase of modern cloud architecture, automation, and creativity. Built on a foundation of cutting-edge technologies—including cloud-native solutions, AI integrations, DevOps pipelines, Edge Functions, and a performant static React frontend—this site reflects deep expertise in integration, troubleshooting, and scalable web development.

At its core, the portfolio is backed by a robust admin management portal, enabling full end-to-end CI/CD automation. Not only does this system manage the portfolio itself, but it also orchestrates and maintains all referenced GitHub projects, ensuring that every element is always up-to-date and production-ready.

As my journey continues, I'll be sharing the knowledge behind this platform through a series of YouTube tutorials—breaking down how each piece fits together and exploring the latest trends in DevOps, cloud, and AI. Whether you're an aspiring developer, a seasoned engineer, or simply curious, I invite you to learn, build, and grow along with me.`
  };

  const displayContent = aboutContent || defaultContent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{displayContent.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {displayContent.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
