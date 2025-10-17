import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { LoopMode } from '../../types';
import { validateQueueExists } from '../../utils/validators';
import { createErrorEmbed, createLoopEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('loop')
  .setDescription('Loop mode ကို ပြောင်းပါ')
  .addStringOption(option =>
    option
      .setName('mode')
      .setDescription('Loop mode')
      .setRequired(true)
      .addChoices(
        { name: 'ပိတ်မည်', value: 'off' },
        { name: 'သီချင်း', value: 'song' },
        { name: 'စာရင်း', value: 'queue' }
      )
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

  const modeValue = interaction.options.get('mode')?.value as string;
  const mode = modeValue as LoopMode;

  const success = queueManager.setLoopMode(interaction.guildId!, mode);

  if (success) {
    await interaction.reply({
      embeds: [createLoopEmbed(mode)],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Loop mode ကို ပြောင်း၍မရပါ')],
      ephemeral: true,
    });
  }
}

