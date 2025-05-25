
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useChangelog } from '@/hooks/use-changelog';
import type { Json } from '@/integrations/supabase/types';

interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  technologies: Json;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
}

interface PortfolioFormData {
  title: string;
  description: string;
  long_description: string;
  technologies: string;
  github_url: string;
  demo_url: string;
  image_url: string;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export const usePortfolioManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { createEntry } = useChangelog();

  const [formData, setFormData] = useState<PortfolioFormData>({
    title: '',
    description: '',
    long_description: '',
    technologies: '',
    github_url: '',
    demo_url: '',
    image_url: '',
    featured: false,
    published: true,
    sort_order: 0
  });

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('daveops_portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from('daveops_portfolio_projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        
        toast({ title: 'Success', description: 'Project updated successfully' });
        
        await createEntry({
          title: `AI-Assisted: Updated portfolio project: ${formData.title}`,
          description: `Modified portfolio project configuration using AI assistance`,
          change_type: 'improvement',
          severity: 'minor',
          project_id: null,
          published: true,
          metadata: {
            action: 'portfolio_project_updated',
            project_name: formData.title,
            ai_assisted: true,
            user_prompt: 'User updated portfolio project',
            changes_made: ['Updated project details', 'Modified configuration'],
            affected_components: ['portfolio-management']
          }
        });
      } else {
        const { error } = await supabase
          .from('daveops_portfolio_projects')
          .insert([projectData]);

        if (error) throw error;
        
        toast({ title: 'Success', description: 'Project created successfully' });
        
        await createEntry({
          title: `AI-Assisted: Created new portfolio project: ${formData.title}`,
          description: `Added new portfolio project using AI assistance`,
          change_type: 'feature',
          severity: 'minor',
          project_id: null,
          published: true,
          metadata: {
            action: 'portfolio_project_created',
            project_name: formData.title,
            ai_assisted: true,
            user_prompt: 'User created new portfolio project',
            changes_made: ['Created new portfolio project', 'Set up project configuration'],
            affected_components: ['portfolio-management']
          }
        });
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    const technologiesArray = Array.isArray(project.technologies) ? project.technologies : [];
    setFormData({
      title: project.title,
      description: project.description || '',
      long_description: project.long_description || '',
      technologies: technologiesArray.join(', '),
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      image_url: project.image_url || '',
      featured: project.featured,
      published: project.published,
      sort_order: project.sort_order
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('daveops_portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Success', description: 'Project deleted successfully' });
      
      await createEntry({
        title: `AI-Assisted: Deleted portfolio project`,
        description: `Removed portfolio project using AI assistance`,
        change_type: 'improvement',
        severity: 'minor',
        project_id: null,
        published: true,
        metadata: {
          action: 'portfolio_project_deleted',
          ai_assisted: true,
          user_prompt: 'User deleted portfolio project',
          changes_made: ['Deleted portfolio project'],
          affected_components: ['portfolio-management']
        }
      });
      
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive'
      });
    }
  };

  const togglePublished = async (project: Project) => {
    try {
      const { error } = await supabase
        .from('daveops_portfolio_projects')
        .update({ published: !project.published })
        .eq('id', project.id);

      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      long_description: '',
      technologies: '',
      github_url: '',
      demo_url: '',
      image_url: '',
      featured: false,
      published: true,
      sort_order: 0
    });
    setEditingProject(null);
    setIsCreating(false);
  };

  return {
    projects,
    loading,
    editingProject,
    isCreating,
    formData,
    setFormData,
    setIsCreating,
    handleSubmit,
    handleEdit,
    handleDelete,
    togglePublished,
    resetForm
  };
};
