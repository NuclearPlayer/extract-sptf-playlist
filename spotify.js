const fs = require('fs');
const puppeteer = require('puppeteer');
const spotifyUri = require('spotify-uri');
const sourceName = require('./helpers/sourceName');

async function getPlaylist(
  uri,
  options = {
    filePath: null,
    displayProcess: false,
    headless: true,
    trackFormatterFn: null,
  }
) {
  let parsedUri;

  try {
    parsedUri = spotifyUri.parse(uri);
  } catch (err) {
    return Promise.reject(new Error('Invalid spotify uri'));
  }

  const url = spotifyUri.formatOpenURL(parsedUri);

  return getData(url, options);
}

async function getPlaylistGeneralInfo(page) {
  const tracklistContainer = await page.$('div[data-testid="playlist-tracklist"]');
  const numberOfTrack = parseInt(
    await page.evaluate((el) => el.getAttribute('aria-rowcount'), tracklistContainer)
  );
  const playlistName = await page.evaluate(
    (el) => el.getAttribute('aria-label'),
    tracklistContainer
  );

  return {
    name: playlistName,
    numberOfTrack,
    source: sourceName.spotify,
  };
}

async function getScrollBar(page) {
  const scrollBar = await page.$(
    'div.os-scrollbar:nth-child(4) > div:nth-child(1) > div:nth-child(1)'
  );
  const scrollBarBoundingBox = await scrollBar.boundingBox();

  return scrollBarBoundingBox;
}

async function getTracksFromDOM(page, processedIndex) {
  const newTracks = await page.evaluate((processedIndex) => {
    const nodeTracks = document.querySelector('div[data-testid="top-sentinel"] + div').childNodes;
    const tracks = [];

    for (let i = 0; i < nodeTracks.length; i += 1) {
      if (nodeTracks?.[i]) {
        const index = parseInt(nodeTracks[i].getAttribute('aria-rowindex'));

        if (index > processedIndex) {
          const nodeDetails = nodeTracks[i].childNodes[0];

          if (nodeDetails) {
            const track = {};
            track.index = index;
            track.thumbnail = nodeDetails
              .querySelector('div[aria-colindex="2"]')
              ?.querySelector('img')
              ?.getAttribute('src');

            const titleAndArtist = nodeDetails
              .querySelector('div[aria-colindex="2"]')
              ?.innerText?.split('\n');
            const artistArray = titleAndArtist?.[titleAndArtist.length - 1]?.split(', ');

            track.title = titleAndArtist?.[0] || 'Untitle';
            track.album = nodeDetails.querySelector('div[aria-colindex="3"]')?.innerText || '';
            track.duration = nodeDetails.innerText?.split('\n')?.pop() || '0:00';
            track.artist = artistArray[0] || 'Unknown';
            track.otherArtists = artistArray?.slice(1) || [];

            tracks.push(track);
          }
        }
      }
    }

    return tracks;
  }, processedIndex);

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

  const scrollBar = await getScrollBar(page);
  const scrollHeight = scrollBar.height;

  let processedIndex = 0;
  const extractedTracks = [];
  const x = scrollBar.x + scrollBar.width / 2;
  let y = scrollBar.y;
  while (processedIndex < playlist.numberOfTrack) {
    const newTracks = await getTracksFromDOM(page, processedIndex);
    if (newTracks.length) {
      processedIndex = newTracks[newTracks.length - 1].index;
      extractedTracks.push(...newTracks);
    }
    if (options.displayProcess) {
      process.stdout.write('Process: ' + processedIndex + '\n');
    }

    await page.mouse.move(x, y);
    await page.mouse.down();
    y += scrollHeight;
    await page.mouse.move(x, y);
    await page.mouse.up();
    await page.waitForTimeout(1500);
  }

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

module.exports = getPlaylist;
