
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url?: string;
  published: boolean;
  sort_order: number;
}

interface AboutContentProps {
  aboutContent: AboutContent[];
}

export const AboutContent = ({ aboutContent }: AboutContentProps) => {
  // Updated default content to match your professional background
  const defaultContent = {
    hero: {
      title: "About Dave-Ops",
      content: `This portfolio was engineered as a showcase of modern cloud architecture, automation, and creativity. Built on a foundation of cutting-edge technologies—including cloud-native solutions, AI integrations, DevOps pipelines, Edge Functions, and a performant static React frontend—this site reflects deep expertise in integration, troubleshooting, and scalable web development.

At its core, the portfolio is backed by a robust admin management portal, enabling full end-to-end CI/CD automation. Not only does this system manage the portfolio itself, but it also orchestrates and maintains all referenced GitHub projects, ensuring that every element is always up-to-date and production-ready.`
    },
    mission: {
      title: "Educational Mission & Open Source Template",
      content: `As my journey continues, I'll be sharing the knowledge behind this platform through a series of YouTube tutorials—breaking down how each piece fits together and exploring the latest trends in DevOps, cloud, and AI. Whether you're an aspiring developer, a seasoned engineer, or simply curious, I invite you to learn, build, and grow along with me.

This entire system is available as an open-source template for public use and learning. The complete documentation, setup guides, and best practices are included to help others implement their own 3-stage deployment pipelines.`
    },
    experience: {
      title: "Professional Background & Expertise",
      content: `I've been working with technology since I was 10 years old, and have held professional positions in the field for over 16 years. Technology comes naturally to me—if I don't understand something at first, you can bet I will master it through persistence and dedication.

This deep experience spans full-stack development, cloud architecture, DevOps practices, and emerging technologies. My approach combines technical excellence with practical problem-solving, always focusing on scalable, maintainable solutions that deliver real business value.`
    },
    architecture: {
      title: "3-Stage Pipeline Architecture",
      content: `• **DEV Stage**: Lovable environment with AI assistance and real-time preview
• **STAGE Stage**: Cleaned build without Lovable references for integration testing  
• **PROD Stage**: Static files deployed via GitHub Pages for production

**Core Technologies:**
• React 18 + TypeScript + Vite + Tailwind CSS + Shadcn UI
• Supabase (Database + Auth + Edge Functions + Real-time)
• GitHub Actions with custom 3-stage workflows
• Automated Lovable reference cleaning
• Real-time status tracking and comprehensive changelog`
    },
    features: {
      title: "Key Features & Capabilities",
      content: `• **Admin Dashboard**: Central command center for deployment management
• **Tutorial System**: Comprehensive CI/CD setup guides and documentation
• **AI-Enhanced Development**: Comprehensive change tracking with AI context
• **Content Management**: Synchronized admin portal and public content
• **Real-time Monitoring**: Deployment status tracking with timeout detection
• **Educational Resources**: Open-source template with complete documentation`
    }
  };

  const hasValidContent = aboutContent.length > 0 && 
    aboutContent.some(section => section.content && section.content.length > 100);

  return (
    <div className="space-y-8">
      {hasValidContent ? (
        aboutContent.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{defaultContent.hero.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {defaultContent.hero.content}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{defaultContent.experience.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {defaultContent.experience.content}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{defaultContent.mission.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {defaultContent.mission.content}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{defaultContent.architecture.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {defaultContent.architecture.content}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{defaultContent.features.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {defaultContent.features.content}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
