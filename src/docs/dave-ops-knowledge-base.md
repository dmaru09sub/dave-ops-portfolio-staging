
# Dave-Ops Portfolio Project - Comprehensive Knowledge Base

## Project Overview

This portfolio was engineered as a showcase of modern cloud architecture, automation, and creativity. Built on a foundation of cutting-edge technologies—including cloud-native solutions, AI integrations, DevOps pipelines, Edge Functions, and a performant static React frontend—this site reflects deep expertise in integration, troubleshooting, and scalable web development.

## Core Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Shadcn UI** for consistent component library
- **Lucide React** for icons
- **React Router DOM** for client-side routing
- **TanStack React Query** for data fetching and state management

### Backend & Infrastructure
- **Supabase** (nlzwrlgtjshcjfxfchyz) for:
  - Authentication and user management
  - PostgreSQL database with Row Level Security (RLS)
  - Real-time subscriptions
  - Edge Functions for serverless backend logic
  - File storage capabilities

### Deployment Pipeline
- **3-Stage Pipeline**: DEV → STAGE → PROD
- **GitHub Actions** for CI/CD automation
- **Lovable Reference Cleaning** for stage deployments
- **Real-time Status Updates** via Supabase Edge Functions

## Key Features & Components

### 1. Admin Dashboard System
- **Location**: `src/pages/AdminDeployments.tsx`
- **Purpose**: Central hub for project and deployment management
- **Features**:
  - Project configuration and management
  - Deployment triggers with confirmation dialogs
  - Real-time deployment status monitoring
  - Comprehensive changelog tracking
  - AI-assisted change tracking

### 2. 3-Stage Deployment System
- **DEV Stage**: Private source repository with Lovable references
- **STAGE Stage**: Public repository with cleaned source code (no workflows)
- **PROD Stage**: Production-ready static files with GitHub Pages workflow

### 3. Project Management
- **Component**: `src/components/admin/project-management.tsx` (refactored)
- **Features**:
  - CRUD operations for deployment projects
  - 3-stage pipeline configuration
  - GitHub workflow integration
  - Real-time status tracking

### 4. Portfolio Management
- **Component**: `src/pages/AdminPortfolio.tsx` (refactored into smaller components)
- **Sub-components**:
  - `src/components/admin/portfolio/portfolio-form.tsx`
  - `src/components/admin/portfolio/portfolio-table.tsx`
  - `src/components/admin/portfolio/use-portfolio-management.ts`

### 5. Comprehensive Changelog System
- **Purpose**: Track all changes, especially AI-assisted ones
- **Features**:
  - AI prompt tracking
  - Change categorization and severity levels
  - Component impact tracking
  - Real-time updates
  - Advanced filtering and search

### 6. AI Change Tracker
- **Component**: `src/components/admin/comprehensive-ai-tracker.tsx`
- **Features**:
  - Track AI assistance context and prompts
  - Visual statistics dashboard
  - Advanced filtering by type, severity, and AI assistance
  - Detailed change metadata display

## Database Schema

### Core Tables
1. **daveops_deployment_projects**: Project configurations for 3-stage deployments
2. **daveops_portfolio_deployments**: Deployment history and real-time status tracking
3. **daveops_portfolio_projects**: Portfolio project content management
4. **daveops_changelog_entries**: Comprehensive change tracking with AI context
5. **daveops_changelog_categories**: Change categorization system
6. **daveops_changelog_affected_files**: File-level change tracking

### Key Fields for AI Tracking
- `metadata.ai_assisted`: Boolean flag for AI involvement
- `metadata.user_prompt`: Original user request
- `metadata.changes_made`: Array of specific changes
- `metadata.affected_components`: Components modified
- `metadata.action`: Type of action performed

## GitHub Actions Workflows

### 1. Clean and Deploy to Stage (`.github/workflows/clean-and-deploy.yml`)
- **Trigger**: `repository_dispatch` with type `deploy-to-stage`
- **Purpose**: Clean Lovable references and deploy to staging
- **Key Features**:
  - Runs `scripts/clean-lovable-references.js`
  - Removes .github directory from stage repo (prevents unwanted workflows)
  - Uses `PORTFOLIO_TOKEN` for authentication
  - Real-time status updates to Supabase

### 2. Build and Deploy to Production (`.github/workflows/build-and-deploy.yml`)
- **Trigger**: `repository_dispatch` with type `deploy-to-prod`
- **Purpose**: Build from stage and deploy static files to production
- **Key Features**:
  - Builds from stage repository
  - Deploys static files to production repository
  - Adds GitHub Pages workflow to production repo
  - Uses `PORTFOLIO_TOKEN` for authentication

### 3. Deploy Portfolio (`.github/workflows/deploy-portfolio.yml`)
- **Purpose**: Special workflow for portfolio deployment
- **Features**: Custom portfolio build and deployment process

## Environment & Secrets

### Required GitHub Secrets
- `PORTFOLIO_TOKEN`: GitHub Personal Access Token for cross-repo deployments
- `SUPABASE_ANON_KEY`: Supabase anonymous key for API access

### Supabase Configuration
- **Project ID**: nlzwrlgtjshcjfxfchyz
- **URL**: https://nlzwrlgtjshcjfxfchyz.supabase.co
- **Real-time**: Enabled for deployment tracking

## Current Issues & Solutions

### Fixed Issues
1. ✅ **TypeScript Error**: Boolean type mismatch in project-management.tsx
2. ✅ **Token References**: Updated STAGE_TOKEN to PORTFOLIO_TOKEN across all workflows
3. ✅ **Stage Repo Workflows**: Ensured .github directory is removed from stage repos
4. ✅ **File Copy Process**: Improved tar-based copying for reliability
5. ✅ **Component Organization**: Refactored large files into smaller, focused components

### Pipeline Status
- ✅ **DEV → STAGE**: Working correctly with Lovable reference cleaning
- 🔄 **STAGE → PROD**: Should now work with token fixes and improved error handling
- ✅ **Real-time Updates**: Functioning via Supabase Edge Functions

## Development Guidelines

### Code Organization
- Keep components under 50 lines when possible
- Create focused, single-responsibility components
- Use custom hooks for complex state management
- Implement comprehensive changelog tracking for all changes

### AI-Assisted Development
- Always log AI assistance in changelog entries
- Include user prompts and context in metadata
- Track affected files and components
- Maintain real-time updates for deployment status

### Database Operations
- All user-related data should use RLS policies
- Never reference auth.users directly; use profiles table if needed
- Include proper error handling and validation
- Use validation triggers instead of CHECK constraints for time-based validations

## File Structure (Key Components)

```
src/
├── components/
│   ├── admin/
│   │   ├── project-management.tsx (refactored)
│   │   ├── comprehensive-ai-tracker.tsx (new)
│   │   └── portfolio/
│   │       ├── portfolio-form.tsx (new)
│   │       ├── portfolio-table.tsx (new)
│   │       └── use-portfolio-management.ts (new)
├── pages/
│   ├── AdminDeployments.tsx
│   └── AdminPortfolio.tsx (refactored)
├── docs/
│   └── dave-ops-knowledge-base.md (this file)
└── hooks/
    ├── use-changelog.ts
    ├── use-deployment-projects.ts
    └── use-deployment-state.ts
```

## Future Enhancements

1. **Enhanced AI Integration**: More sophisticated prompt analysis and suggestion system
2. **Automated Testing Pipeline**: Integration with the 3-stage deployment process
3. **Performance Monitoring**: Real-time performance metrics and alerting
4. **Multi-Project Support**: Enhanced support for managing multiple portfolio projects
5. **Advanced Analytics**: Deployment success rates, performance metrics, and trend analysis

## Maintenance Notes

- Regularly review and clean up old deployment records
- Monitor Supabase usage and optimize queries
- Keep dependencies updated, especially security-related ones
- Review and update RLS policies as needed
- Maintain comprehensive changelog entries for all significant changes

This knowledge base should be updated whenever significant architectural changes or new features are implemented.
