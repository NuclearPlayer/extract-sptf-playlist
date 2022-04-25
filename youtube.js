const fs = require('fs');
const puppeteer = require('puppeteer');
const ytpl = require('ytpl');

const youtubeUrl = require('./helpers/youtube-url');
const sourceName = require('./helpers/sourceName');

async function getPlaylist(
  uri,
  options = {
    filePath: null,
    displayProcess: false,
    usePuppeteer: true,
    headless: true,
    trackFormatterFn: null,
  }
) {
  const playlistID = youtubeUrl.getPlaylistId(uri);
  if (playlistID) {
    if (options.usePuppeteer === false) {
      return getPlaylistByYtpl(playlistID, options);
    }
    return getData(youtubeUrl.parsePlaylistUrl(playlistID), options);
  }

  return Promise.reject(new Error('Invalid youtube uri'));
}

async function getPlaylistGeneralInfo(page) {
  const info = await page.evaluate(() => {
    const name = document.querySelector('h1[id="title"]').innerText || 'Untitle';
    const numberOfTrack = parseInt(
      document.querySelector('div[id="stats"]').childNodes[0].childNodes[0].innerText
    );
    return {
      name,
      numberOfTrack,
    };
  });

  info.source = sourceName.youtube;
  return info;
}

async function getTracksFromDOM(page) {
  const newTracks = await page.evaluate(() => {
    const YoutubeIdRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

    // dont use function from helpers since can not import to browser
    function getVideoId(url) {
      let match = YoutubeIdRegex.exec(url);
      return match ? match[1] : false;
    }

    const nodeTracks = document.querySelectorAll('ytd-playlist-video-renderer');
    const tracks = [];

    for (let i = 0; i < nodeTracks.length; i += 1) {
      const nodeDetail = nodeTracks[i];
      if (nodeDetail) {
        const track = {};
        track.index = i;
        track.thumbnail = nodeDetail.querySelector('img').src || '';

        const text = nodeDetail.innerText.split('\n');
        track.title = text[3] || 'Untitle';
        track.artist = text[4] || 'Unknown';
        track.album = '';
        track.duration = text[1] || '0:00';
        track.id = getVideoId(nodeDetail.querySelector('a[id="thumbnail"]').href) || '';

        tracks.push(track);
      }
    }

    return tracks;
  });

  return newTracks;
}

function returnPlaylist(playlist, filePath = null) {
  if (filePath) {
    fs.writeFile(filePath, JSON.stringify(playlist), (err) => {
      if (err) {
        Promise.reject(err);
      }
    });
  }

  return playlist;
}

async function getData(url, options) {
  const browser = await puppeteer.launch({
    headless: options.headless === false ? false : true,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const playlist = await getPlaylistGeneralInfo(page);
  let loadedCount = 0;
  while (loadedCount < playlist.numberOfTrack) {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForTimeout(500);
    // loadedCount = await page.evaluate(() => {
    //   return document.querySelectorAll('ytd-playlist-video-renderer').length;
    // });
    loadedCount += 6;
    if (options.displayProcess) {
      process.stdout.write('Process: ' + loadedCount + '\n');
    }
  }
  const extractedTracks = await getTracksFromDOM(page);

  await browser.close();

  if (typeof options.trackFormatterFn === 'function') {
    const length = extractedTracks.length;
    for (let i = 0; i < length; i += 1) {
      extractedTracks[i] = options.trackFormatterFn(extractedTracks[i]);
    }
  }

  playlist.tracks = extractedTracks;

  return returnPlaylist(playlist, options.filePath);
}

/**
 * Format track from ytpl
 * @param {number} i track index
 * @param {ytpl.Item} _track ytpl item
 * @param {function} trackFormatterFn formater function from options
 */
function formatTrack(i, _track, trackFormatterFn = undefined) {
  const track = {};
  track.index = i;
  track.thumbnail = _track.bestThumbnail.url;
  track.title = _track.title;
  track.artist = _track.author.name;
  track.album = '';
  track.duration = _track.duration;
  track.id = _track.id;

  if (typeof trackFormatterFn === 'function') {
    return trackFormatterFn(track);
  }

  return track;
}

async function getPlaylistByYtpl(playlistID, options) {
  try {
    if (ytpl.validateID(playlistID)) {
      const playlistResult = await ytpl(playlistID, { pages: 1 });
      const totalTrackCount = playlistResult.estimatedItemCount;
      const allTracks = playlistResult.items;
      let trackCount = allTracks.length;
      let haveMoreTrack = playlistResult.continuation;

      if (options.displayProcess) {
        process.stdout.write('Process: ' + allTracks.length + '\n');
      }
      while (trackCount < totalTrackCount && haveMoreTrack) {
        const moreTracks = await ytpl.continueReq(haveMoreTrack);
        trackCount += moreTracks.items.length;
        allTracks.push(...moreTracks.items);
        haveMoreTrack = moreTracks.continuation;
        if (options.displayProcess) {
          process.stdout.write('Process: ' + allTracks.length + '\n');
        }
      }

      const length = allTracks.length;
      for (let i = 0; i < length; i += 1) {
        allTracks[i] = formatTrack(i, allTracks[i], options.trackFormatterFn);
      }

      const playlist = {
        source: sourceName.youtube,
        name: playlistResult.title,
        numberOfTrack: allTracks.length,
        tracks: allTracks,
      };

      return returnPlaylist(playlist, options.filePath);
    }
    return Promise.reject('Invalid playlist ID');
  } catch (e) {
    return Promise.reject(`Error in getPlaylistByYtpl, ${e.message}`);
  }
}

module.exports = getPlaylist;
