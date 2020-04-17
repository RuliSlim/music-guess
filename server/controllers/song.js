const axios = require('axios');

class SongController {
  static getOne(callback) {
    let idSong;
    let totalSong;
    let song;
    let data = {}
    axios({
      "method": "GET",
      "url": "https://deezerdevs-deezer.p.rapidapi.com/playlist/6883758504",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "475b690cfcmsh180747390053997p1f4bb2jsncc703e5056da"
      }
    })
      .then((response) => {
        song = response.data.tracks.data
        totalSong = response.data.tracks.data.length;
        idSong = Math.ceil(Math.random() * totalSong);
        data.title = song[idSong].title;
        data.preview = song[idSong].preview;
        // res.status(200).json(data);
        callback(null, data);
      })
      .catch((error) => {
        callback(error, null);
      })
  }
}

module.exports = SongController;
