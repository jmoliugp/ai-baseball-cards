# System Patterns

## Architecture Overview

```
┌─────────────┐
│   Frontend  │
│   (React)   │
└──────┬──────┘
       │ HTTP/REST
       ▼
┌─────────────┐
│   Backend   │◄─────┐
│  (Fastify)  │      │
└──────┬──────┘      │
       │             │
       ▼             │
┌─────────────┐      │
│  PostgreSQL │      │
└─────────────┘      │
                     │
              ┌──────┴──────┐
              │  AI Agent   │
              │ (LangGraph) │
              └─────────────┘
```

## Key Design Patterns

### 1. Monorepo Organization
- **Pattern**: pnpm workspaces with shared dependencies
- **Benefit**: Code sharing, consistent tooling, atomic commits
- **Structure**: Each package is independent but can import from siblings

### 2. Data Flow

#### Initial Load
```
Frontend → Backend → Check DB
                  ↓
            If empty, fetch API
                  ↓
            Seed database
                  ↓
            Return data → Frontend
```

#### Player Description Generation
```
Frontend → Backend → Queue AI job
                  ↓
            AI Agent processes
                  ↓
            Save to DB
                  ↓
            Return to frontend
```

### 3. Caching Strategy
- **Frontend**: TanStack Query for client-side caching
  - Cache player list for 5 minutes
  - Cache individual players for 10 minutes
  - Optimistic updates on edits
  
- **Backend**: Database as source of truth
  - No in-memory caching initially
  - Could add Redis later if needed

### 4. API Layer Patterns

#### Request Validation
```typescript
// All routes use Zod schemas
const playerUpdateSchema = z.object({
  hits: z.number().int().positive(),
  homeRuns: z.number().int().positive(),
  // ...
});
```

#### Error Handling
```typescript
// Consistent error responses
{
  "error": "ValidationError",
  "message": "Invalid player data",
  "details": { /* Zod errors */ }
}
```

### 5. Database Access Pattern
- **Repository Pattern**: Prisma client wrapped in service layer
- **Transactions**: Use Prisma transactions for multi-step operations
- **Migrations**: Version controlled schema changes

### 6. AI Agent Pattern
- **Async Processing**: Non-blocking description generation
- **Retry Logic**: Handle LLM API failures gracefully
- **Prompt Management**: Versioned prompts for consistency

## Component Architecture (Frontend)

### Page Components
- `PlayersListPage`: Main view with sorting
- `PlayerDetailPage`: Detail view with description
- `PlayerEditPage`: Edit form

### Feature Components
- `PlayerCard`: Individual player display
- `PlayerStats`: Statistics visualization
- `PlayerDescription`: AI-generated content
- `PlayerEditForm`: Edit interface

### Shared Components (Shadcn)
- Button, Input, Card, Dialog, etc.
- Custom themed for baseball aesthetic

## State Management

### Server State (TanStack Query)
- Player list queries
- Individual player queries
- Mutations for updates

### UI State (React State)
- Sort preferences
- Filter state
- Modal open/closed
- Form state

## Development Workflow

### Mock-First Development
1. Create mock data matching API structure
2. Build UI with mocks
3. Connect to backend with mocks
4. Replace with real data
5. Add AI features last

### Testing Strategy
- Unit tests for utilities and validation
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual QA for demo

## Code Organization Principles

### Backend
```
backend/
├── src/
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   ├── schemas/        # Zod validation
│   ├── db/            # Prisma client
│   └── utils/         # Helpers
```

### Frontend
```
frontend/
├── src/
│   ├── pages/         # Route pages
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # TanStack Query, API client
│   └── types/         # TypeScript types
```

## Deployment Considerations
- Multi-stage Docker builds for optimization
- Environment-based configuration
- Health check endpoints
- Graceful shutdown handling

