const { getSpotifyPlaylist } = require('./index');

// 400 songs
// const url = 'https://open.spotify.com/playlist/5VJcwlSzgFtpClXb8xtXs6?si=ij_bQj2zR0GxCufs6lv_Gw';

// 4 songs
const url = 'https://open.spotify.com/playlist/2YCIIABnzPtI9cuXn0y9bb';

getSpotifyPlaylist(url, {
  filePath: 'data.json',
  displayProcess: true,
});
