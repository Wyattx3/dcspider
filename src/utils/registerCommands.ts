import { REST, Routes } from 'discord.js';
import { config, validateConfig } from '../config';
import { commandHandler } from '../handlers/commandHandler';
import { Client } from 'discord.js';

async function registerCommands() {
  console.log('🔄 Registering slash commands...\n');

  if (!validateConfig()) {
    console.error('❌ Configuration validation failed');
    process.exit(1);
  }

  // Create a temporary client just to load commands
  const client = new Client({ intents: [] });

  try {
    await commandHandler.loadCommands(client);

    const commands = Array.from(commandHandler.commands.values()).map((cmd) =>
      cmd.data.toJSON()
    );

    const rest = new REST({ version: '10' }).setToken(config.token);

    console.log(`📦 Registering ${commands.length} slash commands globally...`);

    await rest.put(Routes.applicationCommands(config.clientId), {
      body: commands,
    });

    console.log('✅ Successfully registered slash commands!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error registering slash commands:', error);
    process.exit(1);
  }
}

registerCommands();

