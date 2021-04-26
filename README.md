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

To save playlist to file, pass the `filePath` param.
```node
getPlaylist(url, 'data.json');
```