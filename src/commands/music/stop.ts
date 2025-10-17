import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { musicPlayer } from '../../services/MusicPlayer';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';

export const data = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('သီချင်းဖွင့်ခြင်းကို ရပ်ပြီး စာရင်းကို ရှင်းပါ');

export async function execute(interaction: CommandInteraction): Promise<void> {
  const validation = await validateQueueExists(interaction);
  
  if (!validation.success) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', validation.error!)],
      ephemeral: true,
    });
    return;
  }

  musicPlayer.stop(interaction.guildId!);

  await interaction.reply({
    embeds: [
      createSuccessEmbed(
        '⏹️ ရပ်လိုက်ပါပြီ',
        'သီချင်းဖွင့်ခြင်းကို ရပ်ပြီး စာရင်းကို ရှင်းလိုက်ပါပြီ'
      )
    ],
  });
}

