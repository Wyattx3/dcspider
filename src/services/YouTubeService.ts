import play, { 
  YouTubeVideo, 
  YouTubePlayList,
  validate as validateURL 
} from 'play-dl';
import { Song } from '../types';

export class YouTubeService {
  async search(query: string, limit: number = 1): Promise<Song[]> {
    try {
      const results = await play.search(query, { limit, source: { youtube: 'video' } });
      
      return results.map((video) => this.formatSong(video));
    } catch (error) {
      console.error('YouTube search error:', error);
      throw new Error('ဂီတရှာဖွေမှု မအောင်မြင်ပါ');
    }
  }

  async getVideo(url: string): Promise<Song> {
    try {
      const info = await play.video_info(url);
      
      if (!info || !info.video_details) {
        throw new Error('ဗီဒီယို ရှာမတွေ့ပါ');
      }

      return this.formatSong(info.video_details);
    } catch (error) {
      console.error('YouTube video info error:', error);
      throw new Error('ဗီဒီယို အချက်အလက် ရယူ၍မရပါ');
    }
  }

  async getPlaylist(url: string): Promise<Song[]> {
    try {
      const playlist = await play.playlist_info(url, { incomplete: true });
      
      if (!playlist) {
        throw new Error('Playlist ရှာမတွေ့ပါ');
      }

      const videos = await playlist.all_videos();
      
      return videos.map((video) => this.formatSong(video));
    } catch (error) {
      console.error('YouTube playlist error:', error);
      throw new Error('Playlist ရယူ၍မရပါ');
    }
  }

  async validateAndGetSongs(
    input: string, 
    requestedBy: string
  ): Promise<Song[]> {
    const urlType = validateURL(input);

    if (urlType === 'yt_video') {
      const song = await this.getVideo(input);
      song.requestedBy = requestedBy;
      return [song];
    } 
    
    if (urlType === 'yt_playlist') {
      const songs = await this.getPlaylist(input);
      songs.forEach(song => song.requestedBy = requestedBy);
      return songs;
    }

    // Search query
    const songs = await this.search(input, 1);
    if (songs.length === 0) {
      throw new Error('ရလဒ် မတွေ့ပါ');
    }
    
    songs[0].requestedBy = requestedBy;
    return songs;
  }

  private formatSong(video: YouTubeVideo): Song {
    return {
      title: video.title || 'Unknown',
      url: video.url,
      duration: video.durationInSec,
      thumbnail: video.thumbnails[0]?.url || '',
      requestedBy: '',
      channel: video.channel?.name || 'Unknown',
    };
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

export const youtubeService = new YouTubeService();

