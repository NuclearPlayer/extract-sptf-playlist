/* eslint-disable no-console */
const { getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('./index');

const youtubePlaylistData = [
  {
    // 17 songs
    url: 'https://www.youtube.com/playlist?list=PLmU8B4gZ41ifO00RpWcvv0vx_UEAyfx8U',
    name: 'youtube1',
  },
  {
    // 6 songs
    url: 'https://www.youtube.com/playlist?list=PLCftPWZH_Y5SyvgfgsXd2SAse_IWxlG7t',
    name: 'youtube2',
  },
  {
    // 2 songs
    url: 'https://www.youtube.com/playlist?list=PLCftPWZH_Y5R64ak8242Gd6w__nN4BnOh',
    name: 'youtube3',
  },
];

for (i = 0; i < youtubePlaylistData.length; i++) {
  getYoutubePlaylist(youtubePlaylistData[i].url, {
    filePath: youtubePlaylistData[i].name + '.json',
    displayProcess: true,
    headless: true,
    trackFormatterFn: defaultYoutubeTrackFormatter,
  });
  console.log(
    `[${i + 1}/${youtubePlaylistData.length}] - Processed [${youtubePlaylistData[i].name}] [${
      youtubePlaylistData[i].url
    }]`
  );
}
