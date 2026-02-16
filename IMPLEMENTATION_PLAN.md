# Implementation Plan: AI Baseball Cards

## Overview
This document provides a detailed, step-by-step plan for building the AI Baseball Cards application. We'll follow a mock-first, iterative approach to ensure each component works before moving to the next.

---

## Phase 1: Project Foundation (30-45 minutes)

### 1.1 Monorepo Setup
**Goal**: Create pnpm workspace with all three packages

```bash
# Initialize root package.json
pnpm init

# Create workspace structure
mkdir -p packages/{frontend,backend,ai-agent}

# Create pnpm-workspace.yaml
```

**Files to create**:
- `pnpm-workspace.yaml`
- Root `package.json`
- Root `biome.json`
- `.gitignore`
- `.dockerignore`
- Root `tsconfig.json`

**Success criteria**: Can run `pnpm install` without errors

---

### 1.2 Backend Package Initialization
**Goal**: Set up Fastify server with basic structure

```bash
cd packages/backend
pnpm init
```

**Dependencies to install**:
```json
{
  "dependencies": {
    "fastify": "^4.25.0",
    "@fastify/cors": "^9.0.0",
    "prisma": "^5.8.0",
    "@prisma/client": "^5.8.0",
    "zod": "^3.22.0",
    "dotenv": "^16.3.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.5.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0"
  }
}
```

**File structure**:
```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── app.ts                # Fastify app setup
│   ├── routes/
│   │   └── players.ts        # Player routes
│   ├── services/
│   │   └── playerService.ts  # Business logic
│   ├── schemas/
│   │   └── playerSchema.ts   # Zod schemas
│   └── utils/
│       └── config.ts         # Configuration
├── prisma/
│   └── schema.prisma         # Database schema
├── package.json
├── tsconfig.json
└── .env.example
```

**Mock implementation**:
```typescript
// src/routes/players.ts - with mock data
const mockPlayers = [
  {
    id: "1",
    name: "John Doe",
    team: "Mock Team",
    hits: 150,
    homeRuns: 25,
    avg: 0.305
  }
];

// GET /api/players - return mock data
// GET /api/players/:id - return single mock player
// PUT /api/players/:id - validate and echo back
```

**Success criteria**: 
- Server starts on port 3001
- Mock endpoints return data
- CORS configured for frontend

---

### 1.3 Frontend Package Initialization
**Goal**: Create React app with Vite, Tailwind, and Shadcn

```bash
cd packages/frontend
pnpm create vite . --template react-ts
```

**Dependencies to install**:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "@tanstack/react-query": "^5.17.0",
    "tailwindcss": "^3.4.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.5.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "typescript": "^5.3.0"
  }
}
```

**Shadcn setup**:
```bash
pnpm dlx shadcn-ui@latest init
# Add components: button, card, input, dialog, table
pnpm dlx shadcn-ui@latest add button card input dialog table
```

**File structure**:
```
frontend/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Main app with router
│   ├── pages/
│   │   ├── PlayersListPage.tsx
│   │   ├── PlayerDetailPage.tsx
│   │   └── PlayerEditPage.tsx
│   ├── components/
│   │   ├── PlayerCard.tsx
│   │   ├── PlayerStats.tsx
│   │   └── SortControls.tsx
│   ├── lib/
│   │   ├── api.ts            # Axios instance
│   │   └── queryClient.ts    # TanStack Query setup
│   ├── hooks/
│   │   ├── usePlayers.ts
│   │   ├── usePlayer.ts
│   │   └── useUpdatePlayer.ts
│   └── types/
│       └── player.ts         # TypeScript interfaces
├── tailwind.config.js
├── index.html
└── package.json
```

**Mock implementation**:
- Hard-code mock data in components
- Build UI without API calls
- Placeholder for descriptions

**Success criteria**:
- Dev server runs on port 5173
- Can navigate between pages
- Mock data displays correctly
- Sorting works with mock data

---

## Phase 2: Database & Docker (20-30 minutes)

### 2.1 Prisma Schema
**Goal**: Define database schema and migrations

```prisma
// prisma/schema.prisma
model Player {
  id          String   @id @default(cuid())
  externalId  String   @unique  // From API
  name        String
  team        String
  position    String?
  hits        Int
  homeRuns    Int
  average     Float
  atBats      Int?
  runs        Int?
  rbi         Int?
  description String?  // AI-generated
  rawData     Json     // Store original API data
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([hits])
  @@index([homeRuns])
}
```

**Commands**:
```bash
cd packages/backend
pnpm prisma init
pnpm prisma migrate dev --name init
pnpm prisma generate
```

---

### 2.2 Docker Configuration
**Goal**: Containerize database and application

**Create `docker-compose.yml` at root**:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: baseball-cards-db
    environment:
      POSTGRES_USER: baseball
      POSTGRES_PASSWORD: baseball_dev
      POSTGRES_DB: baseball_cards
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U baseball"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./packages/backend
      dockerfile: Dockerfile
    container_name: baseball-cards-backend
    environment:
      DATABASE_URL: postgresql://baseball:baseball_dev@postgres:5432/baseball_cards
      PORT: 3001
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./packages/backend/src:/app/src

  frontend:
    build:
      context: ./packages/frontend
      dockerfile: Dockerfile
    container_name: baseball-cards-frontend
    environment:
      VITE_API_URL: http://localhost:3001
    ports:
      - "5173:5173"
    volumes:
      - ./packages/frontend/src:/app/src

volumes:
  postgres_data:
```

**Backend Dockerfile**:
```dockerfile
# packages/backend/Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm build

FROM base AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

**Frontend Dockerfile**:
```dockerfile
# packages/frontend/Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Development scripts** (in root `package.json`):
```json
{
  "scripts": {
    "dev": "docker-compose up",
    "dev:local": "pnpm --filter backend dev & pnpm --filter frontend dev",
    "build": "pnpm -r build",
    "lint": "pnpm -r lint",
    "format": "pnpm -r format"
  }
}
```

**Success criteria**:
- `docker-compose up` starts all services
- PostgreSQL accessible on localhost:5432
- Backend can connect to database
- Migrations run successfully

---

## Phase 3: Real Data Integration (30 minutes)

### 3.1 Fetch Baseball API Data
**Goal**: Create seed script to populate database

**Create `packages/backend/src/utils/seed.ts`**:
```typescript
import axios from 'axios';
import { prisma } from './db';

const API_URL = 'https://resource-hub-production.s3.us-west-2.amazonaws.com/uploads/62/baseball_data.json';

async function seed() {
  console.log('Fetching baseball data...');
  const response = await axios.get(API_URL);
  const players = response.data;

  console.log(`Seeding ${players.length} players...`);
  
  for (const player of players) {
    await prisma.player.upsert({
      where: { externalId: player.id || player.name },
      update: {
        name: player.name,
        team: player.team,
        position: player.position,
        hits: parseInt(player.hits) || 0,
        homeRuns: parseInt(player.HR) || 0,
        average: parseFloat(player.avg) || 0,
        atBats: parseInt(player.AB) || 0,
        runs: parseInt(player.R) || 0,
        rbi: parseInt(player.RBI) || 0,
        rawData: player,
      },
      create: {
        externalId: player.id || player.name,
        name: player.name,
        team: player.team,
        position: player.position,
        hits: parseInt(player.hits) || 0,
        homeRuns: parseInt(player.HR) || 0,
        average: parseFloat(player.avg) || 0,
        atBats: parseInt(player.AB) || 0,
        runs: parseInt(player.R) || 0,
        rbi: parseInt(player.RBI) || 0,
        rawData: player,
      },
    });
  }

  console.log('Seed complete!');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**Add script to `package.json`**:
```json
{
  "scripts": {
    "seed": "tsx src/utils/seed.ts"
  }
}
```

---

### 3.2 Implement Real API Endpoints
**Goal**: Replace mock endpoints with database queries

**Update `packages/backend/src/services/playerService.ts`**:
```typescript
import { prisma } from '../utils/db';

export class PlayerService {
  async getAllPlayers(sortBy?: 'hits' | 'homeRuns', order?: 'asc' | 'desc') {
    return prisma.player.findMany({
      orderBy: sortBy ? { [sortBy]: order || 'desc' } : undefined,
    });
  }

  async getPlayerById(id: string) {
    return prisma.player.findUnique({
      where: { id },
    });
  }

  async updatePlayer(id: string, data: any) {
    return prisma.player.update({
      where: { id },
      data,
    });
  }
}
```

**Update routes with Zod validation**:
```typescript
// packages/backend/src/routes/players.ts
import { z } from 'zod';

const updatePlayerSchema = z.object({
  name: z.string().optional(),
  hits: z.number().int().nonnegative().optional(),
  homeRuns: z.number().int().nonnegative().optional(),
  average: z.number().min(0).max(1).optional(),
});

app.put('/api/players/:id', async (request, reply) => {
  const { id } = request.params;
  const validated = updatePlayerSchema.parse(request.body);
  const updated = await playerService.updatePlayer(id, validated);
  return updated;
});
```

**Success criteria**:
- Can fetch all players from database
- Sorting works via query parameters
- Update endpoint validates and persists changes
- Error handling for invalid requests

---

### 3.3 Connect Frontend to Backend
**Goal**: Replace mock data with API calls

**Update `packages/frontend/src/lib/api.ts`**:
```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export interface Player {
  id: string;
  name: string;
  team: string;
  hits: number;
  homeRuns: number;
  average: number;
  description?: string;
}

export const playersApi = {
  getAll: (sortBy?: 'hits' | 'homeRuns', order?: 'asc' | 'desc') =>
    api.get<Player[]>('/api/players', { params: { sortBy, order } }),
  
  getById: (id: string) =>
    api.get<Player>(`/api/players/${id}`),
  
  update: (id: string, data: Partial<Player>) =>
    api.put<Player>(`/api/players/${id}`, data),
};
```

**Update hooks with TanStack Query**:
```typescript
// packages/frontend/src/hooks/usePlayers.ts
import { useQuery } from '@tanstack/react-query';
import { playersApi } from '../lib/api';

export function usePlayers(sortBy?: 'hits' | 'homeRuns', order?: 'asc' | 'desc') {
  return useQuery({
    queryKey: ['players', sortBy, order],
    queryFn: async () => {
      const { data } = await playersApi.getAll(sortBy, order);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Success criteria**:
- Frontend fetches real data from backend
- Loading and error states work
- Sorting triggers new API calls
- TanStack Query caching works

---

## Phase 4: Edit Functionality (20 minutes)

### 4.1 Edit Form Component
**Goal**: Build form to edit player data

**Create `packages/frontend/src/components/PlayerEditForm.tsx`**:
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Player } from '@/lib/api';

interface Props {
  player: Player;
  onSave: (data: Partial<Player>) => void;
  onCancel: () => void;
}

export function PlayerEditForm({ player, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: player.name,
    hits: player.hits,
    homeRuns: player.homeRuns,
    average: player.average,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        label="Hits"
        type="number"
        value={formData.hits}
        onChange={(e) => setFormData({ ...formData, hits: +e.target.value })}
      />
      {/* ... other fields ... */}
      <Button type="submit">Save</Button>
      <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
    </form>
  );
}
```

---

### 4.2 Update Mutation
**Goal**: Implement optimistic updates with TanStack Query

**Create `packages/frontend/src/hooks/useUpdatePlayer.ts`**:
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playersApi, Player } from '../lib/api';

export function useUpdatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Player> }) =>
      playersApi.update(id, data),
    
    onMutate: async ({ id, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ['players'] });
      await queryClient.cancelQueries({ queryKey: ['player', id] });

      // Snapshot previous value
      const previousPlayer = queryClient.getQueryData(['player', id]);

      // Optimistically update
      queryClient.setQueryData(['player', id], (old: Player) => ({
        ...old,
        ...data,
      }));

      return { previousPlayer };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousPlayer) {
        queryClient.setQueryData(['player', variables.id], context.previousPlayer);
      }
    },

    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['players'] });
    },
  });
}
```

**Success criteria**:
- Edit form validates inputs
- Updates persist to database
- Optimistic UI updates work
- Error handling rolls back changes

---

## Phase 5: AI Agent Integration (30-45 minutes)

### 5.1 AI Agent Package Setup
**Goal**: Create LangGraph setup for description generation

```bash
cd packages/ai-agent
pnpm init
```

**Dependencies**:
```json
{
  "dependencies": {
    "@langchain/core": "^0.1.0",
    "@langchain/openai": "^0.0.19",
    "langgraph": "^0.0.1",
    "dotenv": "^16.3.0"
  }
}
```

**File structure**:
```
ai-agent/
├── src/
│   ├── index.ts              # Export main functions
│   ├── graph.ts              # LangGraph workflow
│   ├── prompts.ts            # Prompt templates
│   └── config.ts             # LLM configuration
└── package.json
```

---

### 5.2 Description Generation Graph
**Goal**: Create LangGraph workflow for player descriptions

**Create `packages/ai-agent/src/graph.ts`**:
```typescript
import { ChatOpenAI } from '@langchain/openai';
import { StateGraph } from 'langgraph';

const llm = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
});

interface State {
  playerData: any;
  description: string;
}

const graph = new StateGraph<State>({
  channels: {
    playerData: null,
    description: null,
  },
});

// Node: Generate description
async function generateDescription(state: State) {
  const prompt = `Generate a 2-3 sentence description for this baseball player:
  
Name: ${state.playerData.name}
Team: ${state.playerData.team}
Hits: ${state.playerData.hits}
Home Runs: ${state.playerData.homeRuns}
Batting Average: ${state.playerData.average}

Focus on their performance and standout statistics. Be engaging and informative.`;

  const response = await llm.invoke(prompt);
  
  return {
    ...state,
    description: response.content,
  };
}

graph.addNode('generate', generateDescription);
graph.setEntryPoint('generate');
graph.setFinishPoint('generate');

export const descriptionGraph = graph.compile();
```

**Create `packages/ai-agent/src/index.ts`**:
```typescript
import { descriptionGraph } from './graph';

export async function generatePlayerDescription(playerData: any): Promise<string> {
  const result = await descriptionGraph.invoke({
    playerData,
    description: '',
  });
  
  return result.description;
}
```

---

### 5.3 Backend Integration
**Goal**: Add endpoint to trigger AI description generation

**Update `packages/backend/src/routes/players.ts`**:
```typescript
import { generatePlayerDescription } from '@ai-baseball-cards/ai-agent';

app.post('/api/players/:id/description', async (request, reply) => {
  const { id } = request.params;
  
  const player = await playerService.getPlayerById(id);
  if (!player) {
    return reply.code(404).send({ error: 'Player not found' });
  }

  // Generate description
  const description = await generatePlayerDescription(player);

  // Save to database
  const updated = await playerService.updatePlayer(id, { description });

  return { description: updated.description };
});
```

---

### 5.4 Frontend Integration
**Goal**: Display and generate AI descriptions in UI

**Create `packages/frontend/src/components/PlayerDescription.tsx`**:
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Props {
  playerId: string;
  description?: string;
}

export function PlayerDescription({ playerId, description }: Props) {
  const [generating, setGenerating] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(description);

  const generateDescription = async () => {
    setGenerating(true);
    try {
      const { data } = await api.post(`/api/players/${playerId}/description`);
      setCurrentDescription(data.description);
    } catch (error) {
      console.error('Failed to generate description:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (!currentDescription) {
    return (
      <div>
        <p className="text-muted-foreground">No description yet.</p>
        <Button onClick={generateDescription} disabled={generating}>
          {generating ? 'Generating...' : 'Generate Description'}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4">{currentDescription}</p>
      <Button onClick={generateDescription} variant="outline" disabled={generating}>
        {generating ? 'Regenerating...' : 'Regenerate'}
      </Button>
    </div>
  );
}
```

**Success criteria**:
- Can generate descriptions for players
- Descriptions are relevant and engaging
- Generated descriptions persist to database
- UI shows loading state during generation

---

## Phase 6: Polish & Testing (20 minutes)

### 6.1 UI Improvements
- [ ] Loading skeletons for player list
- [ ] Error boundaries for error handling
- [ ] Toast notifications for success/errors
- [ ] Responsive design for mobile
- [ ] Smooth transitions and animations

### 6.2 Error Handling
- [ ] Backend: Proper HTTP status codes
- [ ] Backend: Structured error responses
- [ ] Frontend: User-friendly error messages
- [ ] Frontend: Retry logic for failed requests

### 6.3 Performance
- [ ] Implement pagination or virtual scrolling for player list
- [ ] Optimize images if any
- [ ] Code splitting for routes
- [ ] Production build optimization

### 6.4 Testing Checklist
- [ ] All players load correctly
- [ ] Sorting by hits works (asc/desc)
- [ ] Sorting by home runs works (asc/desc)
- [ ] Click player to view details
- [ ] Edit player data and verify persistence
- [ ] Generate AI description and verify display
- [ ] Test error scenarios (network failures, invalid data)
- [ ] Test on different screen sizes

---

## Phase 7: Demo Preparation (15 minutes)

### 7.1 Demo Script
1. **Introduction** (30 seconds)
   - Project overview
   - Tech stack highlights

2. **Feature Demo** (2 minutes)
   - Show player list
   - Demonstrate sorting
   - Click player for details
   - Generate AI description
   - Edit player data
   - Show persistence

3. **Code Walkthrough** (3 minutes)
   - Monorepo structure
   - Backend architecture
   - Frontend organization
   - AI integration
   - Key technical decisions

4. **AI Usage Demo** (1 minute)
   - Show how AI was used during development
   - Explain AI-assisted decisions
   - Discuss benefits and learnings

### 7.2 Documentation
- [ ] Update README with setup instructions
- [ ] Document environment variables
- [ ] Add API documentation
- [ ] Include architecture diagrams
- [ ] List known limitations

### 7.3 Deployment Notes
- [ ] Ensure Docker Compose works end-to-end
- [ ] Test production builds
- [ ] Verify environment configuration
- [ ] Document deployment process

---

## Timeline Estimate

| Phase | Time Estimate | Priority |
|-------|---------------|----------|
| Phase 1: Foundation | 30-45 min | Critical |
| Phase 2: Database & Docker | 20-30 min | Critical |
| Phase 3: Real Data | 30 min | Critical |
| Phase 4: Edit Feature | 20 min | Critical |
| Phase 5: AI Integration | 30-45 min | High |
| Phase 6: Polish | 20 min | Medium |
| Phase 7: Demo Prep | 15 min | High |
| **Total** | **2.5-3.5 hours** | |

**Core Features (1-2 hours)**: Phases 1-4
**Full Implementation**: All phases

---

## Quick Reference: Development Commands

```bash
# Install dependencies
pnpm install

# Start all services (Docker)
docker-compose up

# Start all services (local)
pnpm dev:local

# Seed database
cd packages/backend && pnpm seed

# Run linting
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build
```

---

## Open Questions & Decisions

### Resolved
- [x] Use pnpm for monorepo management
- [x] Mock-first development approach
- [x] Database from start for edits and descriptions

### To Decide
- [ ] Which LLM provider? (OpenAI GPT-4 recommended)
- [ ] Batch vs on-demand AI generation? (On-demand for demo)
- [ ] Pagination strategy? (Virtual scroll if >100 players)
- [ ] Cache external API? (Seed once, use DB as source of truth)

---

## Risk Mitigation

### Risk: API Data Format Unknown
**Mitigation**: Fetch API early, inspect structure, adjust schema

### Risk: LLM API Costs
**Mitigation**: Cache descriptions aggressively, use cheaper model for dev

### Risk: Time Constraints
**Mitigation**: Prioritize core features (Phases 1-4), add AI after

### Risk: Docker Issues
**Mitigation**: Ensure local development works without Docker

---

## Next Steps

1. Review this plan with the team
2. Set up monorepo structure (Phase 1.1)
3. Initialize backend package (Phase 1.2)
4. Initialize frontend package (Phase 1.3)
5. Begin iterative development

**Ready to start building! 🚀**

