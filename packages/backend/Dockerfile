# Backend Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

# Dependencies stage
FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm prisma generate
RUN pnpm build

# Production stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package.json ./
EXPOSE 3001
CMD ["node", "dist/index.js"]

