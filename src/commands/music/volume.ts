import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('volume')
  .setDescription('အသံအတိုးအလျော့ ချိန်ညှိပါ')
  .addIntegerOption(option =>
    option
      .setName('level')
      .setDescription('အသံအတိုး (0-100)')
      .setMinValue(0)
      .setMaxValue(100)
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const volume = interaction.options.get('level')?.value as number;
  const success = queueManager.setVolume(interaction.guildId!, volume);

  if (success) {
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '🔊 အသံချိန်ညှိပြီးပါပြီ',
          `အသံအတိုးကို **${volume}%** သို့ ပြောင်းလိုက်ပါပြီ`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'အသံအတိုးကို ချိန်ညှိ၍မရပါ')],
      ephemeral: true,
    });
  }
}

