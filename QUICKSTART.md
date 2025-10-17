# ⚡ Quick Start Guide

DC Spider Music Bot ကို အမြန်ဆုံး စတင်အသုံးပြုရန် လမ်းညွှန်ချက်။

## 🚀 5 မိနစ်အတွင်း စတင်ပါ

### 1️⃣ Discord Bot ဖန်တီးပါ

1. [Discord Developer Portal](https://discord.com/developers/applications) သို့သွားပါ
2. "New Application" ကို နှိပ်ပါ
3. Bot name ထည့်ပြီး Create နှိပ်ပါ
4. "Bot" tab သို့ သွားပါ
5. "Add Bot" နှိပ်ပါ
6. Bot Token ကို Copy လုပ်ပါ (ဤသည်မှာ `DISCORD_TOKEN` ဖြစ်သည်)
7. "OAuth2" → "General" သို့သွားပြီး Client ID ကို Copy လုပ်ပါ

### 2️⃣ Bot Permissions

"Bot" tab တွင်:
- ✅ MESSAGE CONTENT INTENT ကို enable လုပ်ပါ
- ✅ PRESENCE INTENT ကို enable လုပ်ပါ (optional)
- ✅ SERVER MEMBERS INTENT ကို enable လုပ်ပါ (optional)

### 3️⃣ Bot ကို Server သို့ ဖိတ်ပါ

1. "OAuth2" → "URL Generator" သို့သွားပါ
2. Scopes: 
   - ✅ `bot`
   - ✅ `applications.commands`
3. Bot Permissions:
   - ✅ Read Messages/View Channels
   - ✅ Send Messages
   - ✅ Embed Links
   - ✅ Connect
   - ✅ Speak
   - ✅ Use Voice Activity
4. URL ကို copy လုပ်ပြီး browser တွင် ဖွင့်ပါ
5. Server ကို select လုပ်ပြီး Authorize နှိပ်ပါ

### 4️⃣ Project Setup

```bash
# Repository ကို clone လုပ်ပါ
git clone https://github.com/yourusername/dcspider.git
cd dcspider

# Dependencies install လုပ်ပါ
npm install

# Environment variables setup
cp .env.example .env
```

`.env` file ကို edit လုပ်ပါ:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
PREFIX=!
```

### 5️⃣ Bot ကို Run ပါ

```bash
# Build project
npm run build

# Register slash commands
npm run register

# Start bot
npm start
```

Development mode:
```bash
npm run dev
```

## ✅ အောက်ပါတို့ လိုအပ်ပါသည်

### System Requirements
- ✅ Node.js 18.x သို့မဟုတ် ပိုမြင့်သော version
- ✅ FFmpeg installed
- ✅ 1GB+ RAM
- ✅ Internet connection

### FFmpeg Installation

**Windows:**
1. [FFmpeg Download](https://www.gyan.dev/ffmpeg/builds/) မှ download လုပ်ပါ
2. Extract လုပ်ပါ
3. PATH သို့ ထည့်ပါ

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ffmpeg
```

Verify installation:
```bash
ffmpeg -version
```

## 🎵 First Commands

Bot သည် running ဖြစ်ပြီးနောက်:

1. Discord server တွင် voice channel သို့ ဝင်ပါ
2. Text channel တွင် type လုပ်ပါ:
```
/play Never Gonna Give You Up
```

3. အခြား commands များကို စမ်းကြည့်ပါ:
```
/queue      # သီချင်းစာရင်းကို ကြည့်ပါ
/pause      # ခဏရပ်ပါ
/resume     # ပြန်ဖွင့်ပါ
/volume 80  # အသံချိန်ညှိပါ
/help       # Commands အားလုံးကို ကြည့်ပါ
```

## 🌐 Web Dashboard

Bot running ဖြစ်ပြီးနောက် dashboard ကို ကြည့်ပါ:

```
http://localhost:3000
```

Dashboard features:
- 📊 Real-time statistics
- 🎵 Active queues
- 📈 Server activity
- ⏱️ Uptime monitoring

## 🐛 Common Issues

### Bot ကို voice channel သို့ ဝင်၍မရပါ

**Solution:**
- Bot တွင် "Connect" နှင့် "Speak" permissions ရှိမရှိ စစ်ဆေးပါ
- Voice channel ပြည့်မနေပါစေနှင့်
- Server verification level ကို စစ်ဆေးပါ

### Commands များ မမြင်ရပါ

**Solution:**
```bash
# Commands ကို register လုပ်ပါ
npm run register

# Bot ကို restart လုပ်ပါ
# Ctrl+C နှိပ်ပြီး
npm start
```

### Audio ဖွင့်၍မရပါ

**Solution:**
- FFmpeg installed ရှိမရှိ စစ်ဆေးပါ: `ffmpeg -version`
- Internet connection ကောင်းမကောင်း စစ်ဆေးပါ
- YouTube URL သည် valid ဖြစ်မဖြစ် စစ်ဆေးပါ

### "Invalid Token" Error

**Solution:**
- `.env` file တွင် `DISCORD_TOKEN` မှန်ကန်မှု စစ်ဆေးပါ
- Token တွင် extra spaces မရှိပါစေနှင့်
- Bot token ကို regenerate လုပ်ကြည့်ပါ (Developer Portal)

## 📚 Next Steps

Bot ကို အသုံးပြုနိုင်ပြီဖြစ်သည်! ယခု:

1. 📖 [Full Documentation](README.md) ကို ဖတ်ပါ
2. 🎛️ [All Commands](README.md#commands) ကို လေ့လာပါ
3. 🚀 [Deployment Guide](DEPLOYMENT.md) ကို ကြည့်ပါ (Production အတွက်)
4. 🤝 [Contributing](CONTRIBUTING.md) ကို ကြည့်ပါ (Contribute လုပ်ချင်ရင်)

## 💬 Support

အကူအညီလိုအပ်ပါက:
- 📖 [Full README](README.md) ကို ဖတ်ပါ
- 🐛 [Report Issues](https://github.com/yourusername/dcspider/issues)
- 💬 [Discussions](https://github.com/yourusername/dcspider/discussions)

## 🎉 Enjoy!

သင့် Discord server တွင် music ကို enjoy လုပ်ပါ! 🎵

---

**အရေးကြီးသော မှတ်ချက်:**
- Bot token ကို မျှဝေခြင်း မပြုပါနှင့်
- `.env` file ကို git commit မလုပ်ပါနှင့်
- Production deployment အတွက် [Deployment Guide](DEPLOYMENT.md) ကို လိုက်နာပါ

