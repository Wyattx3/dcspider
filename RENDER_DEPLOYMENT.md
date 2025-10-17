# 🚀 Render.com Deployment Guide

DC Spider Music Bot ကို Render.com မှာ deploy လုပ်ရန် အပြည့်အစုံ လမ်းညွှန်ချက်။

## 📋 Prerequisites

- GitHub account
- Render.com account ([Sign up free](https://render.com))
- Discord Bot Token
- Bot code ကို GitHub repository တွင် push လုပ်ထားရမည်

## 🎯 Step-by-Step Deployment

### 1️⃣ GitHub Repository Setup

```bash
# Repository ဖန်တီးပြီး push လုပ်ပါ
git init
git add .
git commit -m "Initial commit: DC Spider Music Bot"
git branch -M main
git remote add origin https://github.com/your-username/dcspider.git
git push -u origin main
```

### 2️⃣ Render Dashboard Setup

1. [Render Dashboard](https://dashboard.render.com) သို့ သွားပါ
2. **"New +"** button ကို နှိပ်ပါ
3. **"Web Service"** ကို ရွေးပါ

### 3️⃣ Connect Repository

1. **"Connect a repository"** ကို နှိပ်ပါ
2. သင့် GitHub account ကို connect လုပ်ပါ
3. `dcspider` repository ကို ရွေးပါ
4. **"Connect"** ကို နှိပ်ပါ

### 4️⃣ Configure Service

**Basic Settings:**
- **Name**: `dcspider-music-bot` (သို့မဟုတ် သင်နှစ်သက်သော name)
- **Region**: ပိုနီးသော region ကို ရွေးပါ
- **Branch**: `main`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Start Command**:
  ```bash
  npm start
  ```

### 5️⃣ Environment Variables

**Environment** section တွင် အောက်ပါ variables များကို ထည့်ပါ:

| Key | Value | Required |
|-----|-------|----------|
| `DISCORD_TOKEN` | your_bot_token | ✅ Yes |
| `CLIENT_ID` | your_client_id | ✅ Yes |
| `PREFIX` | ! | ⚪ Optional |
| `WEB_PORT` | 10000 | ⚪ Optional |
| `WEB_ENABLED` | true | ⚪ Optional |
| `MAX_QUEUE_SIZE` | 100 | ⚪ Optional |
| `NODE_ENV` | production | ⚪ Optional |

**⚠️ Important**: Render က port 10000 ကို အလိုအလျောက် သုံးပါတယ်။

### 6️⃣ Plan Selection

**Free Plan:**
- ✅ 750 hours/month free
- ⚠️ Spins down after 15 mins of inactivity
- ⚠️ Cold starts (~30 seconds)

**Starter Plan ($7/month):**
- ✅ Always on (24/7)
- ✅ No cold starts
- ✅ Better performance

**Note**: Music bot အတွက် 24/7 လိုအပ်တယ်ဆိုရင် Starter plan ကို recommend လုပ်ပါတယ်။

### 7️⃣ Deploy

1. **"Create Web Service"** ကို နှိပ်ပါ
2. Render က automatically build နှင့် deploy လုပ်ပါမယ်
3. Logs တွင် deployment progress ကို ကြည့်နိုင်ပါတယ်

## 🔄 Redeploy လုပ်နည်း

### Method 1: Automatic Redeploy (Recommended)

**GitHub Push တိုင်း auto-deploy:**

```bash
# Code ကို update လုပ်ပါ
git add .
git commit -m "Update: added new feature"
git push origin main
```

Render က automatically detect လုပ်ပြီး redeploy လုပ်ပါမယ်။

### Method 2: Manual Redeploy

**Render Dashboard မှ:**

1. Service page သို့ သွားပါ
2. **"Manual Deploy"** ကို နှိပ်ပါ
3. **"Deploy latest commit"** သို့မဟုတ် **"Clear build cache & deploy"** ကို ရွေးပါ

### Method 3: Rollback to Previous Version

**အရင် version ကို ပြန်သုံးချင်ရင်:**

1. Service page → **"Events"** tab
2. အောင်မြင်ခဲ့သော deployment ကို ရွေးပါ
3. **"Rollback to this version"** ကို နှိပ်ပါ

## 📊 Monitoring

### View Logs

**Real-time logs ကြည့်ရန်:**

1. Service page → **"Logs"** tab
2. Real-time console output ကို မြင်ရပါမယ်

```bash
# Logs တွင် မြင်ရမည့် output:
✅ Bot ကို login ဝင်ပြီးပါပြီ!
📊 Servers: 5
👥 Users: 150
✅ Loaded command: play
✅ Loaded command: pause
...
```

### Check Status

**Service status စစ်ဆေးရန်:**

- 🟢 **Live** - Running normally
- 🟡 **Building** - Deploying
- 🔴 **Failed** - Deployment failed
- ⚪ **Suspended** - Free tier inactive

## ⚙️ Special Configuration for Render

### Update render.yaml (Optional)

Render service ကို code ဖြင့် configure လုပ်ချင်ရင်:

```yaml
# render.yaml
services:
  - type: web
    name: dcspider-music-bot
    env: node
    region: oregon
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PREFIX
        value: "!"
      - key: WEB_PORT
        value: 10000
```

### Update package.json Scripts

Render အတွက် scripts ကို optimize လုပ်ပါ:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "postinstall": "npm run build",
    "register": "node dist/utils/registerCommands.js"
  }
}
```

## 🔧 Troubleshooting

### Bot ကို deploy လုပ်၍မရပါ

**Build failed:**
```bash
# Check logs for errors
# Common issues:
# - Missing dependencies in package.json
# - TypeScript compilation errors
# - Node version mismatch
```

**Solution:**
```bash
# Local မှာ build လုပ်ကြည့်ပါ
npm run build

# အောင်မြင်ရင် push လုပ်ပါ
git push origin main
```

### Bot offline ဖြစ်နေပါ

**Free plan cold start:**
- Free plan က 15 minutes inactive ဖြစ်ရင် sleep ဝင်ပါတယ်
- Request ရှိမှ wake up ဖြစ်ပါမယ်

**Solution:**
- Starter plan ($7/mo) သို့ upgrade လုပ်ပါ
- သို့မဟုတ် keep-alive service သုံးပါ

### FFmpeg Issues

Render တွင် FFmpeg အလိုအလျောက် install ထားပါသည်။ ဒါပေမယ့် issue ရှိရင်:

**Solution:**
```json
// package.json
{
  "dependencies": {
    "ffmpeg-static": "^5.2.0"
  }
}
```

### Web Dashboard မဖွင့်နိုင်ပါ

Render က port ကို auto-assign လုပ်ပါတယ်။

**Update src/config.ts:**
```typescript
export const config = {
  webPort: parseInt(process.env.PORT || process.env.WEB_PORT || '10000'),
  // ...
};
```

**Update src/web/server.ts:**
```typescript
const PORT = process.env.PORT || config.webPort;
server.listen(PORT, () => {
  console.log(`Web dashboard running on port ${PORT}`);
});
```

## 🎯 Keep Bot Always Online (Free Plan)

Free plan တွင် bot ကို awake ထားချင်ရင်:

### Method 1: UptimeRobot

1. [UptimeRobot](https://uptimerobot.com) တွင် account ဖန်တီးပါ
2. New Monitor ထည့်ပါ:
   - Type: HTTP(s)
   - URL: `https://your-app.onrender.com`
   - Interval: 5 minutes
3. Bot ကို 5 minutes တိုင်း ping ပေးပါမယ်

### Method 2: Cron Job

**cron-job.org သုံးပါ:**
1. [cron-job.org](https://cron-job.org) တွင် register လုပ်ပါ
2. Job ဖန်တီးပါ:
   - URL: `https://your-app.onrender.com`
   - Schedule: Every 5 minutes
3. Save & Enable

## 🚀 Production Best Practices

### 1. Environment Security

```bash
# .env file ကို commit မလုပ်ပါနှင့်
# .gitignore တွင် ရှိမရှိ စစ်ဆေးပါ
echo ".env" >> .gitignore
```

### 2. Error Logging

**Better error handling:**
```typescript
process.on('unhandledRejection', (error: Error) => {
  console.error('[UNHANDLED REJECTION]:', error);
  // Send to logging service (optional)
});
```

### 3. Health Check Endpoint

**src/web/server.ts တွင် ထည့်ပါ:**
```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

### 4. Graceful Shutdown

**src/index.ts တွင်:**
```typescript
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await client.destroy();
  process.exit(0);
});
```

## 📈 Scaling

### Upgrade Plan

**Free → Starter ($7/mo):**
- 24/7 uptime
- No cold starts
- Better performance

**Starter → Professional ($25/mo):**
- More resources
- Multiple instances
- Advanced features

### Monitor Usage

Render dashboard တွင်:
- CPU usage
- Memory usage
- Bandwidth
- Build minutes

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Status](https://status.render.com)
- [Render Community](https://community.render.com)
- [Discord.js Guide](https://discordjs.guide)

## ✅ Deployment Checklist

- [ ] Code ကို GitHub သို့ push လုပ်ပြီး
- [ ] Render account ဖန်တီးပြီး
- [ ] Repository connected ဖြစ်ပြီး
- [ ] Environment variables configure လုပ်ပြီး
- [ ] Build & start commands မှန်ကန်စွာ setup လုပ်ပြီး
- [ ] Bot token သည် valid ဖြစ်သည်
- [ ] Deployment အောင်မြင်ပြီး
- [ ] Bot online ဖြစ်နေပြီ
- [ ] Commands များ အလုပ်လုပ်နေပြီ
- [ ] Web dashboard accessible ဖြစ်ပြီး

## 💡 Pro Tips

1. **Auto-deploy ကို enable လုပ်ထားပါ** - GitHub push တိုင်း auto-update
2. **Starter plan သုံးပါ** - Music bot အတွက် 24/7 uptime လိုအပ်သည်
3. **Logs ကို regular စစ်ဆေးပါ** - Issues များကို အစောပိုင်း သိနိုင်သည်
4. **Environment variables ကို secure ထားပါ** - Token များကို ဘယ်တော့မှ မျှဝေပါနှင့်
5. **Health checks setup လုပ်ပါ** - Service monitoring အတွက်

---

Render မှာ bot ကို deploy လုပ်ပြီးရင် Discord server များတွင် music streaming ကို enjoy လုပ်ပါ! 🎵

**Your Render URL:** `https://your-service-name.onrender.com`

