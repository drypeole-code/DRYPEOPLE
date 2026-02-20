# Dry People - E-commerce Website

## Overview
A React-based e-commerce website for "Dry People" brand. Built with Vite, React, TailwindCSS, and uses PocketBase as the backend data source (external). The project is structured as a monorepo with the web frontend under `apps/web`.

## Project Architecture
- **Framework**: React 18 with Vite 7
- **Styling**: TailwindCSS 3 with Radix UI components
- **Routing**: React Router DOM v7
- **Backend**: PocketBase (external service, uses mock data when unavailable)
- **Build System**: npm workspaces monorepo

## Directory Structure
```
apps/
  web/               # React frontend
    src/
      components/    # Reusable UI components
      pages/         # Page components (Home, Katalog, ProductDetail, Checkout)
      hooks/         # Custom hooks
      lib/           # Utility functions and PocketBase client
    vite.config.js   # Vite configuration
```

## Running
- Dev server: `npm run dev --prefix apps/web` (port 5000)
- Build: `npm run build --prefix apps/web` (outputs to `dist/apps/web`)

## Recent Changes
- 2026-02-20: Initial Replit setup. Moved project files to workspace root, created vite.config.js with path aliases and allowedHosts, installed dependencies.
