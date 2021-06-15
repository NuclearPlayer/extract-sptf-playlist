const { getSpotifyPlaylist } = require('./index');

// 400 songs
// const url = 'https://open.spotify.com/playlist/5VJcwlSzgFtpClXb8xtXs6?si=ij_bQj2zR0GxCufs6lv_Gw';

// 4 songs
const url =
  'https://open.spotify.com/playlist/3TtYojG66KzrYHR58t5kjZ?si=W1mw5t4zQHKFkaUofbw_ig&nd=1';

jest.setTimeout(3600000);

describe('getSpotifyPlaylist', () => {
  test('should have data', async (done) => {
    const playlist = await getSpotifyPlaylist(url);
    expect(playlist.name).toEqual(expect.any(String));
    expect(playlist.numberOfTrack).toEqual(expect.any(Number));
    expect(playlist.tracks.length).toBeGreaterThan(0);
    expect(playlist.source).toEqual('spotify');
    expect(playlist.tracks[0]).toEqual(
      expect.objectContaining({
        thumbnail: expect.any(String),
        artist: expect.any(String),
        title: expect.any(String),
        album: expect.any(String),
        duration: expect.any(String),
        index: expect.any(Number),
      })
    );

    done();
  });

  test('should error with invalid url', async () => {
    expect.assertions(1);
    try {
      await getSpotifyPlaylist('hello from Mikkyway');
    } catch (e) {
      expect(e).toEqual(Error('Invalid spotify uri'));
    }
  });
});
