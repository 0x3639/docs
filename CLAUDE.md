# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official documentation website for Zenon Network, built with Docusaurus v3.6.3. The site is deployed to GitHub Pages at https://docs.0x3639.com/.

## Common Development Commands

### Local Development
```bash
# Install dependencies
yarn

# Start development server (opens browser automatically)
yarn start

# Clear Docusaurus cache if you encounter issues
yarn clear
```

### Building and Testing
```bash
# Build production site
yarn build

# Serve built site locally to test production build
yarn serve
```

### Deployment
```bash
# Deploy to GitHub Pages (gh-pages branch)
USE_SSH=true yarn deploy

# Or without SSH
GIT_USER=<GitHub username> yarn deploy
```

## Architecture and Structure

### Content Organization
Documentation is organized into logical sections under the `docs/` directory:
- **intro/** - Getting started guides and overview
- **developer/** - Technical documentation for developers (SDK, RPC API, cryptography)
- **operator/** - Node operator guides and requirements
- **wallet/** - Wallet documentation (CLI wallet, Syrius wallet)
- **resources/** - FAQ, whitepaper, and additional resources
- **useful-links/** - Community and official links
- **contributions/** - Contribution guidelines

### Key Configuration Files
- **docusaurus.config.js** - Main site configuration including theme, navbar, footer, and metadata
- **sidebars.js** - Sidebar navigation structure
- **src/css/custom.css** - Custom styling (dark theme with Zenon green accent colors)

### Important Notes
- The site uses MDX format for documentation (Markdown with JSX support)
- Dark mode is enforced (no theme switcher)
- Docs are served at the root path (`/`) instead of `/docs/`
- Edit URL points to: https://github.com/0x3639/docs/edit/main
- Blog functionality is disabled in the configuration
- No testing or linting tools are currently configured