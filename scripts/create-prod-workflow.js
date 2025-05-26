
import fs from 'fs';
import path from 'path';

// Ensure the .github/workflows directory exists
const workflowDir = path.join('.github', 'workflows');
if (!fs.existsSync(workflowDir)) {
  fs.mkdirSync(workflowDir, { recursive: true });
}

const prodWorkflowContent = `name: Deploy to Production

on:
  repository_dispatch:
    types: [deploy-to-prod]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout stage repository
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
        
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: |
        npm cache clean --force
        rm -f package-lock.json
        npm install
        
    - name: Build project
      run: npm run build
      
    - name: Configure Git
      run: |
        git config --global user.name 'Prod Deploy Bot'
        git config --global user.email 'prod-deploy@dave-ops.net'
        
    - name: Deploy to production repository
      env:
        PORTFOLIO_TOKEN: \${{ secrets.PORTFOLIO_TOKEN }}
        TARGET_REPO: \${{ github.event.client_payload.target_repo }}
        PROJECT_NAME: \${{ github.event.client_payload.project_name }}
        DEPLOYMENT_ID: \${{ github.event.client_payload.deployment_id }}
      run: |
        echo "=== Starting production deployment process ==="
        echo "Stage repo: \${{ github.repository }}"
        echo "Prod repo: \${TARGET_REPO}"
        echo "Project: \${PROJECT_NAME}"
        
        # Clone or initialize the production repository using token authentication
        PROD_DIR="prod-repo"
        if git clone https://x-access-token:\${PORTFOLIO_TOKEN}@github.com/\${TARGET_REPO}.git "\$PROD_DIR" 2>/dev/null; then
          echo "✓ Cloned existing production repository"
          cd "\$PROD_DIR"
          
          # Remove all content except .git
          find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} + 2>/dev/null || true
          echo "✓ Cleaned existing production repository"
          
        else
          echo "✓ Creating new production repository"
          mkdir -p "\$PROD_DIR"
          cd "\$PROD_DIR"
          git init
          git remote add origin https://x-access-token:\${PORTFOLIO_TOKEN}@github.com/\${TARGET_REPO}.git
          git checkout -b main
        fi
        
        # Copy built files to production repository
        echo "=== Copying built files to production repo ==="
        if [ -d "../dist" ]; then
          cp -r ../dist/* .
          echo "✓ Copied dist files"
        else
          echo "❌ No dist directory found"
          exit 1
        fi
        
        # Add all files
        git add -A
        echo "✓ Added all files to git staging"
        
        # Check if there are changes to commit
        if git diff --staged --quiet; then
          echo "Creating timestamp file to force deployment"
          echo "Production deployment: \$(date)" > .deployment-timestamp
          git add .deployment-timestamp
        fi
        
        # Commit and push
        git commit -m "Production deployment - \${PROJECT_NAME} - \$(date)"
        echo "✓ Committed changes"
        
        CURRENT_BRANCH=\$(git branch --show-current)
        git push -u origin \${CURRENT_BRANCH}
        echo "✓ Pushed to production repository"
        
        echo "=== Production deployment completed successfully ==="
        
    - name: Update deployment status - Success
      if: success()
      run: |
        curl -X POST 'https://nlzwrlgtjshcjfxfchyz.supabase.co/functions/v1/update-deployment-status' \\
          -H 'Authorization: Bearer \${{ secrets.SUPABASE_ANON_KEY }}' \\
          -H 'Content-Type: application/json' \\
          -d '{
            "deployment_id": "\${{ github.event.client_payload.deployment_id }}",
            "status": "deployed",
            "prod_commit_hash": "\${{ github.sha }}"
          }'
          
    - name: Update deployment status - Failure
      if: failure()
      run: |
        curl -X POST 'https://nlzwrlgtjshcjfxfchyz.supabase.co/functions/v1/update-deployment-status' \\
          -H 'Authorization: Bearer \${{ secrets.SUPABASE_ANON_KEY }}' \\
          -H 'Content-Type: application/json' \\
          -d '{
            "deployment_id": "\${{ github.event.client_payload.deployment_id }}",
            "status": "failed",
            "error_message": "Production deployment failed - check workflow logs"
          }'
`;

const outputPath = path.join(workflowDir, 'deploy-to-prod.yml');
fs.writeFileSync(outputPath, prodWorkflowContent);
console.log('✓ Created stage-specific production deployment workflow');
