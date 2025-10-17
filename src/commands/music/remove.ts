import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription('စာရင်းမှ သီချင်းကို ဖယ်ရှားပါ')
  .addIntegerOption(option =>
    option
      .setName('position')
      .setDescription('သီချင်း၏ အနေအထား')
      .setMinValue(1)
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

  const position = (interaction.options.get('position')?.value as number) - 1;
  const queue = queueManager.getQueue(interaction.guildId!);

  if (position === 0) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'လက်ရှိ ဖွင့်နေသော သီချင်းကို ဖယ်၍မရပါ၊ skip အသုံးပြုပါ')],
      ephemeral: true,
    });
    return;
  }

  if (position >= queue!.songs.length) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'မမှန်ကန်သော အနေအထား')],
      ephemeral: true,
    });
    return;
  }

  const removed = queueManager.removeSong(interaction.guildId!, position);

  if (removed) {
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          'ဖယ်ရှားပြီးပါပြီ',
          `**${removed.title}** ကို စာရင်းမှ ဖယ်ရှားလိုက်ပါပြီ`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'သီချင်းကို ဖယ်ရှား၍မရပါ')],
      ephemeral: true,
    });
  }
}

