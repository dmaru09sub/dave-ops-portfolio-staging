
import type { Json } from '@/integrations/supabase/types';

export interface Tutorial {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  difficulty_level: string | null;
  estimated_duration: number | null;
  tags: Json;
  image_url: string | null;
  published: boolean | null;
  coming_soon: boolean | null;
  sort_order: number | null;
  created_at: string | null;
  updated_at: string | null;
  youtube_url: string | null;
  category: string | null;
  featured: boolean | null;
}

export interface TutorialFormData {
  title: string;
  description: string;
  content: string;
  difficulty_level: string;
  estimated_duration: number;
  tags: string;
  image_url: string;
  published: boolean;
  coming_soon: boolean;
  sort_order: number;
  youtube_url: string;
  category: string;
  featured: boolean;
}
