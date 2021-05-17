# extract-sptf-playlist

## Install
```
npm install --save haidang666/extract-sptf-playlist
```
or 
```
npm install --save extract-sptf-playlist
```
## Example 
```node
const { getSpotifyPlaylist, getYoutubePlaylist } = require('extract-sptf-playlist');
const url =
  'https://open.spotify.com/playlist/3TtYojG66KzrYHR58t5kjZ?si=W1mw5t4zQHKFkaUofbw_ig&nd=1';

const playlist = await getSpotifyPlaylist(url);

```
### Options
- `filePath`: to save playlist to file 
```node
getSpotifyPlaylist(url, { filePath: 'data.json', displayProcess: true, headless: true });
```

- `trackFormatterFn`: to format track in custom shape, formatter receive track object and return formatted object. `defaultYoutubeTrackFormatter` removes the following words from the track title: official, lyric, video and parenthesis '()'.

```node
const { getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('extract-sptf-playlist');

getSpotifyPlaylist(url, { trackFormatterFn: defaultYoutubeTrackFormatter });

const customFormatter = (track) => {
  track.title = track.title.toLowerCase();
  return track;
};

getSpotifyPlaylist(url, { trackFormatterFn: customFormatter });
```