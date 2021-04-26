let urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

module.exports = {
  valid(url) {
    return !!String(url).match(urlRegex);
  },
  getVideoId(url) {
    let match = urlRegex.exec(url);
    return match ? match[1] : false;
  },
  getPlaylistId(url) {
    let id = /[&|?]list=([a-zA-Z0-9_-]+)/gi.exec(url);
    return id && id.length > 0 ? id[1] : false;
  },
  parsePlaylistUrl(playlistId) {
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  },
  regex: urlRegex,
};
