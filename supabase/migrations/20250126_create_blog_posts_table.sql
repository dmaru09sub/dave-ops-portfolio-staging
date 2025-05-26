
-- Create the missing blog posts table
CREATE TABLE IF NOT EXISTS public.daveops_blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  slug text NOT NULL UNIQUE,
  tags jsonb DEFAULT '[]'::jsonb,
  featured_image text,
  published boolean DEFAULT true,
  featured boolean DEFAULT false,
  read_time integer DEFAULT 5,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.daveops_blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Add missing columns to tutorials table for better management
ALTER TABLE public.daveops_tutorials 
ADD COLUMN IF NOT EXISTS youtube_url text,
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Insert the CI/CD tutorial as a managed tutorial
INSERT INTO public.daveops_tutorials (
  title,
  description,
  content,
  difficulty_level,
  estimated_duration,
  tags,
  published,
  featured,
  category,
  sort_order
) VALUES (
  '3-Stage CI/CD Pipeline Setup',
  'Complete guide to setting up DEV → STAGE → PROD deployment pipeline with automated Lovable reference cleaning, GitHub Actions integration, and real-time status monitoring.',
  'Learn how to implement a robust 3-stage deployment pipeline with automated Lovable reference cleaning, GitHub Actions integration, and real-time status monitoring. This comprehensive guide covers everything from project requirements to troubleshooting common issues.',
  'intermediate',
  20,
  '["CI/CD", "GitHub Actions", "DevOps", "Automation"]'::jsonb,
  true,
  true,
  'DevOps',
  1
) ON CONFLICT DO NOTHING;
