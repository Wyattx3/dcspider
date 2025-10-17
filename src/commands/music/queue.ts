import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateQueueExists } from '../../utils/validators';
import { createErrorEmbed, createQueueEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('queue')
  .setDescription('သီချင်းစာရင်းကို ကြည့်ပါ')
  .addIntegerOption(option =>
    option
      .setName('page')
      .setDescription('စာမျက်နှာ နံပါတ်')
      .setMinValue(1)
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

  const queue = queueManager.getQueue(interaction.guildId!);
  const page = (interaction.options.get('page')?.value as number) || 1;
  const totalPages = Math.ceil(queue!.songs.length / 10);

  if (page > totalPages) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', `စာမျက်နှာ ${page} မရှိပါ`)],
      ephemeral: true,
    });
    return;
  }

  await interaction.reply({
    embeds: [createQueueEmbed(queue!.songs, page, totalPages)],
  });
}

