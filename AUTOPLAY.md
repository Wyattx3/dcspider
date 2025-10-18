# 🎵 Auto-play Feature

Queue ကုန်သွားရင် related သီချင်းများကို အလိုအလျောက် ဆက်တိုက် ဖွင့်ပေးသော feature!

## ✨ Feature Overview

**Auto-play** သည် YouTube/Spotify ကဲ့သို့ queue ကုန်သွားတဲ့အခါ အလိုအလျောက် related သီချင်းများကို ဆက်ဖွင့်ပေးသော feature ဖြစ်သည်။

## 🎯 How It Works

### **1. Enable Auto-play:**
```
/autoplay
```
→ Auto-play mode ဖွင့်မည်

### **2. Play a Song:**
```
/play despacito
```
→ Despacito ဖွင့်မည်

### **3. Automatic Continuation:**
→ Despacito ပြီးသွားရင် bot က:
- နောက်ဆုံး ဖွင့်ခဲ့သော သီချင်းကို မှတ်သားသည်
- Artist name နဲ့ related tracks ရှာသည်
- Similar သီချင်း တစ်ပုဒ် အလိုအလျောက် queue ထဲထည့်သည်
- ဆက်ဖွင့်သည်!

## 🔄 Workflow

```
┌─────────────────────┐
│  /autoplay ဖွင့်    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  /play song A       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Song A ဖွင့်နေသည် │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Song A ပြီးသည်    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  🎵 Auto-play:      │
│  Related track ရှာ  │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  Song B ထည့်ပြီး   │
│  အလိုအလျောက် ဖွင့် │
└──────────┬──────────┘
           ↓
     ထပ်တလဲလဲ...
```

## 🎮 Commands

### Enable/Disable Auto-play:
```bash
/autoplay
```
Toggle ဖြစ်သည် - ဖွင့်ထားရင် ပိတ်မည်၊ ပိတ်ထားရင် ဖွင့်မည်

### Status Check:
Auto-play status ကို check လုပ်ရန်:
```bash
/autoplay
```
Response:
```
✅ Auto-play Mode
Auto-play mode ကို ဖွင့်လိုက်ပါပြီ

🎵 Queue ကုန်သွားရင် related သီချင်းများ အလိုအလျောက် ဆက်ဖွင့်ပါမယ်
```

## 🧠 Intelligence

Bot သည် related tracks ကို ရှာရန် အောက်ပါ strategies များကို အသုံးပြုသည်:

### **1. Artist-based Search:**
```typescript
// လက်ရှိသီချင်း: "Shape of You - Ed Sheeran"
// Search: "Ed Sheeran"
→ Ed Sheeran ၏ အခြား သီချင်းများ
```

### **2. Title-based Search:**
```typescript
// လက်ရှိသီချင်း: "Despacito - Luis Fonsi ft. Daddy Yankee"
// Search: "Despacito"
→ Similar style သီချင်းများ
```

### **3. Fallback Search:**
```typescript
// အပေါ်က မရှိရင်:
// Search: "popular music"
→ Popular trending သီချင်းများ
```

## 🎵 Example Usage

### **Scenario 1: Continuous Listening**

```bash
User: /autoplay
Bot:  ✅ Auto-play enabled

User: /play despacito
Bot:  🎵 Now playing: Despacito

# After song ends...
Bot:  🎵 Auto-play: Finding related tracks...
Bot:  ✅ Auto-play added: Shape of You
Bot:  🎵 Now playing: Shape of You

# After song ends...
Bot:  🎵 Auto-play: Finding related tracks...
Bot:  ✅ Auto-play added: Perfect
Bot:  🎵 Now playing: Perfect

# Continues forever until you stop!
```

### **Scenario 2: Mixed with Manual Queue**

```bash
User: /autoplay
User: /play song A
User: /play song B

# Bot plays:
# 1. Song A (manual)
# 2. Song B (manual)
# 3. Song C (auto-play based on B)
# 4. Song D (auto-play based on C)
# ...
```

## 🔧 Technical Details

### **Queue Management:**
```typescript
interface MusicQueue {
  songs: Song[];
  autoplay: boolean;          // ✨ NEW!
  lastPlayedSong: Song | null; // ✨ NEW!
  // ...
}
```

### **Auto-play Logic:**
```typescript
// When song ends:
1. Save last played song
2. Check if queue is empty
3. If empty && autoplay enabled:
   → Find related tracks
   → Add to queue
   → Continue playing
```

### **Related Tracks Algorithm:**
```typescript
async getRelatedTracks(song: Song): Promise<Song[]> {
  // 1. Search by artist name
  // 2. Search by title keywords
  // 3. Fallback to popular tracks
  // 4. Filter out duplicate
  // 5. Return best match
}
```

## ⚙️ Compatibility

### **Works with:**
- ✅ Normal playback
- ✅ Loop modes (off only - autoplay ignored if loop is on)
- ✅ 24/7 mode
- ✅ Filters & volume
- ✅ Multiple servers

### **Doesn't work with:**
- ❌ Loop song mode (loop takes priority)
- ❌ Loop queue mode (loop takes priority)

## 💡 Pro Tips

### **1. Better Related Tracks:**
Play songs with clear artist names:
```
✅ /play despacito luis fonsi
⚪ /play that song
```

### **2. Genre Consistency:**
Auto-play works best when starting with specific genres

### **3. Combine with 24/7:**
```
/autoplay
/247
```
→ Bot stays connected and plays forever!

### **4. Stop Auto-play:**
```
/autoplay  (toggle off)
# or
/stop      (clear everything)
```

## 📊 Statistics

Bot logs auto-play activity:
```
🎵 Auto-play: Finding related tracks...
✅ Auto-play added: Song Title
```

## 🐛 Troubleshooting

### "No related tracks found"
- Last played song may not have good metadata
- SoundCloud API may be rate limited
- Bot will retry with fallback search

### "Auto-play not working"
- Check if auto-play is enabled: `/autoplay`
- Check if loop mode is off: `/loop off`
- Ensure queue is completely empty

### "Same songs repeating"
- SoundCloud search may return popular tracks
- Try starting with different artists

## 🎯 Use Cases

### **1. Background Music:**
```
/autoplay
/play lofi hip hop
→ Endless lofi music for studying/working
```

### **2. Party Mode:**
```
/autoplay
/play party hits
→ Continuous party music
```

### **3. Discovery:**
```
/autoplay
/play new artist
→ Discover similar artists automatically
```

## 📈 Future Enhancements (Ideas)

- [ ] Genre preference learning
- [ ] User history based recommendations
- [ ] Blacklist certain artists/songs
- [ ] Auto-play queue size limit
- [ ] Multiple related tracks at once
- [ ] Smart shuffle for auto-play

---

**Auto-play feature** သည် endless music streaming experience ပေးပါမယ်! Queue ကုန်သွားတာကို စိုးရိမ်စရာ မလိုတော့ပါဘူး! 🎵♾️

