import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { AudioFilter } from '../../types';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';
import { config } from '../../config';

export const data = new SlashCommandBuilder()
  .setName('filter')
  .setDescription('Audio filter များကို ထည့်/ဖယ်ပါ')
  .addStringOption(option =>
    option
      .setName('type')
      .setDescription('Filter အမျိုးအစား')
      .setRequired(true)
      .addChoices(
        { name: 'Bassboost', value: AudioFilter.BASSBOOST },
        { name: 'Nightcore', value: AudioFilter.NIGHTCORE },
        { name: 'Vaporwave', value: AudioFilter.VAPORWAVE },
        { name: '8D Audio', value: AudioFilter.EIGHTD },
        { name: 'Karaoke', value: AudioFilter.KARAOKE }
      )
  );

export async function execute(interaction: CommandInteraction): Promise<void> {
  if (!config.enableFilters) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Filter များကို ပိတ်ထားပါသည်')],
      ephemeral: true,
    });
    return;
  }

  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const filterType = interaction.options.get('type')?.value as AudioFilter;
  const queue = queueManager.getQueue(interaction.guildId!);
  
  const success = queueManager.toggleFilter(interaction.guildId!, filterType);

  if (success) {
    const hasFilter = queue!.filters.includes(filterType);
    const action = hasFilter ? 'ထည့်ပြီးပါပြီ' : 'ဖယ်ပြီးပါပြီ';
    
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '🎛️ Filter ပြောင်းလဲပြီးပါပြီ',
          `**${filterType}** filter ကို ${action}\n\n⚠️ နောက်သီချင်းတွင် အကျိုးသက်ရောက်မည်`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Filter ကို ပြောင်း၍မရပါ')],
      ephemeral: true,
    });
  }
}

