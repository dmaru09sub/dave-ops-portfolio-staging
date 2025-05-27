
export interface ProjectInitializationStatus {
  id: string;
  project_id: string;
  configuration_complete: boolean;
  workflow_files_created: boolean;
  secrets_configured: boolean;
  github_pages_enabled: boolean;
  repository_structure_valid: boolean;
  initial_deployment_successful: boolean;
  validation_errors: any[];
  last_validation_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RawProjectInitializationStatus {
  id: string;
  project_id: string;
  configuration_complete: boolean;
  workflow_files_created: boolean;
  secrets_configured: boolean;
  github_pages_enabled: boolean;
  repository_structure_valid: boolean;
  initial_deployment_successful: boolean;
  validation_errors: any;
  last_validation_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RequiredAction {
  id: string;
  title: string;
  description: string;
  type: 'repository' | 'workflow' | 'secrets' | 'deployment';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  automated: boolean;
}

export interface ProjectValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  requiredActions: RequiredAction[];
}

export interface ProjectInitializationResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface ProjectInitializationConfig {
  projectId: string;
  sourceRepo: string;
  stageRepo?: string;
  prodRepo?: string;
  workflowFile: string;
  buildCommand: string;
  projectType: string;
}

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
