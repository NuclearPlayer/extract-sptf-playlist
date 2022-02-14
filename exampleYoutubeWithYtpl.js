/* eslint-disable no-unused-vars */
const { getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('./index');

// 17 songs
const url = 'https://www.youtube.com/playlist?list=PLmU8B4gZ41ifO00RpWcvv0vx_UEAyfx8U';

// 500 songs, unlisted
const url500 = 'https://youtube.com/playlist?list=PLY9BjbV3vesCwpYd1ZaL6RbwwMYmxz9FB ';

getYoutubePlaylist(url, {
  usePuppeteer: false,
  filePath: 'youtubeWithYtpl.json',
  displayProcess: true,
  trackFormatterFn: defaultYoutubeTrackFormatter,
});
