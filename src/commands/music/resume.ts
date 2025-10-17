import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { musicPlayer } from '../../services/MusicPlayer';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('resume')
  .setDescription('သီချင်းကို ပြန်ဖွင့်ပါ');

export async function execute(interaction: CommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const resumed = musicPlayer.resume(interaction.guildId!);

  if (resumed) {
    await interaction.reply({
      embeds: [createSuccessEmbed('▶️ ဆက်ဖွင့်ပါမည်', 'သီချင်းကို ပြန်စဖွင့်လိုက်ပါပြီ')],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'သီချင်းကို ပြန်ဖွင့်၍မရပါ')],
      ephemeral: true,
    });
  }
}

