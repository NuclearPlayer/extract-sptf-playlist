
export as namespace extractSptfPlaylist;

export class Track {
  index: number;
  id?: string;
  thumbnail: string;
  title: string;
  album: string;
  duration: string;
  artist: string;
  otherArtists?: string[];
}

export class Playlist {
  name: string;
  numberOfTrack: number;
  source: string;
  tracks: Track[];
}

export class Options {
  usePuppeteer: boolean;
  headless: boolean;
  displayProcess: boolean;
  filePath: string;
  trackFormatterFn (track: Track): Track;
}

export function getSpotifyPlaylist(url: string, options: Options): Promise<Playlist>;

export function getYoutubePlaylist(url: string, options: Options): Promise<Playlist>;

export function defaultYoutubeTrackFormatter(track: Track): Track;
