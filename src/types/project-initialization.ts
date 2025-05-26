
export interface ProjectInitializationStatus {
  id: string;
  project_id: string;
  workflow_files_created: boolean;
  secrets_configured: boolean;
  repository_structure_valid: boolean;
  github_pages_enabled: boolean;
  initial_deployment_successful: boolean;
  configuration_complete: boolean;
  last_validation_at: string | null;
  validation_errors: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  requiredActions: RequiredAction[];
}

export interface RequiredAction {
  id: string;
  title: string;
  description: string;
  type: 'workflow' | 'secrets' | 'repository' | 'deployment';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  automated: boolean;
}

export interface TutorialProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  completed: boolean;
  progress_percentage: number;
  current_step: number;
  total_steps: number;
  completed_at: string | null;
  started_at: string;
  updated_at: string;
}

export interface TutorialSeries {
  id: string;
  title: string;
  description: string;
  tutorials: string[]; // Array of tutorial IDs in order
  prerequisites: string[];
  estimated_duration: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Raw database types (as returned by Supabase)
export interface RawProjectInitializationStatus {
  id: string;
  project_id: string;
  workflow_files_created: boolean;
  secrets_configured: boolean;
  repository_structure_valid: boolean;
  github_pages_enabled: boolean;
  initial_deployment_successful: boolean;
  configuration_complete: boolean;
  last_validation_at: string | null;
  validation_errors: any; // JSON type from database
  created_at: string;
  updated_at: string;
}

export interface RawTutorialSeries {
  id: string;
  title: string;
  description: string;
  tutorials: any; // JSON type from database
  prerequisites: any; // JSON type from database
  estimated_duration: number;
  difficulty_level: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
