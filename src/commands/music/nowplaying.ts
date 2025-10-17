import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateQueueExists } from '../../utils/validators';
import { createErrorEmbed, createNowPlayingEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('nowplaying')
  .setDescription('လက်ရှိ ဖွင့်နေသော သီချင်းကို ကြည့်ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const song = queueManager.getCurrentSong(interaction.guildId!);

  if (!song) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'လက်ရှိ သီချင်း မရှိပါ')],
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    embeds: [createNowPlayingEmbed(song)],
  });
}

