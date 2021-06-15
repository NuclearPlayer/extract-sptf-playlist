const { getYoutubePlaylist, defaultYoutubeTrackFormatter } = require('./index');

// 43 songs
const url = 'https://www.youtube.com/watch?v=TKYsuU86-DQ&list=PL0eyrZgxdwhwNC5ppZo_dYGVjerQY3xYU';

// data for formatter
const playlist = {
  name: `Taylor Swift ${'evermore'} Album`,
  numberOfTrack: 18,
  tracks: [
    {
      index: 0,
      thumbnail:
        'https://i.ytimg.com/vi/Ur_wAcYDnuA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDjY-7zwHdwNUr0wzBTmiHLPgsMoQ',
      title: 'Taylor Swift - right where you left me (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:09',
      id: 'Ur_wAcYDnuA',
    },
    {
      index: 1,
      thumbnail:
        'https://i.ytimg.com/vi/1iRbIYkccgw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBGZEFvI6FM4zB93vPQfCKvO1tLmQ',
      title: 'Taylor Swift - it’s time to go (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:18',
      id: '1iRbIYkccgw',
    },
    {
      index: 2,
      thumbnail:
        'https://i.ytimg.com/vi/RsEZmictANA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCfbdwvfNb33SpYFHv3XFPZb8g4sQ',
      title: 'Taylor Swift - willow (Official Music Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:13',
      id: 'RsEZmictANA',
    },
    {
      index: 3,
      thumbnail:
        'https://i.ytimg.com/vi/wMpqCRF7TKg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDnE5oO6MkUguE8fVMP-duxltoJjw',
      title: 'Taylor Swift - champagne problems (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:08',
      id: 'wMpqCRF7TKg',
    },
    {
      index: 4,
      thumbnail:
        'https://i.ytimg.com/vi/Pz-f9mM3Ms8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCTjrDzjhvkrniYiQ1HjBqGnvL9vg',
      title: 'Taylor Swift - gold rush (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:09',
      id: 'Pz-f9mM3Ms8',
    },
    {
      index: 5,
      thumbnail:
        'https://i.ytimg.com/vi/WuvhOD-mP8M/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLB9x0xmoH5eLjqeshkme5EuW7eqNQ',
      title: 'Taylor Swift - ‘tis the damn season (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:56',
      id: 'WuvhOD-mP8M',
    },
    {
      index: 6,
      thumbnail:
        'https://i.ytimg.com/vi/ukxEKY_7MOc/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA7Fg-EdqgA1z2-PEARYBLLdUXxEA',
      title: 'Taylor Swift - tolerate it (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:08',
      id: 'ukxEKY_7MOc',
    },
    {
      index: 7,
      thumbnail:
        'https://i.ytimg.com/vi/IEPomqor2A8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBcm3rUuji1-dUgfEg5BbgwmcnA0g',
      title: 'Taylor Swift - no body, no crime (Official Lyric Video) ft. HAIM',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:38',
      id: 'IEPomqor2A8',
    },
    {
      index: 8,
      thumbnail:
        'https://i.ytimg.com/vi/tP4TTgt4nb0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCBLlNo4WcYaza1Knto2DND2x35NA',
      title: 'Taylor Swift - happiness (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '5:18',
      id: 'tP4TTgt4nb0',
    },
    {
      index: 9,
      thumbnail:
        'https://i.ytimg.com/vi/zI4DS5GmQWE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC61sWhEu4LiLEtCPadAzYyo375GA',
      title: 'Taylor Swift - dorothea (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:45',
      id: 'zI4DS5GmQWE',
    },
    {
      index: 10,
      thumbnail:
        'https://i.ytimg.com/vi/c_p_TBaHvos/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCpRxGHa3wUNXkUnPzH-SSCX4Nzng',
      title: 'Taylor Swift - coney island (Lyric Video) ft. The National',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:38',
      id: 'c_p_TBaHvos',
    },
    {
      index: 11,
      thumbnail:
        'https://i.ytimg.com/vi/9nIOx-ezlzA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBnub2Ahu0gMRRYjrDfboZ_QtV3Tw',
      title: 'Taylor Swift - ivy (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:19',
      id: '9nIOx-ezlzA',
    },
    {
      index: 12,
      thumbnail:
        'https://i.ytimg.com/vi/YPlNBb6I8qU/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDb_WzjdnoLAxVOoFV2PXvsVEJ97Q',
      title: 'Taylor Swift - cowboy like me (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:40',
      id: 'YPlNBb6I8qU',
    },
    {
      index: 13,
      thumbnail:
        'https://i.ytimg.com/vi/rqQHa2HcGtM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBNVD0EGT77l-gpoGtRJsP81AtNlg',
      title: 'Taylor Swift - long story short (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:41',
      id: 'rqQHa2HcGtM',
    },
    {
      index: 14,
      thumbnail:
        'https://i.ytimg.com/vi/hP6QpMeSG6s/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLABCYUkPBOvfc81npIXky0pSkH2qA',
      title: 'Taylor Swift - marjorie (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '4:18',
      id: 'hP6QpMeSG6s',
    },
    {
      index: 15,
      thumbnail:
        'https://i.ytimg.com/vi/AIFnKqIeEdY/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDJVUaSXqb-94LGSJbDfwlyCu5hnA',
      title: 'Taylor Swift - closure (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:03',
      id: 'AIFnKqIeEdY',
    },
    {
      index: 16,
      thumbnail:
        'https://i.ytimg.com/vi/EXLgZZE072g/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLALB56CSgCJXa4DbpKxFrgr67fCFw',
      title: 'Taylor Swift - evermore (Official Lyric Video) ft. Bon Iver',
      artist: 'Taylor Swift',
      album: '',
      duration: '5:05',
      id: 'EXLgZZE072g',
    },
    {
      index: 17,
      thumbnail:
        'https://i.ytimg.com/vi/7EvwIw4gIyk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCREgMCS92kNqi-BvOCU4wp-kFw1Q',
      title: 'Taylor Swift - willow (Official Lyric Video)',
      artist: 'Taylor Swift',
      album: '',
      duration: '3:41',
      id: '7EvwIw4gIyk',
    },
  ],
};

jest.setTimeout(3600000);

describe('getYoutubePlaylist', () => {
  test('should have data', async (done) => {
    const playlist = await getYoutubePlaylist(url);
    expect(playlist.name).toEqual(expect.any(String));
    expect(playlist.numberOfTrack).toEqual(expect.any(Number));
    expect(playlist.tracks.length).toBeGreaterThan(0);
    expect(playlist.source).toEqual('youtube');
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

describe('defaultYoutubeTrackFormatter', () => {
  test('should have data', async (done) => {
    for (let i = 0; i < playlist.tracks.length; i += 1) {
      playlist.tracks[i] = defaultYoutubeTrackFormatter(playlist.tracks[i]);
    }

    expect(playlist.tracks[0].title).not.toEqual(
      expect.stringMatching(/official|lyric(s)?|video|[()]/gi)
    );

    done();
  });
});
