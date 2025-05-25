
import fs from 'fs-extra';
import path from 'path';

const sourceDir = './';
const destinationDir = './destination-repo/';

async function customizePortfolio() {
  try {
    console.log('Starting portfolio customization...');
    
    // Ensure destination directory exists
    await fs.ensureDir(destinationDir);
    
    // Copy all files except .git, node_modules, and other build artifacts
    const filesToCopy = [
      'src/',
      'public/',
      'index.html',
      'package.json',
      'package-lock.json',
      'vite.config.ts',
      'tailwind.config.ts',
      'tsconfig.json',
      'tsconfig.app.json',
      'tsconfig.node.json',
      'postcss.config.js',
      'components.json'
    ];
    
    for (const file of filesToCopy) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destinationDir, file);
      
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, destPath, {
          overwrite: true,
          filter: (src) => {
            // Skip node_modules, .git, and other unnecessary files
            return !src.includes('node_modules') && 
                   !src.includes('.git') && 
                   !src.includes('dist') &&
                   !src.includes('.env');
          }
        });
        console.log(`Copied: ${file}`);
      }
    }
    
    // Customize package.json for professional deployment
    const packageJsonPath = path.join(destinationDir, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      
      // Update metadata for professional appearance
      packageJson.name = 'dave-ops-portfolio';
      packageJson.description = 'Professional DevOps Portfolio by Dave';
      packageJson.homepage = 'https://dmaru09sub.github.io/dave-ops-portfolio';
      packageJson.repository = {
        type: 'git',
        url: 'https://github.com/dmaru09sub/dave-ops-portfolio.git'
      };
      packageJson.author = 'Dave';
      
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log('Updated package.json with professional metadata');
    }
    
    console.log('Portfolio customization completed successfully!');
  } catch (error) {
    console.error('Error during portfolio customization:', error);
    process.exit(1);
  }
}

customizePortfolio();
