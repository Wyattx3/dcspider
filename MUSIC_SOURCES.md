# 🎵 Supported Music Sources

DC Spider Music Bot ကအောက်ပါ music sources များကို support လုပ်ပါတယ်။

## ✅ Currently Supported

### 1. **YouTube** 🎥
- Video URLs
- Playlist URLs  
- Search queries
- Status: ✅ Working (with getFreeClientID)

**Examples:**
```
/play https://www.youtube.com/watch?v=dQw4w9WgXcQ
/play https://youtu.be/dQw4w9WgXcQ
/play never gonna give you up
/play https://youtube.com/playlist?list=...
```

### 2. **SoundCloud** 🎧 ⭐ NEW!
- Track URLs
- Playlist URLs
- Search queries (fallback)
- Status: ✅ Working

**Examples:**
```
/play https://soundcloud.com/artist/track
/play https://soundcloud.com/artist/sets/playlist
/play despacito soundcloud
```

## 🔄 How It Works

Bot သည် အောက်ပါ order နဲ့ ကြိုးစားသည်:

1. **URL Detection** - Link type ကို detect လုပ်သည်
   - YouTube URL → YouTube streaming
   - SoundCloud URL → SoundCloud streaming

2. **Search Query** - Plain text search ဆိုရင်
   - SoundCloud မှာ ရှာသည် (ပထမ)
   - မတွေ့ရင် YouTube မှာ ရှာသည် (fallback)

## 🎯 Recommended Sources

| Source | Speed | Quality | Reliability | Ads |
|--------|-------|---------|-------------|-----|
| **SoundCloud** | ⚡⚡⚡ Fast | 🎵 128kbps | ✅ Excellent | ❌ None |
| **YouTube** | ⚡⚡ Medium | 🎵 Variable | ⚠️ Good* | ❌ None |

*YouTube requires cookies for some videos

## 📊 Usage Statistics

**Automatic Source Selection:**
- Direct URLs: Use specified source
- Search queries: Try SoundCloud → fallback to YouTube

## 🚀 Future Support (Possible)

### Option 1: Spotify Integration
```bash
npm install spotify-url-info
```
- Requires Spotify API
- Can extract metadata only
- Needs YouTube/SoundCloud for actual streaming

### Option 2: Deezer Support  
```bash
npm install deezer-js
```
- API available
- May require authentication

### Option 3: Direct Audio URLs
- MP3/M4A/OPUS files
- Radio streams
- Status: ✅ Already works via play-dl

**Examples:**
```
/play http://example.com/song.mp3
/play http://stream.radio.com/live
```

### Option 4: Local Files
- Upload audio files
- Bot downloads and plays
- Requires file storage

## 🔧 Technical Details

### play-dl Library Support

**Built-in:**
- ✅ YouTube
- ✅ SoundCloud  
- ✅ Spotify URLs (metadata only)
- ✅ Deezer URLs (metadata only)
- ✅ Direct audio streams

**Streaming:**
- ✅ YouTube → Direct streaming
- ✅ SoundCloud → Direct streaming
- ❌ Spotify → Requires YouTube fallback
- ❌ Deezer → Requires alternative

## 💡 Best Practices

### For Users:

**1. Use Direct URLs when possible:**
```
✅ /play https://soundcloud.com/...
⚪ /play despacito
```

**2. Specify source in search:**
```
/play despacito soundcloud
/play shape of you youtube
```

### For Developers:

**Add custom source command:**
```typescript
/play-soundcloud <query>
/play-youtube <query>
/play-url <direct-url>
```

## 🎼 Quality Comparison

| Source | Audio Quality | Comments |
|--------|---------------|----------|
| SoundCloud | 128 kbps MP3 | Good quality |
| YouTube | 48-128 kbps | Variable, depends on video |
| Direct MP3 | Depends | Original quality |
| Radio Streams | Depends | Usually 128 kbps |

## ⚙️ Configuration

### Enable/Disable Sources

```typescript
// src/config.ts
export const config = {
  sources: {
    youtube: true,
    soundcloud: true,
    directUrls: true,
  },
  
  searchPriority: ['soundcloud', 'youtube'], // Order matters!
};
```

## 🔍 Source Detection

Bot automatically detects:
- `youtube.com` or `youtu.be` → YouTube
- `soundcloud.com` → SoundCloud
- `.mp3`, `.m4a`, `.opus` → Direct audio
- Plain text → Search (SoundCloud → YouTube fallback)

## 🆘 Troubleshooting

### "No results found"
- Try different source
- Check spelling
- Use direct URL

### "Cannot play this song"
- Region-restricted content
- Requires authentication
- Try alternative source

### "Stream error"
- Network issue
- Source unavailable
- Bot will skip and try next song

## 📈 Stats

**Current Implementation:**
- ✅ 2 sources active (YouTube + SoundCloud)
- ✅ Auto fallback enabled
- ✅ Direct URL support
- ⚡ Fast source detection

---

Bot သည် ယခု **multi-source** support ရှိပြီး အကောင်းဆုံး streaming experience ပေးပါမယ်! 🎵

