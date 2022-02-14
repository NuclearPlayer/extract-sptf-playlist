# extract-sptf-playlist

## Install
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
For Youtube playlist, set option param `usePuppeteer` to false to use [`ytpl` library](https://github.com/TimeForANinja/node-ytpl) instead of puppeteer, check file `exampleYoutubeWithYtpl.js` for example.  

### Result format
```json
{
  "name": "ultimate vibezzzzz",
  "numberOfTrack": 105,
  "source": "Youtube",
  "tracks": [
    {
      "index": 2,
      "thumbnail": "https://i.scdn.co/image/ab67616d000048510d5a84e4e47399d2726c330c",
      "title": "20 Min",
      "album": "Luv Is Rage 2 (Deluxe)",
      "duration": "3:40",
      "artist": "Lil Uzi Vert",
      "otherArtists": []
    },
  ]
}

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
