
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

console.log('3-Stage deployment function initialized')

serve(async (req) => {
  console.log('Request received:', req.method, req.url)
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Processing POST request')
    const requestBody = await req.json()
    console.log('Request body:', requestBody)
    
    const { deployment_id, project_id, deployment_stage = 'prod' } = requestBody
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Fetching project details for project_id:', project_id)
    
    // Get project details
    const { data: project, error: projectError } = await supabaseClient
      .from('daveops_deployment_projects')
      .select('*')
      .eq('id', project_id)
      .single()

    if (projectError || !project) {
      throw new Error(`Failed to fetch project: ${projectError?.message || 'Project not found'}`)
    }

    console.log('Project data:', project)
    console.log('Deployment stage:', deployment_stage)

    // Update deployment status to approved
    console.log('Updating deployment status to approved')
    await supabaseClient
      .from('daveops_portfolio_deployments')
      .update({ 
        status: 'approved',
        approved_at: new Date().toISOString()
      })
      .eq('id', deployment_id)

    // Determine target repository and event type based on deployment stage
    let targetRepo: string
    let eventType: string

    if (deployment_stage === 'stage') {
      targetRepo = project.stage_repo
      eventType = 'deploy-to-stage'
    } else {
      targetRepo = project.prod_repo
      eventType = 'deploy-to-prod' 
    }

    console.log('Event type:', eventType)
    console.log('Target repo:', targetRepo)

    if (!targetRepo) {
      throw new Error(`No ${deployment_stage} repository configured for this project`)
    }

    // Trigger GitHub Actions workflow on source repository
    console.log('Triggering GitHub Actions workflow on source repo:', project.source_repo)
    
    // FIXED: Reduced client_payload to only 3 essential properties to avoid GitHub API 422 error
    const clientPayload = {
      deployment_id,
      target_repo: targetRepo,
      project_name: project.name
    }

    console.log('Client payload (reduced for GitHub API):', clientPayload)

    const githubResponse = await fetch(`https://api.github.com/repos/${project.source_repo}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GITHUB_TOKEN')}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Supabase-Edge-Function'
      },
      body: JSON.stringify({
        event_type: eventType,
        client_payload: clientPayload
      })
    })

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text()
      throw new Error(`GitHub API error: ${githubResponse.status} ${errorText}`)
    }

    console.log('GitHub workflow triggered successfully')

    // Create changelog entry for deployment
    await supabaseClient
      .from('daveops_changelog_entries')
      .insert({
        title: `${deployment_stage.toUpperCase()} deployment triggered`,
        description: `Automated ${deployment_stage} deployment initiated for ${project.name}`,
        change_type: 'deployment',
        severity: 'minor',
        project_id: project_id,
        deployment_id: deployment_id,
        published: true,
        metadata: {
          deployment_stage,
          target_repo: targetRepo,
          source_repo: project.source_repo,
          event_type: eventType
        }
      })

    console.log(`3-stage ${deployment_stage} deployment process completed successfully`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `${deployment_stage} deployment triggered successfully`,
        project: project.name,
        target_repo: targetRepo,
        deployment_id: deployment_id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Deployment trigger error:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
