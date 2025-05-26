
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TARGET_REPO = process.env.TARGET_REPO;
const PROJECT_NAME = process.env.PROJECT_NAME;

console.log("=== Starting production deployment process ===");
console.log(`Stage repo: ${process.env.GITHUB_REPOSITORY}`);
console.log(`Prod repo: ${TARGET_REPO}`);
console.log(`Project: ${PROJECT_NAME}`);

// Clone or initialize the production repository
const PROD_DIR = path.join(process.cwd(), 'prod-repo');

try {
  // Use GitHub CLI to clone with proper token handling
  execSync(`gh repo clone "${TARGET_REPO}" "${PROD_DIR}"`, { stdio: 'pipe' });
  console.log('✓ Cloned existing production repository');
  
  process.chdir(PROD_DIR);
  
  // Remove all content except .git
  execSync('find . -maxdepth 1 ! -name ".git" ! -name "." ! -name ".." -exec rm -rf {} + 2>/dev/null || true');
  console.log('✓ Cleaned existing production repository');
  
} catch (error) {
  console.log('✓ Creating new production repository');
  fs.mkdirSync(PROD_DIR, { recursive: true });
  process.chdir(PROD_DIR);
  
  execSync('git init');
  
  // Configure remote using gh CLI
  try {
    execSync(`gh repo create "${TARGET_REPO}" --public --clone=false`);
  } catch (createError) {
    console.log('Repository may already exist');
  }
  
  execSync(`git remote add origin "https://github.com/${TARGET_REPO}.git"`);
  execSync('git checkout -b main');
}

// Copy built files to production repository
console.log("=== Copying built files to production repo ===");
execSync(`cp -r "${process.env.GITHUB_WORKSPACE}/dist/"* .`);

// Create a simple index.html if it doesn't exist
if (!fs.existsSync('index.html') && fs.existsSync('dist/index.html')) {
  execSync('cp dist/index.html .');
}

// Add all files
execSync('git add -A');
console.log('✓ Added all files to git staging');

// Check if there are changes to commit
try {
  execSync('git diff --staged --quiet');
  console.log('Creating timestamp file to force deployment');
  const timestamp = new Date().toISOString();
  fs.writeFileSync('.deployment-timestamp', `Production deployment: ${timestamp}`);
  execSync('git add .deployment-timestamp');
} catch {
  // Changes detected, continue
}

// Commit and push using GitHub CLI
const commitMessage = `Production deployment - ${PROJECT_NAME} - ${new Date()}`;
execSync(`git commit -m "${commitMessage}"`);
console.log('✓ Committed changes');

const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
execSync('gh auth setup-git');
execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
console.log('✓ Pushed to production repository');

console.log("=== Production deployment completed successfully ===");
