const getPlaylist = require('./index');

// const url = 'https://open.spotify.com/playlist/5VJcwlSzgFtpClXb8xtXs6?si=ij_bQj2zR0GxCufs6lv_Gw';
const url = 'https://open.spotify.com/playlist/3TtYojG66KzrYHR58t5kjZ?si=W1mw5t4zQHKFkaUofbw_ig&nd=1';

jest.setTimeout(3600000);

describe('get playlist', () => {
  test('should have data', async (done) => {
    const data = await getPlaylist(url);
    expect(data.length).toBeGreaterThan(0);
    
    expect(data[0]).toEqual(
      expect.objectContaining({
        thumbnail: expect.any(String),
        artist: expect.any(String),
        title: expect.any(String),
        album: expect.any(String),
        duration: expect.any(String),
        index: expect.any(Number)
      })
    );

    done();
  });

  test('should error with invalid url', async () => {
    expect.assertions(1);
    try {
      await getPlaylist('hello from Mikkyway');
    } catch (e) {
      expect(e).toEqual(Error('Invalid spotify uri'));
    }
  });
});

