const fs = require('fs');
const puppeteer = require('puppeteer');
const spotifyUri = require('spotify-uri');

async function getPlaylist(uri, filePath = null) {
  let parsedUri;

  try {
    parsedUri = spotifyUri.parse(uri);
  } catch (err) {
    return Promise.reject(new Error('Invalid spotify uri'));
  }

  const url = spotifyUri.formatOpenURL(parsedUri);

  return getData(url, filePath);
}

async function getData(url, filePath) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  const tracklistContainer = await page.$('div[data-testid="playlist-tracklist"]');
  const numberOfTrack = parseInt(
    await page.evaluate((el) => el.getAttribute('aria-rowcount'), tracklistContainer)
  );

  const scrollBar = await page.$(
    'div.os-scrollbar:nth-child(4) > div:nth-child(1) > div:nth-child(1)'
  );
  const scrollBarBoundingBox = await scrollBar.boundingBox();
  const scrollHeight = scrollBarBoundingBox.height;

  let processedIndex = 0;
  const extractedTracks = [];
  const x = scrollBarBoundingBox.x + scrollBarBoundingBox.width / 2;
  let y = scrollBarBoundingBox.y;
  while (processedIndex < numberOfTrack) {
    await page.mouse.move(x, y);
    await page.mouse.down();
    y += scrollHeight;
    await page.mouse.move(x, y);
    await page.mouse.up();
    await page.waitForTimeout(1500);

    const newTracks = await page.evaluate((processedIndex) => {
      const nodeTracks = document.querySelector('div[data-testid="top-sentinel"] + div').childNodes;
      const tracks = [];

      for (let i = 0; i < nodeTracks.length; i += 1) {
        const index = parseInt(nodeTracks[i].getAttribute('aria-rowindex'));

        if (index > processedIndex) {
          const nodeDetails = nodeTracks[i].childNodes[0].childNodes;
          const track = {};
          track.index = index;
          track.thumbnail = nodeDetails[1].querySelector('img').getAttribute('src');
          const titleAndArtist = nodeDetails[1].innerText.split('\n');
          track.title = titleAndArtist[0];
          track.artist = titleAndArtist[1];
          track.album = nodeDetails[2].innerText;
          track.duration = nodeDetails[4].innerText;

          tracks.push(track);
        }
      }

      return tracks;
    }, processedIndex);

    if (newTracks.length) {
      processedIndex = newTracks[newTracks.length - 1].index;

      extractedTracks.push(...newTracks);
    }
  }

  await browser.close();

  if (filePath) {
    fs.writeFile(filePath, JSON.stringify(extractedTracks), (err) => {
      if (err) {
        Promise.reject(err);
      }
    });
  } else {
    return extractedTracks;
  }
}

module.exports = getPlaylist;
