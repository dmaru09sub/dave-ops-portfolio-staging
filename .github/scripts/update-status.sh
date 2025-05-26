
#!/bin/bash

STATUS=$1
DEPLOYMENT_ID=$2
COMMIT_HASH=$3

if [ "$STATUS" = "success" ]; then
  curl -X POST 'https://nlzwrlgtjshcjfxfchyz.supabase.co/functions/v1/update-deployment-status' \
    -H 'Authorization: Bearer '$SUPABASE_ANON_KEY \
    -H 'Content-Type: application/json' \
    -d '{
      "deployment_id": "'$DEPLOYMENT_ID'",
      "status": "stage_deployed",
      "stage_commit_hash": "'$COMMIT_HASH'"
    }'
else
  curl -X POST 'https://nlzwrlgtjshcjfxfchyz.supabase.co/functions/v1/update-deployment-status' \
    -H 'Authorization: Bearer '$SUPABASE_ANON_KEY \
    -H 'Content-Type: application/json' \
    -d '{
      "deployment_id": "'$DEPLOYMENT_ID'",
      "status": "failed",
      "error_message": "Stage deployment failed - check workflow logs"
    }'
fi
