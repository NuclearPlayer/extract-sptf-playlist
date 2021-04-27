const { getSpotifyPlaylist, getYoutubePlaylist } = require('./index');

const useSpotify = false;
if (useSpotify) {
  // 400 songs
  // const url = 'https://open.spotify.com/playlist/5VJcwlSzgFtpClXb8xtXs6?si=ij_bQj2zR0GxCufs6lv_Gw';

  // 4 songs
  const url =
    'https://open.spotify.com/playlist/3TtYojG66KzrYHR58t5kjZ?si=W1mw5t4zQHKFkaUofbw_ig&nd=1';

  getSpotifyPlaylist(url, 'data.json');
} else {
  // 200 songs
  const url = 'https://www.youtube.com/playlist?list=PLuUrokoVSxlcgocBXbDF76yWd3YKWpOH9';

  getYoutubePlaylist(url, 'data.json');
}
