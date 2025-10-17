import { Message, EmbedBuilder } from 'discord.js';

export async function sendEmbed(
  message: Message,
  embed: EmbedBuilder
): Promise<void> {
  await message.reply({ embeds: [embed] });
}

export async function sendMessage(
  message: Message,
  content: string
): Promise<void> {
  await message.reply(content);
}

export function getStringOption(
  args: string[],
  index: number
): string | undefined {
  return args[index];
}

export function getIntegerOption(
  args: string[],
  index: number
): number | undefined {
  const value = args[index];
  if (!value) return undefined;
  
  const parsed = parseInt(value);
  return isNaN(parsed) ? undefined : parsed;
}

export function getAllArgs(args: string[]): string {
  return args.join(' ');
}

