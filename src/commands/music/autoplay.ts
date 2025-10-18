import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { validateMusicCommand } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('autoplay')
  .setDescription('Auto-play mode ကို ဖွင့်/ပိတ် ပါ - Queue ကုန်သွားရင် related သီချင်းများ အလိုအလျောက် ဆက်ဖွင့်မည်');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const validation = await validateMusicCommand(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  const guildId = interaction.guildId!;
  let queue = queueManager.getQueue(guildId);

  if (!queue) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ - သီချင်း ဖွင့်ပြီးမှ autoplay enable လုပ်ပါ')],
      ephemeral: true,
    });
    return;
  }

  const autoplayEnabled = queueManager.toggleAutoplay(guildId);
  queue = queueManager.getQueue(guildId)!;

  const statusText = autoplayEnabled ? 'ဖွင့်' : 'ပိတ်';
  const emoji = autoplayEnabled ? '✅' : '❌';
  
  let description = `Auto-play mode ကို **${statusText}**လိုက်ပါပြီ\n\n`;
  
  if (autoplayEnabled) {
    description += '🎵 Queue ကုန်သွားရင် related သီချင်းများ အလိုအလျောက် ဆက်ဖွင့်ပါမယ်';
  } else {
    description += '⏹️ Queue ကုန်သွားရင် သီချင်းဖွင့်ခြင်း ရပ်ပါမယ်';
  }

  await interaction.reply({
    embeds: [
      createSuccessEmbed(
        `${emoji} Auto-play Mode`,
        description
      )
    ],
  });
}

