import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { queueManager } from '../../services/QueueManager';
import { createMusicControlButtons } from '../../utils/buttonBuilder';
import { config } from '../../config';

export const data = new SlashCommandBuilder()
  .setName('dashboard')
  .setDescription('Interactive music control dashboard ဖွင့်ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const guildId = interaction.guildId!;
  const queue = queueManager.getQueue(guildId);

  const embed = new EmbedBuilder()
    .setColor(config.colors.primary)
    .setTitle('🎵 DC Spider Music Bot - Control Dashboard')
    .setDescription('အောက်ပါ buttons များဖြင့် music ကို control လုပ်ပါ')
    .setTimestamp();

  if (queue && queue.songs.length > 0) {
    const currentSong = queue.songs[0];
    embed.addFields(
      { 
        name: '🎵 လက်ရှိ ဖွင့်နေသော သီချင်း', 
        value: `**${currentSong.title}**\nChannel: ${currentSong.channel}`,
        inline: false 
      },
      { 
        name: '📊 Status', 
        value: `Playing: ${queue.isPlaying ? '✅' : '❌'}\nVolume: ${queue.volume}%\nLoop: ${queue.loopMode}\nAuto-play: ${queue.autoplay ? '✅' : '❌'}`,
        inline: true 
      },
      { 
        name: '📜 Queue', 
        value: `${queue.songs.length} သီချင်း`,
        inline: true 
      }
    );

    if (currentSong.thumbnail) {
      embed.setThumbnail(currentSong.thumbnail);
    }
  } else {
    embed.addFields(
      { 
        name: '📢 Status', 
        value: 'လက်ရှိ သီချင်း မဖွင့်နေပါ\n\n`/play <song>` ဖြင့် သီချင်း ဖွင့်ပါ',
        inline: false 
      }
    );
  }

  const buttons = createMusicControlButtons();

  await interaction.reply({
    embeds: [embed],
    components: buttons,
  });
}
