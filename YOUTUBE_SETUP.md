# 🎵 YouTube Streaming Setup Guide

play-dl library အတွက် YouTube cookies setup လုပ်ခြင်း။

## ⚠️ Problem

YouTube က bot traffic များကို detect လုပ်ပြီး block လုပ်နိုင်ပါတယ်:
```
Error: While getting info from url - Sign in to confirm you're not a bot
```

## ✅ Solution Options

### Option 1: အလွယ်ဆုံး - getFreeClientID() (Current)

Bot မှာ `play.getFreeClientID()` ကို အလိုအလျောက် ခေါ်ထားပြီးပါပြီ။ အများစုသော videos များ အလုပ်လုပ်သင့်ပါတယ်။

### Option 2: YouTube Cookies Setup (Most Reliable)

#### **Step 1: Get YouTube Cookies**

**Method A: Browser Extension (Recommended)**

1. Chrome/Firefox မှာ **"Get cookies.txt LOCALLY"** extension install လုပ်ပါ
2. YouTube.com သို့ login ဝင်ပါ
3. Extension ကို click လုပ်ပြီး cookies export လုပ်ပါ
4. `youtube_cookies.txt` အဖြစ် save လုပ်ပါ

**Method B: Manual (Advanced)**

1. YouTube.com သို့ login ဝင်ပါ
2. Browser Developer Tools (F12) ဖွင့်ပါ
3. Application → Cookies → youtube.com
4. အရေးကြီးသော cookies များကို copy လုပ်ပါ:
   - `HSID`
   - `SSID`
   - `APISID`
   - `SAPISID`
   - `SID`

#### **Step 2: Setup Cookies in Bot**

**Local Development:**

```typescript
// src/index.ts မှာ ထည့်ပါ
import play from 'play-dl';
import fs from 'fs';
import path from 'path';

// Load YouTube cookies
const cookiesPath = path.join(__dirname, '..', 'youtube_cookies.txt');
if (fs.existsSync(cookiesPath)) {
  await play.setToken({
    youtube: {
      cookie: fs.readFileSync(cookiesPath, 'utf-8')
    }
  });
  console.log('✅ YouTube cookies loaded');
}
```

**Production (Render):**

Cookies ကို environment variable အဖြစ် ထည့်ပါ:

1. Cookies file content ကို copy လုပ်ပါ
2. Render Dashboard → Environment Variables
3. New variable ထည့်ပါ:
   - Key: `YOUTUBE_COOKIES`
   - Value: (paste cookies content)

```typescript
// src/index.ts
if (process.env.YOUTUBE_COOKIES) {
  await play.setToken({
    youtube: {
      cookie: process.env.YOUTUBE_COOKIES
    }
  });
  console.log('✅ YouTube cookies loaded from env');
}
```

### Option 3: Alternative Libraries

**Use ytdl-core or yt-dlp instead:**

```bash
npm install ytdl-core
# or
npm install youtube-dl-exec
```

## 🔧 Current Setup Status

✅ **getFreeClientID() initialized** - Most videos should work
⚠️ **Cookies not configured** - Some videos may fail

## 📝 Testing

Test with different video types:

```
/play never gonna give you up
/play https://www.youtube.com/watch?v=dQw4w9WgXcQ
/play https://youtu.be/dQw4w9WgXcQ
```

## 🐛 Troubleshooting

### Error: "Sign in to confirm you're not a bot"

**Solutions:**
1. ✅ getFreeClientID() က အလုပ်လုပ်နေပြီ - ထပ်စမ်းကြည့်ပါ
2. YouTube cookies setup လုပ်ပါ (Option 2)
3. Alternative library သုံးပါ (Option 3)
4. VPN သုံးပြီး test လုပ်ကြည့်ပါ

### Error: "Video unavailable"

**Solutions:**
- Age-restricted video ဖြစ်နိုင်သည်
- Region-blocked video ဖြစ်နိုင်သည်
- Private video ဖြစ်နိုင်သည်
- Cookies setup လုပ်ပါ

### Error: "Cannot read property"

**Solutions:**
- play-dl version update လုပ်ကြည့်ပါ: `npm update play-dl`
- Node.js version စစ်ဆေးပါ (18.x+ required)

## 📊 Performance Tips

1. **Cache video info** - Reduce API calls
2. **Use search instead of URL** - More reliable
3. **Implement retry logic** - Auto-retry failed requests
4. **Monitor rate limits** - Avoid too many requests

## 🎯 Recommended Approach

**For Production:**
1. Start with getFreeClientID() (current setup) ✅
2. Monitor error rates
3. If errors > 10%, setup YouTube cookies
4. Consider alternative libraries if issues persist

**Current Status:** Bot က getFreeClientID() နဲ့ initialized ဖြစ်ပြီးသား! အများစု videos အလုပ်လုပ်သင့်ပါတယ်။

---

**Note:** YouTube cookies သည် 6-12 months တာ valid ဖြစ်ပြီး expired ဖြစ်ရင် ပြန်လည် setup လုပ်ရပါမယ်။








