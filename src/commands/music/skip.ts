import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { musicPlayer } from '../../services/MusicPlayer';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('နောက်သီချင်းကို ကျော်ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const skipped = await musicPlayer.skip(interaction.guildId!);

  if (skipped) {
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '⏭️ ကျော်လိုက်ပါပြီ',
          `**${skipped.title}** ကို ကျော်လိုက်ပါပြီ`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'သီချင်းကို ကျော်၍မရပါ')],
      ephemeral: true,
    });
  }
}

