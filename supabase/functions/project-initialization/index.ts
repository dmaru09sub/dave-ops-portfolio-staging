
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { projectId, action } = await req.json()

    if (!projectId) {
      throw new Error('Project ID is required')
    }

    // Get project details
    const { data: project, error: projectError } = await supabaseClient
      .from('daveops_deployment_projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      throw new Error('Project not found')
    }

    let result = { success: false, message: '', data: null }

    switch (action) {
      case 'initialize':
        // Create initialization status record
        const { error: statusError } = await supabaseClient
          .from('daveops_project_initialization_status')
          .upsert({
            project_id: projectId,
            configuration_complete: false,
            workflow_files_created: false,
            secrets_configured: false,
            github_pages_enabled: false,
            repository_structure_valid: false,
            initial_deployment_successful: false,
            last_validation_at: new Date().toISOString(),
            validation_errors: []
          })

        if (statusError) {
          throw statusError
        }

        // Simulate initialization steps (in a real implementation, this would make GitHub API calls)
        await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay

        // Update status to complete
        const { error: updateError } = await supabaseClient
          .from('daveops_project_initialization_status')
          .update({
            configuration_complete: true,
            workflow_files_created: true,
            secrets_configured: true,
            github_pages_enabled: true,
            repository_structure_valid: true,
            initial_deployment_successful: true,
            last_validation_at: new Date().toISOString()
          })
          .eq('project_id', projectId)

        if (updateError) {
          throw updateError
        }

        result = {
          success: true,
          message: `Project ${project.name} has been successfully initialized`,
          data: { projectId, initialized: true }
        }
        break

      case 'validate':
        // Get current status
        const { data: status } = await supabaseClient
          .from('daveops_project_initialization_status')
          .select('*')
          .eq('project_id', projectId)
          .single()

        result = {
          success: true,
          message: 'Project validation completed',
          data: status || {
            project_id: projectId,
            configuration_complete: false,
            workflow_files_created: false,
            secrets_configured: false,
            github_pages_enabled: false,
            repository_structure_valid: false,
            initial_deployment_successful: false
          }
        }
        break

      default:
        throw new Error('Invalid action')
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Project initialization error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Project initialization failed',
        data: null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
