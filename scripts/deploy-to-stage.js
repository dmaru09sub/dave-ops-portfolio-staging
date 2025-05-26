
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TARGET_REPO = process.env.TARGET_REPO;
const PROJECT_NAME = process.env.PROJECT_NAME;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

console.log("=== Starting stage deployment process ===");
console.log(`Source repo: ${process.env.GITHUB_REPOSITORY}`);
console.log(`Target repo: ${TARGET_REPO}`);
console.log(`Project: ${PROJECT_NAME}`);
console.log(`Current working directory: ${process.cwd()}`);

// Create a temporary directory for the cleaned source
const TEMP_DIR = path.join(process.cwd(), 'cleaned-source');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}
console.log(`✓ Created temp directory: ${TEMP_DIR}`);

// Copy all files except .git, node_modules, and cleaned-source to temp directory
try {
  execSync(`rsync -av --exclude='.git' --exclude='node_modules' --exclude='dist' --exclude='.next' --exclude='*.log' --exclude='cleaned-source' ./ "${TEMP_DIR}/"`, { stdio: 'inherit' });
  console.log('✓ Copied source files to temp directory');
} catch (error) {
  console.error('❌ Failed to copy source files:', error.message);
  process.exit(1);
}

// Verify what was copied
console.log("=== Files in temp directory ===");
const fileCount = execSync(`find "${TEMP_DIR}" -type f | wc -l`, { encoding: 'utf8' }).trim();
console.log(`File count: ${fileCount}`);
execSync(`ls -la "${TEMP_DIR}/" | head -20`, { stdio: 'inherit' });

// Clone or initialize the stage repository using GitHub CLI
const STAGE_DIR = path.join(process.cwd(), 'stage-repo');

try {
  // Try to clone existing repository
  execSync(`gh repo clone "${TARGET_REPO}" "${STAGE_DIR}"`, { stdio: 'pipe' });
  console.log(`✓ Cloned existing stage repository to: ${STAGE_DIR}`);
  
  process.chdir(STAGE_DIR);
  console.log("=== Current stage repo contents ===");
  execSync('ls -la', { stdio: 'inherit' });
  
  // Remove all content except .git
  execSync('find . -maxdepth 1 ! -name ".git" ! -name "." ! -name ".." -exec rm -rf {} + 2>/dev/null || true');
  console.log('✓ Cleaned existing stage repository');
  
} catch (error) {
  console.log(`✓ Creating new stage repository at: ${STAGE_DIR}`);
  fs.mkdirSync(STAGE_DIR, { recursive: true });
  process.chdir(STAGE_DIR);
  
  execSync('git init');
  
  // Create repository using gh CLI
  try {
    execSync(`gh repo create "${TARGET_REPO}" --public --clone=false`);
  } catch (createError) {
    console.log('Repository may already exist');
  }
  
  execSync(`git remote add origin "https://github.com/${TARGET_REPO}.git"`);
  execSync('git checkout -b main');
}

// Copy cleaned source to stage repository using tar
console.log("=== Copying cleaned source to stage repo ===");
console.log(`Current directory: ${process.cwd()}`);
console.log(`Temp directory: ${TEMP_DIR}`);

execSync(`(cd "${TEMP_DIR}" && tar -cf - .) | tar -xf -`, { stdio: 'inherit' });

// Verify files were copied
console.log("=== Stage repo contents after copy ===");
const copiedFileCount = execSync('find . -type f ! -path "./.git/*" | wc -l', { encoding: 'utf8' }).trim();
console.log(`File count after copy: ${copiedFileCount}`);
execSync('ls -la | head -20', { stdio: 'inherit' });

// Verify the production workflow exists
if (fs.existsSync('.github/workflows/deploy-to-prod.yml')) {
  console.log('✓ Production workflow file exists in stage repo');
} else {
  console.log('❌ Production workflow file missing in stage repo');
}

// Force add all files including hidden ones
execSync('git add -A');
console.log('✓ Added all files to git staging');

// Show what's staged
console.log("=== Git status after staging ===");
const stagedCount = execSync('git status --porcelain | wc -l', { encoding: 'utf8' }).trim();
console.log(`Staged changes count: ${stagedCount}`);

// Check if there are changes to commit
try {
  execSync('git diff --staged --quiet');
  console.log('❌ No changes detected in staging area');
  
  // Create a timestamp file to force changes
  const timestamp = new Date().toISOString();
  fs.writeFileSync('.deployment-timestamp', `Deployment timestamp: ${timestamp}`);
  execSync('git add .deployment-timestamp');
  console.log('✓ Added timestamp file');
  
  // Check again
  try {
    execSync('git diff --staged --quiet');
    console.log('❌ Still no changes detected - this indicates a critical problem');
    process.exit(1);
  } catch {
    // Changes detected, continue
  }
} catch {
  // Changes detected, continue
}

// Commit the changes
const commitMessage = `Deploy cleaned source with production workflow - ${PROJECT_NAME} - ${new Date()}`;
execSync(`git commit -m "${commitMessage}"`);
console.log('✓ Committed changes');

// Get current branch name
const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
console.log(`Current branch: ${currentBranch}`);

// Push to stage repository using GitHub CLI
try {
  execSync('gh auth setup-git');
  execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
  console.log(`✓ Pushed to ${currentBranch} branch`);
} catch (error) {
  console.log('❌ Failed to push to remote repository');
  console.log('Attempting to set upstream and push again...');
  
  try {
    execSync(`git push --set-upstream origin ${currentBranch}`, { stdio: 'inherit' });
  } catch (retryError) {
    console.log('❌ Still failed to push');
    console.log('Git log:');
    execSync('git log --oneline -5', { stdio: 'inherit' });
    console.log('Git remote:');
    execSync('git remote -v', { stdio: 'inherit' });
    process.exit(1);
  }
}

console.log("=== Stage deployment completed successfully ===");
