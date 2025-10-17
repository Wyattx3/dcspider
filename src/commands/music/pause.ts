import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { musicPlayer } from '../../services/MusicPlayer';
import { validatePlaying } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('pause')
  .setDescription('သီချင်းကို ခဏရပ်ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validatePlaying(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const paused = musicPlayer.pause(interaction.guildId!);

  if (paused) {
    await interaction.reply({
      embeds: [createSuccessEmbed('⏸️ ရပ်လိုက်ပါပြီ', 'သီချင်းကို ခဏရပ်လိုက်ပါပြီ')],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'သီချင်းကို ရပ်၍မရပါ')],
      ephemeral: true,
    });
  }
}

