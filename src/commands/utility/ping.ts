import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createSuccessEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Bot ၏ latency ကို စစ်ဆေးပါ');

export async function execute(interaction: CommandInteraction): Promise<void> {
  const sent = await interaction.reply({ 
    content: 'Pinging...', 
    fetchReply: true 
  });
  
  const latency = sent.createdTimestamp - interaction.createdTimestamp;
  const apiLatency = Math.round(interaction.client.ws.ping);

  await interaction.editReply({
    content: '',
    embeds: [
      createSuccessEmbed(
        '🏓 Pong!',
        `**Bot Latency:** ${latency}ms\n**API Latency:** ${apiLatency}ms`
      )
    ],
  });
}

