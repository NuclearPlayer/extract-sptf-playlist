const { getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('./index');

// 17 songs
const url = 'https://www.youtube.com/playlist?list=PLmU8B4gZ41ifO00RpWcvv0vx_UEAyfx8U';

getYoutubePlaylist(url, {
  filePath: 'youtube.json',
  displayProcess: true,
  headless: true,
  trackFormatterFn: defaultYoutubeTrackFormatter,
});
