const defaultYoutubeTrackFormatter = (track) => {
  const clonedTrack = {
    ...track,
  };

  const regex = /official|lyric(s)?|video|[()]/gi;
  clonedTrack.title = track.title.replace(regex, '').trim();

  return clonedTrack;
};

module.exports = defaultYoutubeTrackFormatter;
