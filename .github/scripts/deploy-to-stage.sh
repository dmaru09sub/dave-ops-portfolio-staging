
#!/bin/bash
set -e

echo "=== Starting stage deployment ==="

TEMP_DIR="$(pwd)/cleaned-source"
STAGE_DIR="$(pwd)/stage-repo"

# Clone or create stage repository
if git clone https://x-access-token:${PORTFOLIO_TOKEN}@github.com/${TARGET_REPO}.git "$STAGE_DIR" 2>/dev/null; then
  echo "✓ Cloned existing stage repository"
  cd "$STAGE_DIR"
  find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} + 2>/dev/null || true
  echo "✓ Cleaned existing stage repository"
else
  echo "✓ Creating new stage repository"
  mkdir -p "$STAGE_DIR"
  cd "$STAGE_DIR"
  git init
  git remote add origin https://x-access-token:${PORTFOLIO_TOKEN}@github.com/${TARGET_REPO}.git
  git checkout -b main
fi

# Copy cleaned source to stage repository
(cd "$TEMP_DIR" && tar -cf - .) | tar -xf -
echo "✓ Copied cleaned source to stage repository"

# Verify workflow was copied correctly
if [ ! -f ".github/workflows/build-and-deploy.yml" ]; then
  echo "❌ Production workflow not copied to stage"
  exit 1
fi

STAGE_WORKFLOW_SIZE=$(wc -c < ".github/workflows/build-and-deploy.yml")
if [ "$STAGE_WORKFLOW_SIZE" -lt 1000 ]; then
  echo "❌ Production workflow corrupted during copy (size: $STAGE_WORKFLOW_SIZE bytes)"
  exit 1
fi

echo "✓ Production workflow successfully copied to stage (size: $STAGE_WORKFLOW_SIZE bytes)"

# Commit and push
git add -A

if git diff --staged --quiet; then
  echo "Deployment timestamp: $(date)" > .deployment-timestamp
  git add .deployment-timestamp
fi

git commit -m "Deploy cleaned source - ${PROJECT_NAME} - $(date)"
echo "✓ Committed changes"

CURRENT_BRANCH=$(git branch --show-current)
git push -u origin ${CURRENT_BRANCH}
echo "✓ Pushed to ${CURRENT_BRANCH} branch"

echo "=== Stage deployment completed successfully ==="
