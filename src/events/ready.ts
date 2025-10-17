import { Client, ActivityType } from 'discord.js';
import { commandHandler } from '../handlers/commandHandler';

export const name = 'ready';
export const once = true;

export async function execute(client: Client): Promise<void> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Bot ကို ${client.user?.tag} အဖြစ် login ဝင်ပြီးပါပြီ!`);
  console.log(`📊 Servers: ${client.guilds.cache.size}`);
  console.log(`👥 Users: ${client.users.cache.size}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Set bot activity
  client.user?.setPresence({
    activities: [
      {
        name: '🎵 /play | /help',
        type: ActivityType.Listening,
      },
    ],
    status: 'online',
  });

  // Register slash commands
  await commandHandler.registerSlashCommands();
}

