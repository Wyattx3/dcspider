import { Message } from 'discord.js';
import { config } from '../config';
import { commandHandler } from '../handlers/commandHandler';
import { createErrorEmbed } from '../utils/embedBuilder';

export const name = 'messageCreate';

export async function execute(message: Message): Promise<void> {
  // Ignore bots
  if (message.author.bot) return;

  // Check for prefix
  if (!message.content.startsWith(config.prefix)) return;

  // Parse command and arguments
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  // Get command
  const command = commandHandler.getPrefixCommand(commandName);

  if (!command) return;

  try {
    // Execute command with message and args
    await command.execute(message, args);
  } catch (error) {
    console.error(`❌ Error executing prefix command ${commandName}:`, error);

    await message.reply({
      embeds: [
        createErrorEmbed(
          'အမှား ဖြစ်ပေါ်ခဲ့သည်',
          'Command ကို လုပ်ဆောင်ရာတွင် အမှား ဖြစ်ပေါ်ခဲ့သည်'
        ),
      ],
    });
  }
}

