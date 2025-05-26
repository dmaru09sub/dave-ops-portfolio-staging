
#!/bin/bash
set -e

echo "=== Preparing cleaned source ==="

# Create temp directory for cleaned source
TEMP_DIR="$(pwd)/cleaned-source"
mkdir -p "$TEMP_DIR"

# Copy all files except excluded ones
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.next' \
  --exclude='*.log' \
  --exclude='cleaned-source' \
  ./ "$TEMP_DIR/"

echo "✓ Copied source files to temp directory"
