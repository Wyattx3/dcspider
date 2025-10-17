# 🚀 Deployment Guide

DC Spider Music Bot ကို production environment တွင် deploy လုပ်ရန် လမ်းညွှန်ချက်။

## 📋 Prerequisites

### System Requirements
- Node.js 18.x သို့မဟုတ် ပိုမြင့်သော version
- FFmpeg installed
- 2GB+ RAM (recommended)
- 10GB+ Storage
- Linux/Ubuntu Server (recommended)

### Discord Requirements
- Discord Bot Token
- Bot Permissions:
  - View Channels
  - Send Messages
  - Embed Links
  - Connect
  - Speak
  - Use Voice Activity

## 🖥️ VPS Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install FFmpeg
sudo apt install -y ffmpeg

# Verify installations
node --version
npm --version
ffmpeg -version
```

### 2. Clone and Setup

```bash
# Clone repository
git clone https://github.com/yourusername/dcspider.git
cd dcspider

# Install dependencies
npm install

# Create environment file
cp .env.example .env
nano .env
```

### 3. Configure Environment

Edit `.env` file:
```env
DISCORD_TOKEN=your_production_token
CLIENT_ID=your_client_id
PREFIX=!
WEB_PORT=3000
WEB_ENABLED=true
```

### 4. Build Project

```bash
# Build TypeScript
npm run build

# Register commands
npm run register
```

### 5. Process Management with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start bot
pm2 start dist/index.js --name dcspider-bot

# Configure auto-start
pm2 startup
pm2 save

# Monitor bot
pm2 monit

# View logs
pm2 logs dcspider-bot
```

### PM2 Commands

```bash
# Restart bot
pm2 restart dcspider-bot

# Stop bot
pm2 stop dcspider-bot

# Delete from PM2
pm2 delete dcspider-bot

# Update bot
git pull
npm install
npm run build
pm2 restart dcspider-bot
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

# Install FFmpeg
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
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  dcspider-bot:
    build: .
    container_name: dcspider-music-bot
    restart: unless-stopped
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - CLIENT_ID=${CLIENT_ID}
      - PREFIX=!
      - WEB_PORT=3000
      - WEB_ENABLED=true
    ports:
      - "3000:3000"
    volumes:
      - ./logs:/app/logs
```

### Deploy with Docker

```bash
# Build image
docker-compose build

# Start container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down

# Update and restart
git pull
docker-compose up -d --build
```

## ☁️ Cloud Platforms

### Heroku

1. Create `Procfile`:
```
worker: npm start
web: npm start
```

2. Add buildpacks:
```bash
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
```

3. Set environment variables:
```bash
heroku config:set DISCORD_TOKEN=your_token
heroku config:set CLIENT_ID=your_client_id
```

4. Deploy:
```bash
git push heroku main
```

### Railway

1. Connect GitHub repository
2. Add environment variables in dashboard
3. Set start command: `npm start`
4. Deploy automatically

### DigitalOcean App Platform

1. Connect repository
2. Configure environment variables
3. Set build command: `npm run build`
4. Set run command: `npm start`

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` file
- Use secure token storage
- Rotate tokens regularly

### 2. Server Security
```bash
# Setup firewall
sudo ufw allow 22
sudo ufw allow 3000
sudo ufw enable

# Auto updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### 3. Bot Permissions
- Use least privilege principle
- Only grant required permissions
- Regular audit of permissions

## 📊 Monitoring

### Logs

```bash
# PM2 logs
pm2 logs dcspider-bot --lines 100

# Docker logs
docker-compose logs -f --tail=100

# System logs
journalctl -u dcspider-bot -f
```

### Health Checks

```bash
# Check bot status
pm2 status

# Check bot uptime
pm2 info dcspider-bot

# Monitor resources
pm2 monit
```

## 🔄 Auto Updates

### Setup auto-update script

Create `update.sh`:
```bash
#!/bin/bash
cd /path/to/dcspider
git pull
npm install
npm run build
pm2 restart dcspider-bot
echo "Bot updated successfully!"
```

Make executable:
```bash
chmod +x update.sh
```

Setup cron job:
```bash
crontab -e
# Add line (update every day at 3 AM):
0 3 * * * /path/to/update.sh >> /var/log/dcspider-update.log 2>&1
```

## 🆘 Troubleshooting

### Bot Crashes

```bash
# Check PM2 logs
pm2 logs dcspider-bot --err

# Increase memory limit
pm2 start dist/index.js --name dcspider-bot --max-memory-restart 500M
```

### FFmpeg Issues

```bash
# Reinstall FFmpeg
sudo apt remove ffmpeg
sudo apt install ffmpeg

# Verify
ffmpeg -version
which ffmpeg
```

### Port Issues

```bash
# Check if port is in use
sudo netstat -tulpn | grep 3000

# Kill process using port
sudo kill -9 $(lsof -ti:3000)
```

## 📈 Performance Optimization

### Node.js Optimization

```bash
# Set production mode
export NODE_ENV=production

# Increase memory limit
pm2 start dist/index.js --name dcspider-bot --node-args="--max-old-space-size=2048"
```

### Database Caching (Optional)

For large deployments, consider adding Redis for caching:
```bash
sudo apt install redis-server
sudo systemctl enable redis-server
```

## 🔗 Reverse Proxy (Nginx)

For web dashboard with custom domain:

```nginx
server {
    listen 80;
    server_name dashboard.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/dcspider /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## ✅ Final Checklist

- [ ] Server updated and secured
- [ ] Node.js and FFmpeg installed
- [ ] Bot token configured
- [ ] Dependencies installed
- [ ] Project built successfully
- [ ] Commands registered
- [ ] PM2 configured
- [ ] Firewall configured
- [ ] Monitoring setup
- [ ] Backups configured
- [ ] Documentation updated

---

Bot သည် production environment တွင် အသင့်အတော်ဆုံး အလုပ်လုပ်ပါစေ! 🎵

