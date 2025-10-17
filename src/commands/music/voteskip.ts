import { CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { musicPlayer } from '../../services/MusicPlayer';
import { validateQueueExists } from '../../utils/validators';
import { createSuccessEmbed, createErrorEmbed } from '../../utils/embedBuilder';
import { config } from '../../config';

export const data = new SlashCommandBuilder()
  .setName('voteskip')
  .setDescription('သီချင်းကျော်ရန် မဲပေးပါ');

export async function execute(interaction: CommandInteraction): Promise<void> {
  if (!config.enableVoting) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Voting ကို ပိတ်ထားပါသည်')],
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

  const member = interaction.member as GuildMember;
  const voiceChannel = member.voice.channel;
  
  if (!voiceChannel) {
    await interaction.reply({
      embeds: [createErrorEmbed('အမှား', 'Voice channel တွင် ရှိရပါမည်')],
      ephemeral: true,
    });
    return;
  }

  const queue = queueManager.getQueue(interaction.guildId!);
  const membersInVC = voiceChannel.members.filter(m => !m.user.bot).size;
  
  // Update needed votes
  queue!.skipVotesNeeded = Math.ceil(membersInVC / 2);

  const result = queueManager.addSkipVote(
    interaction.guildId!,
    interaction.user.id
  );

  if (result.votes >= result.needed) {
    await musicPlayer.skip(interaction.guildId!);
    
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '⏭️ Skip Vote အောင်မြင်ပါပြီ',
          `မဲအလုံအလောက်ရရှိပြီး သီချင်းကို ကျော်လိုက်ပါပြီ`
        )
      ],
    });
  } else {
    await interaction.reply({
      embeds: [
        createSuccessEmbed(
          '🗳️ မဲပေးပြီးပါပြီ',
          `Skip ရန် မဲ: ${result.votes}/${result.needed}`
        )
      ],
    });
  }
}

