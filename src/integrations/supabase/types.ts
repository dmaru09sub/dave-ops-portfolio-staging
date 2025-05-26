export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          context: Json | null
          conversation_type: string
          created_at: string
          id: string
          messages: Json
          trip_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context?: Json | null
          conversation_type?: string
          created_at?: string
          id?: string
          messages?: Json
          trip_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context?: Json | null
          conversation_type?: string
          created_at?: string
          id?: string
          messages?: Json
          trip_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      checklist_categories: {
        Row: {
          checklist_id: string
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          checklist_id: string
          created_at?: string
          icon: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          checklist_id?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_categories_checklist_id_fkey"
            columns: ["checklist_id"]
            isOneToOne: false
            referencedRelation: "checklists"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_items: {
        Row: {
          ai_metadata: Json | null
          category_id: string
          checked: boolean
          created_at: string
          id: string
          name: string
          notes: string | null
          priority: string | null
          reference_id: string | null
          source: string
          updated_at: string
        }
        Insert: {
          ai_metadata?: Json | null
          category_id: string
          checked?: boolean
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          priority?: string | null
          reference_id?: string | null
          source?: string
          updated_at?: string
        }
        Update: {
          ai_metadata?: Json | null
          category_id?: string
          checked?: boolean
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          priority?: string | null
          reference_id?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklist_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "checklist_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      checklists: {
        Row: {
          created_at: string
          id: string
          name: string
          trip_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          trip_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          trip_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_about_content: {
        Row: {
          content: string | null
          id: string
          image_url: string | null
          published: boolean | null
          section_key: string
          sort_order: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          section_key: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          section_key?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_blog_posts: {
        Row: {
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          published: boolean | null
          read_time: number | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          read_time?: number | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          read_time?: number | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_changelog_affected_files: {
        Row: {
          change_type: string
          changelog_entry_id: string
          created_at: string
          file_path: string
          id: string
          lines_added: number | null
          lines_removed: number | null
        }
        Insert: {
          change_type: string
          changelog_entry_id: string
          created_at?: string
          file_path: string
          id?: string
          lines_added?: number | null
          lines_removed?: number | null
        }
        Update: {
          change_type?: string
          changelog_entry_id?: string
          created_at?: string
          file_path?: string
          id?: string
          lines_added?: number | null
          lines_removed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "daveops_changelog_affected_files_changelog_entry_id_fkey"
            columns: ["changelog_entry_id"]
            isOneToOne: false
            referencedRelation: "daveops_changelog_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_changelog_categories: {
        Row: {
          active: boolean | null
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      daveops_changelog_entries: {
        Row: {
          author_email: string | null
          author_github_username: string | null
          author_name: string | null
          change_type: string
          created_at: string
          deployment_id: string | null
          description: string | null
          github_commit_hash: string | null
          github_commit_url: string | null
          id: string
          metadata: Json | null
          project_id: string | null
          published: boolean | null
          pull_request_number: number | null
          pull_request_url: string | null
          severity: string
          tags: Json | null
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          author_email?: string | null
          author_github_username?: string | null
          author_name?: string | null
          change_type?: string
          created_at?: string
          deployment_id?: string | null
          description?: string | null
          github_commit_hash?: string | null
          github_commit_url?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          published?: boolean | null
          pull_request_number?: number | null
          pull_request_url?: string | null
          severity?: string
          tags?: Json | null
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          author_email?: string | null
          author_github_username?: string | null
          author_name?: string | null
          change_type?: string
          created_at?: string
          deployment_id?: string | null
          description?: string | null
          github_commit_hash?: string | null
          github_commit_url?: string | null
          id?: string
          metadata?: Json | null
          project_id?: string | null
          published?: boolean | null
          pull_request_number?: number | null
          pull_request_url?: string | null
          severity?: string
          tags?: Json | null
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daveops_changelog_entries_deployment_id_fkey"
            columns: ["deployment_id"]
            isOneToOne: false
            referencedRelation: "daveops_portfolio_deployments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daveops_changelog_entries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "daveops_deployment_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_changelog_entry_categories: {
        Row: {
          category_id: string
          changelog_entry_id: string
          created_at: string
          id: string
        }
        Insert: {
          category_id: string
          changelog_entry_id: string
          created_at?: string
          id?: string
        }
        Update: {
          category_id?: string
          changelog_entry_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daveops_changelog_entry_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "daveops_changelog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daveops_changelog_entry_categories_changelog_entry_id_fkey"
            columns: ["changelog_entry_id"]
            isOneToOne: false
            referencedRelation: "daveops_changelog_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_contact_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          replied: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      daveops_deployment_projects: {
        Row: {
          active: boolean | null
          build_command: string | null
          created_at: string
          deployment_url: string | null
          description: string | null
          github_repo: string
          github_workflow_file: string
          id: string
          is_source_private: boolean | null
          name: string
          prod_branch: string | null
          prod_repo: string | null
          prod_url: string | null
          project_type: string | null
          source_repo: string
          stage_branch: string | null
          stage_repo: string | null
          stage_url: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          build_command?: string | null
          created_at?: string
          deployment_url?: string | null
          description?: string | null
          github_repo: string
          github_workflow_file?: string
          id?: string
          is_source_private?: boolean | null
          name: string
          prod_branch?: string | null
          prod_repo?: string | null
          prod_url?: string | null
          project_type?: string | null
          source_repo: string
          stage_branch?: string | null
          stage_repo?: string | null
          stage_url?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          build_command?: string | null
          created_at?: string
          deployment_url?: string | null
          description?: string | null
          github_repo?: string
          github_workflow_file?: string
          id?: string
          is_source_private?: boolean | null
          name?: string
          prod_branch?: string | null
          prod_repo?: string | null
          prod_url?: string | null
          project_type?: string | null
          source_repo?: string
          stage_branch?: string | null
          stage_repo?: string | null
          stage_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      daveops_knowledge_base_articles: {
        Row: {
          category: string
          content: string | null
          created_at: string
          difficulty_level: string | null
          estimated_read_time: number | null
          featured: boolean
          id: string
          published: boolean
          slug: string
          sort_order: number
          tags: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content?: string | null
          created_at?: string
          difficulty_level?: string | null
          estimated_read_time?: number | null
          featured?: boolean
          id?: string
          published?: boolean
          slug: string
          sort_order?: number
          tags?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          difficulty_level?: string | null
          estimated_read_time?: number | null
          featured?: boolean
          id?: string
          published?: boolean
          slug?: string
          sort_order?: number
          tags?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      daveops_page_views: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown | null
          page_path: string
          session_id: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          page_path: string
          session_id: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          page_path?: string
          session_id?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daveops_portfolio_deployments: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          commit_hash: string | null
          created_at: string
          deployed_at: string | null
          deployment_stage: string | null
          deployment_url: string | null
          error_message: string | null
          id: string
          notes: string | null
          prod_commit_hash: string | null
          prod_deployed_at: string | null
          project_id: string | null
          source_commit_hash: string | null
          stage_commit_hash: string | null
          stage_deployed_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          commit_hash?: string | null
          created_at?: string
          deployed_at?: string | null
          deployment_stage?: string | null
          deployment_url?: string | null
          error_message?: string | null
          id?: string
          notes?: string | null
          prod_commit_hash?: string | null
          prod_deployed_at?: string | null
          project_id?: string | null
          source_commit_hash?: string | null
          stage_commit_hash?: string | null
          stage_deployed_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          commit_hash?: string | null
          created_at?: string
          deployed_at?: string | null
          deployment_stage?: string | null
          deployment_url?: string | null
          error_message?: string | null
          id?: string
          notes?: string | null
          prod_commit_hash?: string | null
          prod_deployed_at?: string | null
          project_id?: string | null
          source_commit_hash?: string | null
          stage_commit_hash?: string | null
          stage_deployed_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daveops_portfolio_deployments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "daveops_deployment_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_portfolio_projects: {
        Row: {
          created_at: string | null
          demo_url: string | null
          description: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          long_description: string | null
          published: boolean | null
          sort_order: number | null
          technologies: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          published?: boolean | null
          sort_order?: number | null
          technologies?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          long_description?: string | null
          published?: boolean | null
          sort_order?: number | null
          technologies?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_project_health_checks: {
        Row: {
          check_type: string
          created_at: string
          details: Json | null
          id: string
          last_checked_at: string
          message: string | null
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          check_type: string
          created_at?: string
          details?: Json | null
          id?: string
          last_checked_at?: string
          message?: string | null
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          check_type?: string
          created_at?: string
          details?: Json | null
          id?: string
          last_checked_at?: string
          message?: string | null
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daveops_project_health_checks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "daveops_deployment_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_project_initialization_status: {
        Row: {
          configuration_complete: boolean
          created_at: string
          github_pages_enabled: boolean
          id: string
          initial_deployment_successful: boolean
          last_validation_at: string | null
          project_id: string
          repository_structure_valid: boolean
          secrets_configured: boolean
          updated_at: string
          validation_errors: Json | null
          workflow_files_created: boolean
        }
        Insert: {
          configuration_complete?: boolean
          created_at?: string
          github_pages_enabled?: boolean
          id?: string
          initial_deployment_successful?: boolean
          last_validation_at?: string | null
          project_id: string
          repository_structure_valid?: boolean
          secrets_configured?: boolean
          updated_at?: string
          validation_errors?: Json | null
          workflow_files_created?: boolean
        }
        Update: {
          configuration_complete?: boolean
          created_at?: string
          github_pages_enabled?: boolean
          id?: string
          initial_deployment_successful?: boolean
          last_validation_at?: string | null
          project_id?: string
          repository_structure_valid?: boolean
          secrets_configured?: boolean
          updated_at?: string
          validation_errors?: Json | null
          workflow_files_created?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "daveops_project_initialization_status_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "daveops_deployment_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      daveops_projects: {
        Row: {
          category: string | null
          created_at: string | null
          demo_url: string | null
          description: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          long_description: string | null
          published: boolean | null
          sort_order: number | null
          tech_stack: string[] | null
          technologies: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          long_description?: string | null
          published?: boolean | null
          sort_order?: number | null
          tech_stack?: string[] | null
          technologies?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          long_description?: string | null
          published?: boolean | null
          sort_order?: number | null
          tech_stack?: string[] | null
          technologies?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_site_info: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      daveops_tutorial_series: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          id: string
          prerequisites: Json
          published: boolean
          sort_order: number
          title: string
          tutorials: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          prerequisites?: Json
          published?: boolean
          sort_order?: number
          title: string
          tutorials?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          prerequisites?: Json
          published?: boolean
          sort_order?: number
          title?: string
          tutorials?: Json
          updated_at?: string
        }
        Relationships: []
      }
      daveops_tutorial_user_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          current_step: number
          id: string
          metadata: Json | null
          progress_percentage: number
          started_at: string
          total_steps: number
          tutorial_id: string | null
          tutorial_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          current_step?: number
          id?: string
          metadata?: Json | null
          progress_percentage?: number
          started_at?: string
          total_steps?: number
          tutorial_id?: string | null
          tutorial_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          current_step?: number
          id?: string
          metadata?: Json | null
          progress_percentage?: number
          started_at?: string
          total_steps?: number
          tutorial_id?: string | null
          tutorial_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daveops_tutorials: {
        Row: {
          category: string | null
          coming_soon: boolean | null
          content: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          featured: boolean | null
          id: string
          image_url: string | null
          published: boolean | null
          sort_order: number | null
          tags: Json | null
          title: string
          updated_at: string | null
          youtube_url: string | null
        }
        Insert: {
          category?: string | null
          coming_soon?: boolean | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          sort_order?: number | null
          tags?: Json | null
          title: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Update: {
          category?: string | null
          coming_soon?: boolean | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          sort_order?: number | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      daveops_user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      embeddings: {
        Row: {
          content: string
          content_id: string
          content_type: string
          created_at: string
          embedding: string | null
          id: string
          metadata: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          content_id: string
          content_type: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          content_id?: string
          content_type?: string
          created_at?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      template_categories: {
        Row: {
          created_at: string
          icon: string
          id: string
          name: string
          template_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          name: string
          template_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          name?: string
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_categories_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_items: {
        Row: {
          category_id: string
          created_at: string
          id: string
          name: string
          notes: string | null
          priority: string | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          priority?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          priority?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "template_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          checklist_source: string | null
          created_at: string
          description: string | null
          destination: string
          end_date: string
          id: string
          image_url: string | null
          start_date: string
          template_id: string | null
          title: string
          transport_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          checklist_source?: string | null
          created_at?: string
          description?: string | null
          destination: string
          end_date: string
          id?: string
          image_url?: string | null
          start_date: string
          template_id?: string | null
          title: string
          transport_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          checklist_source?: string | null
          created_at?: string
          description?: string | null
          destination?: string
          end_date?: string
          id?: string
          image_url?: string | null
          start_date?: string
          template_id?: string | null
          title?: string
          transport_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "checklist_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ai_preferences: {
        Row: {
          created_at: string
          feedback_history: Json | null
          id: string
          preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_history?: Json | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_history?: Json | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_changelog_entries_with_categories: {
        Args: {
          project_id_param?: string
          limit_param?: number
          offset_param?: number
        }
        Returns: {
          id: string
          project_id: string
          version: string
          title: string
          description: string
          change_type: string
          severity: string
          github_commit_hash: string
          github_commit_url: string
          pull_request_number: number
          pull_request_url: string
          author_name: string
          author_email: string
          author_github_username: string
          deployment_id: string
          tags: Json
          metadata: Json
          published: boolean
          created_at: string
          updated_at: string
          categories: Json
          affected_files: Json
          project_name: string
        }[]
      }
      get_page_view_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          page_path: string
          total_views: number
          unique_views: number
          views_today: number
          views_this_week: number
          views_this_month: number
        }[]
      }
      is_admin: {
        Args: { user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
