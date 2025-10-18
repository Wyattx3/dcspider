import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { config } from '../../config';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Bot commands များကို ကြည့်ပါ');

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const embed = new EmbedBuilder()
    .setColor(config.colors.primary)
    .setTitle('🎵 DC Spider Music Bot - အသုံးပြုနည်း')
    .setDescription('Discord music bot with premium features')
    .addFields(
      {
        name: '🎵 ဂီတ Commands',
        value: 
          '`/play <song>` - သီချင်း ဖွင့်ပါ\n' +
          '`/pause` - ခဏရပ်ပါ\n' +
          '`/resume` - ပြန်ဖွင့်ပါ\n' +
          '`/skip` - နောက်သီချင်းကို ကျော်ပါ\n' +
          '`/stop` - ရပ်ပြီး စာရင်းရှင်းပါ\n' +
          '`/queue [page]` - သီချင်းစာရင်းကို ကြည့်ပါ\n' +
          '`/nowplaying` - လက်ရှိသီချင်းကို ကြည့်ပါ',
        inline: false,
      },
      {
        name: '⚙️ ချိန်ညှိမှု Commands',
        value:
          '`/volume <0-100>` - အသံချိန်ညှိပါ\n' +
          '`/loop <off|song|queue>` - Loop mode\n' +
          '`/shuffle` - စာရင်းကို ရောထွေးပါ\n' +
          '`/remove <position>` - သီချင်းဖယ်ပါ',
        inline: false,
      },
      {
        name: '🎛️ Advanced Features',
        value:
          '`/dashboard` - 🎮 Interactive control panel (Buttons!)\n' +
          '`/filter <type>` - Audio filters (bassboost, nightcore, etc)\n' +
          '`/autoplay` - Auto-play mode (related သီချင်းများ ဆက်ဖွင့်မည်)\n' +
          '`/247` - 24/7 mode toggle\n' +
          '`/voteskip` - Vote to skip song',
        inline: false,
      },
      {
        name: '🛠️ Utility Commands',
        value:
          '`/help` - ဤစာရင်းကို ပြပါ\n' +
          '`/ping` - Bot latency',
        inline: false,
      }
    )
    .setFooter({ text: 'DC Spider Music Bot • High Quality Music Streaming' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}

