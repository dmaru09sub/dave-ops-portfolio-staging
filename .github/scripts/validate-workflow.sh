
#!/bin/bash
set -e

echo "=== Validating production workflow ==="

TEMP_DIR="$(pwd)/cleaned-source"

# Verify production workflow exists and is valid
if [ ! -f "$TEMP_DIR/.github/workflows/build-and-deploy.yml" ]; then
  echo "❌ Production workflow missing"
  exit 1
fi

WORKFLOW_SIZE=$(wc -c < "$TEMP_DIR/.github/workflows/build-and-deploy.yml")
if [ "$WORKFLOW_SIZE" -lt 1000 ]; then
  echo "❌ Production workflow appears incomplete (size: $WORKFLOW_SIZE bytes)"
  exit 1
fi

echo "✓ Production workflow validated (size: $WORKFLOW_SIZE bytes)"
