import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateMusicCommand } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('247')
  .setDescription('24/7 mode ကို ဖွင့်/ပိတ် ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validateMusicCommand(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const queue = queueManager.getQueue(interaction.guildId!);

  if (!queue) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
      ephemeral: true,
    });
    return;
  }

  queue.mode247 = !queue.mode247;

  await interaction.reply({
    embeds: [
      createSuccessEmbed(
        '24/7 Mode',
        `24/7 mode ကို **${queue.mode247 ? 'ဖွင့်' : 'ပိတ်'}**လိုက်ပါပြီ`
      )
    ],
  });
}

