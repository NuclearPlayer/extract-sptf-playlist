const { getSpotifyPlaylist, getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('./index');

const useSpotify = true;
if (useSpotify) {
  // 400 songs
  // const url = 'https://open.spotify.com/playlist/5VJcwlSzgFtpClXb8xtXs6?si=ij_bQj2zR0GxCufs6lv_Gw';

  // 4 songs
  const url =
    'https://open.spotify.com/playlist/3TtYojG66KzrYHR58t5kjZ?si=W1mw5t4zQHKFkaUofbw_ig&nd=1';

  getSpotifyPlaylist(url, {
    filePath: 'data.json',
    displayProcess: true,
  });
} else {
  // 200 songs
  const url = 'https://www.youtube.com/playlist?list=PLmU8B4gZ41ifO00RpWcvv0vx_UEAyfx8U';

  getYoutubePlaylist(url, {
    filePath: 'data.json',
    displayProcess: true,
    headless: true,
    trackFormatterFn: defaultYoutubeTrackFormatter,
  });
}
