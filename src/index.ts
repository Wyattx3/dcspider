import { Client } from 'discord.js';
import { config, validateConfig } from './config';
import { commandHandler } from './handlers/commandHandler';
import { eventHandler } from './handlers/eventHandler';
import { startWebServer } from './web/server';
import play from 'play-dl';

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎵 DC Spider Music Bot');
  console.log('🎧 Powered by SoundCloud');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Initialize SoundCloud support
  try {
    console.log('🔧 Initializing SoundCloud support...');
    await play.getFreeClientID();
    console.log('✅ SoundCloud initialized successfully\n');
  } catch (error) {
    console.error('⚠️  Failed to initialize SoundCloud:', error);
    console.log('⚠️  Bot will continue but SoundCloud may not work properly\n');
  }

  // Validate configuration
  if (!validateConfig()) {
    console.error('❌ Configuration validation failed');
    process.exit(1);
  }

  // Create Discord client
  const client = new Client({
    intents: config.intents,
  });

  // Load events
  console.log('📂 Loading events...');
  await eventHandler.loadEvents(client);

  // Load commands
  console.log('📂 Loading commands...');
  await commandHandler.loadCommands(client);

  // Start web server
  if (config.webEnabled) {
    console.log('🌐 Starting web dashboard...');
    startWebServer();
  }

  // Login to Discord
  console.log('🔐 Logging in to Discord...\n');
  await client.login(config.token);
}

// Handle errors
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Start the bot
main().catch((error) => {
  console.error('❌ Failed to start bot:', error);
  process.exit(1);
});

