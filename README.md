# AI Baseball Cards ⚾

Baseball player stats viewer with AI-generated descriptions • React + Fastify + LangGraph + Prisma • TypeScript monorepo

## 🎯 Project Overview

A full-stack application that displays baseball player statistics with AI-powered descriptions. Built as a technical interview exercise demonstrating modern web development practices and AI integration.

### Key Features

- 📊 Display baseball player statistics from external API
- 🔄 Sort players by hits or home runs
- 🤖 AI-generated player descriptions using LLMs
- ✏️ Edit player data with persistence
- 💾 PostgreSQL database for data management
- 🐳 Docker containerization for easy deployment

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** component library
- **TanStack Query** for server state management
- **Vite** as build tool

### Backend
- **Fastify** Node.js framework
- **Prisma** ORM with PostgreSQL
- **Zod** for runtime validation
- **TypeScript** for type safety

### AI Agent
- **LangGraph** for AI orchestration
- **LLM Integration** for description generation

### Infrastructure
- **pnpm** workspaces monorepo
- **Biome** for linting and formatting
- **Docker & Docker Compose** for containerization
- **PostgreSQL 15** database

## 📦 Project Structure

```
ai-baseball-cards/
├── packages/
│   ├── frontend/          # React application
│   ├── backend/           # Fastify API server
│   └── ai-agent/          # LangGraph AI agent
├── memory-bank/           # Project documentation
├── docker-compose.yml     # Docker orchestration
├── pnpm-workspace.yaml    # Monorepo configuration
└── package.json           # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-baseball-cards
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Backend
cp packages/backend/.env.example packages/backend/.env

# Add your database URL and API keys
```

4. Start with Docker (recommended)
```bash
pnpm dev
```

Or start locally:
```bash
pnpm dev:local
```

5. Seed the database
```bash
cd packages/backend
pnpm seed
```

### Development URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

## 📝 Available Scripts

```bash
# Development
pnpm dev              # Start all services with Docker
pnpm dev:local        # Start services locally

# Build
pnpm build            # Build all packages

# Code Quality
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome

# Cleanup
pnpm clean            # Clean all build artifacts
```

## 🎨 Features Demo

### 1. Player List View
- Displays all baseball players with key statistics
- Sortable by hits or home runs (ascending/descending)
- Responsive card-based layout

### 2. Player Detail View
- Click any player to see detailed statistics
- View AI-generated player description
- Generate or regenerate descriptions on-demand

### 3. Edit Player Data
- Edit button on player details
- Form validation using Zod schemas
- Optimistic UI updates with TanStack Query
- Changes persist to PostgreSQL database

## 🤖 AI Integration

The AI agent uses LangGraph to orchestrate LLM calls for generating engaging player descriptions based on their statistics. Descriptions are:

- Generated on-demand or batch processed
- Cached in the database to minimize API calls
- Context-aware based on player performance metrics
- Regenerable if needed

## 📚 Documentation

Detailed documentation is available in the `memory-bank/` directory:

- `projectbrief.md` - Project requirements and goals
- `productContext.md` - User experience and features
- `techContext.md` - Technical stack and architecture
- `systemPatterns.md` - Design patterns and conventions
- `activeContext.md` - Current work and decisions
- `progress.md` - Implementation checklist

See `IMPLEMENTATION_PLAN.md` for detailed development phases.

## 🧪 Testing

```bash
# Run tests (when implemented)
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up
```

### Production Build
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🛠️ Development Approach

This project follows a **mock-first, iterative development** approach:

1. Build UI with mock data
2. Implement backend with mock endpoints
3. Connect real data sources
4. Add AI features
5. Polish and optimize

## 📊 API Endpoints

```
GET    /api/players              # List all players (with optional sorting)
GET    /api/players/:id          # Get player details
PUT    /api/players/:id          # Update player data
POST   /api/players/:id/description  # Generate AI description
```

## 🔒 Environment Variables

### Backend (`packages/backend/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/baseball_cards
PORT=3001
NODE_ENV=development

# AI Configuration
OPENAI_API_KEY=your_api_key_here
# or
ANTHROPIC_API_KEY=your_api_key_here
```

### Frontend (`packages/frontend/.env`)
```env
VITE_API_URL=http://localhost:3001
```

## 🤝 Contributing

This is a technical interview project. For collaboration:

1. Follow existing patterns and conventions
2. Use Biome for code formatting
3. Write type-safe TypeScript (no `any`)
4. Update documentation as needed

## 📄 License

ISC

## 🙏 Acknowledgments

- Baseball data API: [Resource Hub](https://resource-hub-production.s3.us-west-2.amazonaws.com/uploads/62/baseball_data.json)
- Built with assistance from AI pair programming

---

**Status**: 🚧 In Development

**Timeline**: Core features (1-2 hours) | Full implementation (2.5-3.5 hours)

