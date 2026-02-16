# Active Context

## Current Status
**Phase**: Initial Planning & Setup
**Date**: 2026-02-16

## What We're Working On
Setting up the project structure and creating comprehensive documentation for the AI Baseball Cards application.

## Recent Actions
1. Created Memory Bank structure
2. Documented project requirements and technical approach
3. Ready to begin implementation

## Next Immediate Steps

### 1. Create Detailed Implementation Plan
- Break down each phase into actionable tasks
- Define mock data structure
- Plan component hierarchy

### 2. Initialize Monorepo
- Set up pnpm workspace
- Create package structure (frontend, backend, ai-agent)
- Configure Biome for all packages
- Set up shared TypeScript configuration

### 3. Backend Foundation
- Initialize Fastify app
- Set up Prisma with PostgreSQL
- Create database schema
- Implement mock API endpoints

### 4. Frontend Foundation
- Initialize React + Vite
- Set up Tailwind + Shadcn
- Configure TanStack Query
- Create basic routing

### 5. Docker Configuration
- PostgreSQL Docker setup
- Backend Dockerfile
- Frontend Dockerfile
- Docker Compose for development

## Active Decisions

### Decision: Mock-First Approach
**Status**: Approved
**Rationale**: Build UI and API with mock data before integrating real API and AI
**Impact**: Faster iteration, easier testing, clear milestones

### Decision: Database from Start
**Status**: Approved
**Rationale**: Even though API provides data, we need DB for edits and AI descriptions
**Impact**: Need to seed DB with API data on first run

### Decision: AI Agent as Separate Package
**Status**: Approved
**Rationale**: Isolate AI logic for better organization and potential future reuse
**Impact**: Need clear interface between backend and AI agent

## Open Questions
1. Which LLM provider to use? (OpenAI GPT-4, Anthropic Claude, etc.)
2. Should AI descriptions be generated on-demand or batch processed?
3. Do we need real-time updates or is periodic sync enough?
4. Should we cache the external API response or fetch each time?

## Current Blockers
None - ready to proceed with implementation

## Notes
- Project is for a technical interview exercise (1-2 hours target)
- Should demonstrate AI usage during development
- Need to prepare for code walkthrough and demo
- Keep it simple but production-ready

