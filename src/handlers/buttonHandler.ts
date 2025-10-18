import { ButtonInteraction, GuildMember } from 'discord.js';
import { queueManager } from '../services/QueueManager';
import { musicPlayer } from '../services/MusicPlayer';
import { LoopMode } from '../types';
import { createSuccessEmbed, createErrorEmbed, createQueueEmbed, createNowPlayingEmbed } from '../utils/embedBuilder';
import { createNowPlayingButtons } from '../utils/buttonBuilder';

export class ButtonHandler {
  async handleMusicButton(interaction: ButtonInteraction): Promise<void> {
    const customId = interaction.customId;
    const guildId = interaction.guildId!;
    const member = interaction.member as GuildMember;

    // Check if user is in voice channel
    if (!member.voice.channel) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Voice channel တွင် ရှိရပါမည်')],
        ephemeral: true,
      });
      return;
    }

    const queue = queueManager.getQueue(guildId);

    // Handle different button actions
    switch (customId) {
      case 'music_play':
      case 'music_resume':
        await this.handleResume(interaction, queue);
        break;

      case 'music_pause':
        await this.handlePause(interaction, queue);
        break;

      case 'music_skip':
        await this.handleSkip(interaction, queue);
        break;

      case 'music_stop':
        await this.handleStop(interaction, queue);
        break;

      case 'music_volume_up':
        await this.handleVolumeUp(interaction, queue);
        break;

      case 'music_volume_down':
        await this.handleVolumeDown(interaction, queue);
        break;

      case 'music_loop':
        await this.handleLoop(interaction, queue);
        break;

      case 'music_shuffle':
        await this.handleShuffle(interaction, queue);
        break;

      case 'music_autoplay':
        await this.handleAutoplay(interaction, queue);
        break;

      case 'music_queue':
        await this.handleQueue(interaction, queue);
        break;

      case 'music_info':
        await this.handleInfo(interaction, queue);
        break;

      default:
        // Handle queue navigation
        if (customId.startsWith('queue_prev_') || customId.startsWith('queue_next_')) {
          await this.handleQueueNavigation(interaction, queue, customId);
        }
    }
  }

  private async handleResume(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const resumed = musicPlayer.resume(interaction.guildId!);

    if (resumed) {
      await interaction.reply({
        embeds: [createSuccessEmbed('▶️ Resume', 'သီချင်းကို ပြန်ဖွင့်နေပါပြီ')],
      });
    } else {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Resume လုပ်၍မရပါ')],
        ephemeral: true,
      });
    }
  }

  private async handlePause(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const paused = musicPlayer.pause(interaction.guildId!);

    if (paused) {
      await interaction.reply({
        embeds: [createSuccessEmbed('⏸️ Pause', 'သီချင်းကို ခဏရပ်လိုက်ပါပြီ')],
      });
    } else {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Pause လုပ်၍မရပါ')],
        ephemeral: true,
      });
    }
  }

  private async handleSkip(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue || queue.songs.length === 0) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue တွင် သီချင်း မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const skipped = await musicPlayer.skip(interaction.guildId!);

    if (skipped) {
      await interaction.reply({
        embeds: [createSuccessEmbed('⏭️ Skip', `**${skipped.title}** ကို ကျော်လိုက်ပါပြီ`)],
      });
    } else {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Skip လုပ်၍မရပါ')],
        ephemeral: true,
      });
    }
  }

  private async handleStop(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    musicPlayer.stop(interaction.guildId!);

    await interaction.reply({
      embeds: [createSuccessEmbed('⏹️ Stop', 'သီချင်းဖွင့်ခြင်းကို ရပ်ပြီး queue ကို ရှင်းလိုက်ပါပြီ')],
    });
  }

  private async handleVolumeUp(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const newVolume = Math.min(queue.volume + 10, 100);
    queueManager.setVolume(interaction.guildId!, newVolume);

    await interaction.reply({
      embeds: [createSuccessEmbed('🔊 Volume', `အသံအတိုး: **${newVolume}%**`)],
    });
  }

  private async handleVolumeDown(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const newVolume = Math.max(queue.volume - 10, 0);
    queueManager.setVolume(interaction.guildId!, newVolume);

    await interaction.reply({
      embeds: [createSuccessEmbed('🔉 Volume', `အသံအတိုး: **${newVolume}%**`)],
    });
  }

  private async handleLoop(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    // Cycle through loop modes
    let newMode: LoopMode;
    switch (queue.loopMode) {
      case LoopMode.OFF:
        newMode = LoopMode.SONG;
        break;
      case LoopMode.SONG:
        newMode = LoopMode.QUEUE;
        break;
      case LoopMode.QUEUE:
        newMode = LoopMode.OFF;
        break;
      default:
        newMode = LoopMode.OFF;
    }

    queueManager.setLoopMode(interaction.guildId!, newMode);

    const descriptions = {
      [LoopMode.OFF]: 'Loop ကို **ပိတ်**လိုက်ပါပြီ',
      [LoopMode.SONG]: 'လက်ရှိသီချင်းကို **ထပ်တလဲလဲ** ဖွင့်မည်',
      [LoopMode.QUEUE]: 'Queue တစ်ခုလုံးကို **ထပ်တလဲလဲ** ဖွင့်မည်',
    };

    await interaction.reply({
      embeds: [createSuccessEmbed('🔁 Loop', descriptions[newMode])],
    });
  }

  private async handleShuffle(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue || queue.songs.length < 2) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Shuffle လုပ်ရန် သီချင်း လုံလောက်မှု မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    queueManager.shuffle(interaction.guildId!);

    await interaction.reply({
      embeds: [createSuccessEmbed('🔀 Shuffle', `${queue.songs.length} သီချင်းကို ရောထွေးလိုက်ပါပြီ`)],
    });
  }

  private async handleAutoplay(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const enabled = queueManager.toggleAutoplay(interaction.guildId!);
    const status = enabled ? 'ဖွင့်' : 'ပိတ်';
    const description = enabled 
      ? '🎵 Queue ကုန်သွားရင် related သီချင်းများ အလိုအလျောက် ဆက်ဖွင့်ပါမယ်'
      : '⏹️ Queue ကုန်သွားရင် သီချင်းဖွင့်ခြင်း ရပ်ပါမယ်';

    await interaction.reply({
      embeds: [createSuccessEmbed(`🎵 Auto-play: ${status}`, description)],
    });
  }

  private async handleQueue(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue || queue.songs.length === 0) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue တွင် သီချင်း မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const totalPages = Math.ceil(queue.songs.length / 10);

    await interaction.reply({
      embeds: [createQueueEmbed(queue.songs, 1, totalPages)],
      ephemeral: true,
    });
  }

  private async handleInfo(interaction: ButtonInteraction, queue: any): Promise<void> {
    if (!queue || queue.songs.length === 0) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'လက်ရှိ သီချင်း မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    const currentSong = queue.songs[0];
    const buttons = createNowPlayingButtons(queue.isPlaying, queue.autoplay);

    await interaction.reply({
      embeds: [createNowPlayingEmbed(currentSong)],
      components: buttons,
      ephemeral: true,
    });
  }

  private async handleQueueNavigation(interaction: ButtonInteraction, queue: any, customId: string): Promise<void> {
    if (!queue || queue.songs.length === 0) {
      await interaction.reply({
        embeds: [createErrorEmbed('အမှား', 'Queue တွင် သီချင်း မရှိပါ')],
        ephemeral: true,
      });
      return;
    }

    // Extract current page from customId
    const currentPage = parseInt(customId.split('_')[2]);
    const isNext = customId.startsWith('queue_next');
    const newPage = isNext ? currentPage + 1 : currentPage - 1;
    const totalPages = Math.ceil(queue.songs.length / 10);

    await interaction.update({
      embeds: [createQueueEmbed(queue.songs, newPage, totalPages)],
    });
  }
}

export const buttonHandler = new ButtonHandler();

