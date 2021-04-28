const fs = require('fs');
const puppeteer = require('puppeteer');
const youtubeUrl = require('./helpers/youtube-url');

async function getPlaylist(
  uri,
  options = {
    filePath: null,
    displayProcess: false,
    headless: true,
  }
) {
  const playlistID = youtubeUrl.getPlaylistId(uri);
  if (playlistID) {
    return getData(youtubeUrl.parsePlaylistUrl(playlistID), options);
  }

  return Promise.reject(new Error('Invalid youtube uri'));
}

async function getPlaylistGeneralInfo(page) {
  const info = await page.evaluate(() => {
    const name = document.querySelector('h1[id="title"]').innerText;
    const numberOfTrack = parseInt(
      document.querySelector('div[id="stats"]').childNodes[0].childNodes[0].innerText
    );
    return {
      name,
      numberOfTrack,
    };
  });

  return info;
}

async function getTracksFromDOM(page) {
  const newTracks = await page.evaluate(() => {
    let urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

    function getVideoId(url) {
      let match = urlRegex.exec(url);
      return match ? match[1] : false;
    }

    const nodeTracks = document.querySelectorAll('ytd-playlist-video-renderer');
    const tracks = [];

    for (let i = 0; i < nodeTracks.length; i += 1) {
      const nodeDetail = nodeTracks[i];
      const track = {};
      track.index = i;
      track.thumbnail = nodeDetail.querySelector('img').src;

      const text = nodeDetail.innerText.split('\n');
      track.title = text[3];
      track.artist = text[4];
      track.album = '';
      track.duration = text[1];
      track.id = getVideoId(nodeDetail.querySelector('a[id="thumbnail"]').href);

      tracks.push(track);
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
  } else {
    return playlist;
  }
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
  playlist.tracks = await getTracksFromDOM(page);

  await browser.close();

  return returnPlaylist(playlist, options.filePath);
}

module.exports = getPlaylist;
