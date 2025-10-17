# 🤝 Contributing to DC Spider Music Bot

DC Spider Music Bot project သို့ contribute လုပ်ခြင်းကို ကြိုဆိုပါသည်! ဤ guide သည် contribution process ကို ရှင်းပြပေးပါမည်။

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## 📜 Code of Conduct

Project တွင် ပါဝင်သူအားလုံး:
- အခြားသူများကို လေးစားပါ
- Constructive feedback ပေးပါ
- မတူညီသော အမြင်များကို လက်ခံပါ
- Community အကျိုးကို ဦးစားပေးပါ

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x သို့မဟုတ် ပိုမြင့်သော version
- Git
- TypeScript နှင့် Discord.js အခြေခံ အသိပညာ
- Discord Developer Portal account

### Fork and Clone

1. Repository ကို fork လုပ်ပါ
2. သင့် fork ကို clone လုပ်ပါ:
```bash
git clone https://github.com/your-username/dcspider.git
cd dcspider
```

3. Upstream remote ထည့်ပါ:
```bash
git remote add upstream https://github.com/original/dcspider.git
```

## 💻 Development Setup

1. **Dependencies များ install လုပ်ပါ:**
```bash
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env
# Edit .env with your test bot credentials
```

3. **Development mode ဖြင့် run ပါ:**
```bash
npm run dev
```

## 🔨 Making Changes

### Branch Strategy

Main branch မှ branch အသစ် ဖန်တီးပါ:
```bash
git checkout -b feature/your-feature-name
# သို့မဟုတ်
git checkout -b fix/issue-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes

### Making Commits

Commit messages များကို ရှင်းလင်းစွာ ရေးပါ:

```bash
git commit -m "feat: add lyrics command"
git commit -m "fix: resolve volume control issue"
git commit -m "docs: update installation guide"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### What to Contribute

ကျွန်ုပ်တို့ လိုချင်သော contributions:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage
- 🌐 Translations
- ⚡ Performance improvements

## 🧪 Testing

### Manual Testing

1. Bot ကို test server တွင် test လုပ်ပါ
2. အားလုံး features များကို verify လုပ်ပါ
3. Edge cases များကို test လုပ်ပါ

### Testing Checklist

- [ ] Commands များ အလုပ်လုပ်သည်
- [ ] Error handling မှန်ကန်သည်
- [ ] No console errors
- [ ] Performance အဆင်ပြေသည်
- [ ] Documentation updated လုပ်ပြီးပြီ

## 📤 Submitting Changes

### Pull Request Process

1. **သင့် fork ကို update လုပ်ပါ:**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Changes များကို push လုပ်ပါ:**
```bash
git push origin feature/your-feature-name
```

3. **Pull Request ဖန်တီးပါ:**
- GitHub သို့ သွားပါ
- "New Pull Request" click လုပ်ပါ
- သင့် branch ကို select လုပ်ပါ
- PR template ကို ဖြည့်ပါ

### Pull Request Template

```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
[How did you test this?]

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass
```

## 📏 Coding Standards

### TypeScript Style

```typescript
// Use clear, descriptive names
function playMusic(guildId: string): void {
  // Implementation
}

// Add type annotations
interface Song {
  title: string;
  url: string;
  duration: number;
}

// Use async/await
async function fetchSong(url: string): Promise<Song> {
  // Implementation
}
```

### Code Organization

```
src/
├── commands/       # Command handlers
├── services/       # Business logic
├── utils/          # Helper functions
├── types/          # Type definitions
├── events/         # Event handlers
└── config.ts       # Configuration
```

### Best Practices

1. **Error Handling**
```typescript
try {
  // Code that might throw
} catch (error) {
  console.error('Error:', error);
  // User-friendly error message
}
```

2. **Type Safety**
```typescript
// Good
function processQueue(queue: MusicQueue): void { }

// Bad
function processQueue(queue: any): void { }
```

3. **Comments**
```typescript
// Add comments for complex logic
// Calculate skip votes needed (50% of members)
const votesNeeded = Math.ceil(membersCount / 2);
```

4. **Consistent Formatting**
- 2 spaces indentation
- Semicolons required
- Single quotes for strings
- Trailing commas in arrays/objects

### File Structure

```typescript
// 1. Imports
import { Client } from 'discord.js';
import { config } from '../config';

// 2. Types/Interfaces
interface MyData {
  field: string;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Main code
export function myFunction(): void {
  // Implementation
}

// 5. Exports
export { MyData };
```

## 🐛 Reporting Bugs

Bug report တင်သည့်အခါ ပါဝင်သင့်သည်များ:
- Bug ၏ ရှင်းလင်းသော ဖော်ပြချက်
- Reproduction steps
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details
- Error messages/logs

## 💡 Feature Requests

Feature request တင်သည့်အခါ:
- Feature ၏ ရှင်းလင်းသော ဖော်ပြချက်
- Use case ရှင်းပြချက်
- ဖြစ်နိုင်သော implementation ideas
- Alternatives considered

## 📝 Documentation

Documentation updates များ ဆိုသည်မှာ:
- README updates
- Code comments
- API documentation
- Usage examples
- Configuration guides

## 🎯 Priority Areas

လက်ရှိ priority areas:
1. Test coverage တိုးမြှင့်ခြင်း
2. Performance optimization
3. Error handling improvement
4. Documentation completion
5. Accessibility features

## ❓ Questions?

Questions ရှိပါက:
- GitHub Discussions တွင် မေးပါ
- Issues တွင် တင်ပါ
- Discord server တွင် မေးပါ (if available)

## 🙏 Thank You!

DC Spider Music Bot project သို့ contribute လုပ်ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်! သင့်ရဲ့ contributions များက project ကို ပိုမိုကောင်းမွန်စေပါသည်။

---

Happy coding! 🎵

