
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Link } from "lucide-react";
import { Project } from "@/hooks/use-projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Extract tech stack from technologies JSON or tech_stack array
  const techStack = project.tech_stack || 
    (Array.isArray(project.technologies) ? project.technologies : []) ||
    [];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image_url || "/placeholder.svg"} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mt-2">
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <a href={project.demo_url || project.live_url || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={project.github_url || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            Code
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
