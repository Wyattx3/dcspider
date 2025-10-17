import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('shuffle')
  .setDescription('သီချင်းစာရင်းကို ရောထွေးပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const queue = queueManager.getQueue(interaction.guildId!);
  
  if (queue!.songs.length < 2) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'ရောထွေးရန် သီချင်း လုံလောက်မှု မရှိပါ')],
      ephemeral: true,
    });
    return;
  }

  const success = queueManager.shuffle(interaction.guildId!);

  if (success) {
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '🔀 ရောထွေးပြီးပါပြီ',
          `${queue!.songs.length} သီချင်းကို ရောထွေးလိုက်ပါပြီ`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'စာရင်းကို ရောထွေး၍မရပါ')],
      ephemeral: true,
    });
  }
}

