# Project Brief: AI Baseball Cards

## Overview
Build a full-stack baseball cards application that displays player statistics from an API, allows sorting and filtering, generates AI-powered player descriptions, and enables editing player data.

## Core Requirements

### Data Source
- API: https://resource-hub-production.s3.us-west-2.amazonaws.com/uploads/62/baseball_data.json
- Display player statistics from the API

### Key Features
1. **Player List View**
   - Display all players with their stats
   - Sort by hits or home runs (HRs)
   - Clean, intuitive UI

2. **Player Detail View**
   - Click on player to see detailed view
   - LLM-generated player description
   - Player statistics display

3. **Edit Functionality**
   - Edit button to modify player data
   - Update player information
   - Persist changes

## Technical Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- TanStack Query for server-side caching and state management

### Backend
- Fastify (Node.js framework)
- Zod for schema validation
- Prisma ORM for database access
- PostgreSQL database

### AI Agent
- LangGraph for AI orchestration
- LLM integration for player descriptions
- Data processing pipeline

### Infrastructure
- pnpm monorepo workspace
- Biome for linting and formatting
- Docker for staging/production
- Docker Compose for PostgreSQL
- Local development scripts

## Development Approach
- Step-by-step implementation
- Mock data first, then real implementation
- Iterative development with testing at each stage

## Success Criteria
- Working demo showing all features
- Clean, maintainable code
- Proper separation of concerns
- Production-ready deployment setup

## Timeline
Target: 1-2 hours for core functionality (as per exercise requirements)
Extended: Additional time for polish and AI features

