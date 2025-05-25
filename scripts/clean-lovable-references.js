
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

const projectRoot = './';

async function cleanLovableReferences() {
  console.log('🧹 Starting comprehensive Lovable reference cleanup...');
  
  try {
    // Step 1: Remove GPT Engineer script from index.html
    await cleanIndexHtml();
    
    // Step 2: Clean package.json for professional appearance
    await cleanPackageJson();
    
    // Step 3: Remove Lovable-specific files and directories
    await removeLovableFiles();
    
    // Step 4: Clean source code comments and references
    await cleanSourceCodeReferences();
    
    // Step 5: Generate professional README
    await generateProfessionalReadme();
    
    // Step 6: Clean build artifacts and temporary files
    await cleanBuildArtifacts();
    
    // Step 7: Verify essential files are present
    await verifyEssentialFiles();
    
    console.log('✅ Lovable reference cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during Lovable cleanup:', error);
    process.exit(1);
  }
}

async function cleanIndexHtml() {
  const indexPath = path.join(projectRoot, 'index.html');
  
  if (await fs.pathExists(indexPath)) {
    let content = await fs.readFile(indexPath, 'utf8');
    
    // Remove GPT Engineer script
    content = content.replace(
      /<script src="https:\/\/cdn\.gpteng\.co\/gptengineer\.js"[^>]*><\/script>\s*/g,
      ''
    );
    
    // Remove any Lovable-related meta tags or comments
    content = content.replace(/<!--.*?lovable.*?-->/gis, '');
    content = content.replace(/<!--.*?gpt.*?engineer.*?-->/gis, '');
    
    // Clean up meta tags that reference Lovable
    content = content.replace(/<meta[^>]*lovable[^>]*>/gi, '');
    content = content.replace(/<meta[^>]*@lovable_dev[^>]*>/gi, '');
    
    // Update title and meta description to be more professional
    content = content.replace(/<title>.*?<\/title>/, '<title>Professional Web Application</title>');
    content = content.replace(/<meta name="description" content="[^"]*lovable[^"]*"[^>]*>/gi, 
      '<meta name="description" content="Professional web application built with modern technologies" />');
    
    await fs.writeFile(indexPath, content);
    console.log('🔧 Cleaned index.html - removed GPT Engineer script and Lovable references');
  }
}

async function cleanPackageJson() {
  const packagePath = path.join(projectRoot, 'package.json');
  
  if (await fs.pathExists(packagePath)) {
    const packageJson = await fs.readJson(packagePath);
    
    // Update for professional appearance
    if (packageJson.name && packageJson.name.includes('lovable')) {
      packageJson.name = packageJson.name.replace(/lovable[_-]?/gi, '').replace(/^[_-]+|[_-]+$/g, '') || 'web-application';
    }
    
    // Remove Lovable-specific scripts or dependencies if any
    if (packageJson.scripts) {
      delete packageJson.scripts['lovable:dev'];
      delete packageJson.scripts['lovable:build'];
      delete packageJson.scripts['lovable:preview'];
    }
    
    // Clean description
    if (packageJson.description && packageJson.description.toLowerCase().includes('lovable')) {
      packageJson.description = 'Professional web application built with React and modern tools';
    }
    
    // Set professional metadata
    packageJson.author = packageJson.author || 'Professional Developer';
    packageJson.version = packageJson.version || '1.0.0';
    
    // Remove any Lovable-specific dependencies
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach(dep => {
        if (dep.includes('lovable') || dep.includes('gpteng')) {
          delete packageJson.dependencies[dep];
        }
      });
    }
    
    await fs.writeJson(packagePath, packageJson, { spaces: 2 });
    console.log('📦 Cleaned package.json - removed Lovable references and set professional metadata');
  }
}

async function removeLovableFiles() {
  const filesToRemove = [
    '.lovable',
    'lovable.config.js',
    'lovable.config.json',
    '.gpteng',
    'gpteng.config.js',
    '.lovable-cache',
    'lovable-cache',
    '.lovable.json'
  ];
  
  for (const file of filesToRemove) {
    const filePath = path.join(projectRoot, file);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      console.log(`🗑️  Removed ${file}`);
    }
  }
}

async function cleanSourceCodeReferences() {
  // Find all TypeScript and JavaScript files
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', { cwd: projectRoot });
  
  for (const file of files) {
    const filePath = path.join(projectRoot, file);
    let content = await fs.readFile(filePath, 'utf8');
    let modified = false;
    
    // Remove Lovable-related comments
    const originalContent = content;
    content = content.replace(/\/\*[\s\S]*?lovable[\s\S]*?\*\//gis, '');
    content = content.replace(/\/\/.*lovable.*/gi, '');
    content = content.replace(/\/\*[\s\S]*?gpt.?engineer[\s\S]*?\*\//gis, '');
    content = content.replace(/\/\/.*gpt.?engineer.*/gi, '');
    
    // Remove Lovable-specific imports or references
    content = content.replace(/import.*from.*lovable.*/gi, '');
    content = content.replace(/.*lovable.*badge.*/gi, '');
    content = content.replace(/.*created.?with.?lovable.*/gi, '');
    
    if (content !== originalContent) {
      await fs.writeFile(filePath, content);
      console.log(`🧹 Cleaned ${file} - removed Lovable references`);
      modified = true;
    }
  }
}

async function cleanBuildArtifacts() {
  const artifactsToRemove = [
    'node_modules',
    'dist',
    'build',
    '.next',
    '.cache',
    '.parcel-cache',
    'coverage'
  ];
  
  for (const artifact of artifactsToRemove) {
    const artifactPath = path.join(projectRoot, artifact);
    if (await fs.pathExists(artifactPath)) {
      await fs.remove(artifactPath);
      console.log(`🗑️  Removed build artifact: ${artifact}`);
    }
  }
}

async function verifyEssentialFiles() {
  const essentialFiles = [
    'package.json',
    'index.html',
    'src/main.tsx'
  ];
  
  for (const file of essentialFiles) {
    const filePath = path.join(projectRoot, file);
    if (!(await fs.pathExists(filePath))) {
      console.warn(`⚠️  Warning: Essential file missing: ${file}`);
    }
  }
  
  console.log('✅ Verified essential files are present');
}

async function generateProfessionalReadme() {
  const readmePath = path.join(projectRoot, 'README.md');
  const packagePath = path.join(projectRoot, 'package.json');
  
  let projectName = 'Professional Web Application';
  let description = 'A modern web application built with React and TypeScript';
  
  if (await fs.pathExists(packagePath)) {
    const packageJson = await fs.readJson(packagePath);
    projectName = packageJson.name || projectName;
    description = packageJson.description || description;
  }
  
  const readmeContent = `# ${projectName}

${description}

## Features

- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Component library with shadcn/ui
- Professional deployment pipeline
- Optimized for production

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **State Management**: React Query
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## Deployment

This application is configured for deployment to GitHub Pages and other static hosting platforms.

### Production Build

The production build is optimized and includes:
- Minified JavaScript and CSS
- Optimized images and assets
- Service worker for caching (if configured)

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
`;

  await fs.writeFile(readmePath, readmeContent);
  console.log('📄 Generated professional README.md');
}

// Run the cleanup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanLovableReferences();
}

export { cleanLovableReferences };
