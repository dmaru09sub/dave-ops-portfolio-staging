
export interface TutorialSeries {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  prerequisites: string[];
  estimated_duration: number;
  tutorials: TutorialItem[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  sort_order: number;
  estimated_duration?: number;
  completed?: boolean;
  // Additional properties needed for the enhanced tutorials
  duration?: number;
  difficulty?: string;
  status?: 'available' | 'coming-soon';
  path?: string;
  // Allow additional properties for flexibility
  [key: string]: any;
}

export interface TutorialProgress {
  id: string;
  user_id: string;
  tutorial_id?: string;
  tutorial_type: string;
  current_step: number;
  total_steps: number;
  progress_percentage: number;
  completed: boolean;
  started_at: string;
  completed_at?: string;
  updated_at: string;
  metadata: any;
}

export interface RawTutorialSeries {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  prerequisites: any;
  estimated_duration: number;
  tutorials: any;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Database-compatible types for Supabase operations
export interface TutorialSeriesInsert {
  title: string;
  description?: string;
  difficulty_level?: string;
  estimated_duration?: number;
  prerequisites?: any; // JSON type
  tutorials?: any; // JSON type
  published?: boolean;
  sort_order?: number;
}

export interface TutorialSeriesUpdate {
  title?: string;
  description?: string;
  difficulty_level?: string;
  estimated_duration?: number;
  prerequisites?: any; // JSON type
  tutorials?: any; // JSON type
  published?: boolean;
  sort_order?: number;
}
