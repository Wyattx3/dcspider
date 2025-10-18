FROM node:18-alpine

# Install FFmpeg and build dependencies
RUN apk add --no-cache ffmpeg python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Clean up devDependencies after build (optional)
# RUN npm prune --production

# Expose web dashboard port
EXPOSE 3000

# Start bot
CMD ["npm", "start"]

