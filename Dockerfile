FROM node:18-alpine

# Install FFmpeg and build dependencies
RUN apk add --no-cache ffmpeg python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose web dashboard port
EXPOSE 3000

# Start bot
CMD ["npm", "start"]

