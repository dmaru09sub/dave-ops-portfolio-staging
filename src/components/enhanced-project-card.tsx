
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Link, Star, Calendar } from "lucide-react";
import { Project } from "@/hooks/use-projects";

interface EnhancedProjectCardProps {
  project: Project;
  showFeatured?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

const EnhancedProjectCard = ({ 
  project, 
  showFeatured = true, 
  variant = 'default' 
}: EnhancedProjectCardProps) => {
  const techStack = project.tech_stack || 
    (Array.isArray(project.technologies) ? project.technologies : []) ||
    [];

  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${isCompact ? 'h-fit' : ''}`}>
      {!isCompact && (
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={project.image_url || "/placeholder.svg"} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {showFeatured && project.featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader className={isCompact ? 'pb-3' : ''}>
        <div className="flex justify-between items-start">
          <CardTitle className={isCompact ? 'text-lg' : 'text-xl'}>
            {project.title}
          </CardTitle>
          {isCompact && showFeatured && project.featured && (
            <Badge variant="secondary" className="ml-2">
              <Star className="h-3 w-3" />
            </Badge>
          )}
        </div>
        <CardDescription className={isDetailed ? 'line-clamp-none' : 'line-clamp-2'}>
          {isDetailed ? project.long_description || project.description : project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={isCompact ? 'pt-0' : ''}>
        {isDetailed && (
          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(project.created_at).toLocaleDateString()}
            </div>
            {project.category && (
              <Badge variant="outline">{project.category}</Badge>
            )}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, isCompact ? 3 : 6).map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary"
              className="text-xs"
            >
              {tech}
            </Badge>
          ))}
          {techStack.length > (isCompact ? 3 : 6) && (
            <Badge variant="secondary" className="text-xs">
              +{techStack.length - (isCompact ? 3 : 6)}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2">
        <Button 
          variant="outline" 
          size={isCompact ? "sm" : "default"} 
          asChild 
          className="flex-1"
        >
          <a 
            href={project.demo_url || project.live_url || "#"} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center justify-center gap-2"
          >
            <Link className="h-4 w-4" />
            {isCompact ? 'Demo' : 'Live Demo'}
          </a>
        </Button>
        <Button 
          variant="outline" 
          size={isCompact ? "sm" : "default"} 
          asChild 
          className="flex-1"
        >
          <a 
            href={project.github_url || "#"} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Github className="h-4 w-4" />
            {isCompact ? 'Code' : 'Source'}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnhancedProjectCard;
