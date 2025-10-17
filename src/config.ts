import dotenv from 'dotenv';
import { GatewayIntentBits } from 'discord.js';

dotenv.config();

export const config = {
  // Discord Bot
  token: process.env.DISCORD_TOKEN || '',
  clientId: process.env.CLIENT_ID || '',
  prefix: process.env.PREFIX || '!',
  
  // Bot Settings
  maxQueueSize: parseInt(process.env.MAX_QUEUE_SIZE || '100'),
  
  // Web Dashboard
  webPort: parseInt(process.env.WEB_PORT || '3000'),
  webEnabled: process.env.WEB_ENABLED === 'true',
  
  // Audio
  audioQuality: process.env.AUDIO_QUALITY || 'high',
  defaultVolume: parseInt(process.env.DEFAULT_VOLUME || '50'),
  
  // Features
  enableFilters: process.env.ENABLE_FILTERS !== 'false',
  enableLyrics: process.env.ENABLE_LYRICS !== 'false',
  enableVoting: process.env.ENABLE_VOTING !== 'false',
  autoDisconnectTime: parseInt(process.env.AUTO_DISCONNECT_TIME || '300000'),
  
  // 24/7 Mode
  default247Mode: process.env.DEFAULT_247_MODE === 'true',
  
  // Discord Intents
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  
  // Colors
  colors: {
    primary: 0x5865F2,
    success: 0x57F287,
    warning: 0xFEE75C,
    error: 0xED4245,
    info: 0x00D9FF,
  },
  
  // Emojis
  emojis: {
    play: '▶️',
    pause: '⏸️',
    skip: '⏭️',
    stop: '⏹️',
    queue: '📜',
    volume: '🔊',
    loop: '🔁',
    shuffle: '🔀',
    music: '🎵',
    success: '✅',
    error: '❌',
    loading: '⏳',
  },
};

export function validateConfig(): boolean {
  if (!config.token) {
    console.error('❌ DISCORD_TOKEN is required in .env file');
    return false;
  }
  
  if (!config.clientId) {
    console.error('❌ CLIENT_ID is required in .env file');
    return false;
  }
  
  return true;
}

