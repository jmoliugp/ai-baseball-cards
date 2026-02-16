# Technical Context

## Technology Stack

### Frontend (`packages/frontend`)
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v3+
- **Component Library**: Shadcn UI
- **State Management**: TanStack Query (React Query) v5
- **Build Tool**: Vite
- **Code Quality**: Biome

### Backend (`packages/backend`)
- **Framework**: Fastify v4+
- **Language**: TypeScript
- **Validation**: Zod
- **ORM**: Prisma
- **Database**: PostgreSQL 15+
- **Code Quality**: Biome

### AI Agent (`packages/ai-agent`)
- **Framework**: LangGraph
- **Language**: TypeScript
- **LLM Provider**: OpenAI / Anthropic (TBD)
- **Code Quality**: Biome

## Infrastructure

### Monorepo
- **Package Manager**: pnpm with workspaces
- **Structure**:
  ```
  ai-baseball-cards/
  ├── packages/
  │   ├── frontend/
  │   ├── backend/
  │   └── ai-agent/
  ├── pnpm-workspace.yaml
  └── package.json
  ```

### Docker Setup
- **Development**: Local scripts with hot-reload
- **Production**: Multi-stage Docker builds
- **Database**: PostgreSQL in Docker container
- **Orchestration**: Docker Compose

## Development Environment

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- PostgreSQL (via Docker)

### Scripts (Planned)
- `pnpm dev`: Run all services in development
- `pnpm dev:frontend`: Frontend only
- `pnpm dev:backend`: Backend only
- `pnpm build`: Build all packages
- `pnpm lint`: Run Biome across all packages
- `pnpm format`: Format code with Biome

### Environment Variables
- Database connection strings
- API keys for LLM providers
- Port configurations
- CORS settings

## API Design

### Endpoints (Planned)
```
GET    /api/players           - List all players
GET    /api/players/:id       - Get player details
PUT    /api/players/:id       - Update player
POST   /api/players/:id/description - Generate AI description
```

## Database Schema (Initial)

### Players Table
```prisma
model Player {
  id          String   @id @default(cuid())
  name        String
  team        String
  hits        Int
  homeRuns    Int
  avg         Float
  description String?
  rawData     Json     // Original API data
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## External Dependencies

### API
- Baseball Data: https://resource-hub-production.s3.us-west-2.amazonaws.com/uploads/62/baseball_data.json
- One-time fetch or periodic refresh

### LLM Integration
- Will be configured in ai-agent package
- Async processing for descriptions
- Caching strategy to minimize API calls

