const { getYoutubePlaylist } = require('./index');

// 43 songs
const url = 'https://www.youtube.com/watch?v=TKYsuU86-DQ&list=PL0eyrZgxdwhwNC5ppZo_dYGVjerQY3xYU';

jest.setTimeout(3600000);

describe('getYoutubePlaylist', () => {
  test('should have data', async (done) => {
    const playlist = await getYoutubePlaylist(url);
    expect(playlist.name).toEqual(expect.any(String));
    expect(playlist.numberOfTrack).toEqual(expect.any(Number));
    expect(playlist.tracks.length).toBeGreaterThan(0);

    expect(playlist.tracks[0]).toEqual(
      expect.objectContaining({
        thumbnail: expect.any(String),
        artist: expect.any(String),
        title: expect.any(String),
        album: expect.any(String),
        duration: expect.any(String),
        index: expect.any(Number),
        id: expect.any(String),
      })
    );

    done();
  });

  test('should error with invalid url', async () => {
    expect.assertions(1);
    try {
      await getYoutubePlaylist('hello from Mikkyway');
    } catch (e) {
      expect(e).toEqual(Error('Invalid youtube uri'));
    }
  });
});
