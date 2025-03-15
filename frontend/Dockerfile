# Stage 1: Build
FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Build Next.js project
RUN npm run build

# Stage 2: Run
FROM node:20 AS runner
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose Next.js default port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]

