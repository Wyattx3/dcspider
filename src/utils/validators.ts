import { 
  ChatInputCommandInteraction,
  GuildMember, 
  Message, 
  VoiceChannel 
} from 'discord.js';
import { queueManager } from '../services/QueueManager';

export interface ValidationResult {
  success: boolean;
  error?: string;
  member?: GuildMember;
  voiceChannel?: VoiceChannel;
}

export async function validateMusicCommand(
  interaction: ChatInputCommandInteraction | Message
): Promise<ValidationResult> {
  const member = interaction.member as GuildMember;

  if (!member) {
    return {
      success: false,
      error: 'Member မတွေ့ပါ',
    };
  }

  const voiceChannel = member.voice.channel as VoiceChannel;

  if (!voiceChannel) {
    return {
      success: false,
      error: 'Voice channel တစ်ခုတွင် ဝင်ရောက်ပါ',
    };
  }

  return {
    success: true,
    member,
    voiceChannel,
  };
}

export async function validateQueueExists(
  interaction: ChatInputCommandInteraction | Message
): Promise<ValidationResult> {
  const validation = await validateMusicCommand(interaction);
  if (!validation.success) return validation;

  const guildId = interaction.guildId!;
  const queue = queueManager.getQueue(guildId);

  if (!queue || queue.songs.length === 0) {
    return {
      success: false,
      error: 'သီချင်းစာရင်းတွင် သီချင်း မရှိပါ',
    };
  }

  return validation;
}

export async function validatePlaying(
  interaction: ChatInputCommandInteraction | Message
): Promise<ValidationResult> {
  const validation = await validateQueueExists(interaction);
  if (!validation.success) return validation;

  const guildId = interaction.guildId!;
  const queue = queueManager.getQueue(guildId);

  if (!queue?.isPlaying) {
    return {
      success: false,
      error: 'လက်ရှိ သီချင်း မဖွင့်နေပါ',
    };
  }

  return validation;
}

export function parseTimeToSeconds(time: string): number | null {
  const timeRegex = /^(?:(\d+):)?(\d+):(\d+)$/;
  const match = time.match(timeRegex);

  if (!match) return null;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = parseInt(match[2]);
  const seconds = parseInt(match[3]);

  return hours * 3600 + minutes * 60 + seconds;
}

