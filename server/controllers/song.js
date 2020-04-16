const { Song } = require('../models');

class SongController {
  getOne(req, res, next) {
    let idSong ;
    let totalSong;
    Song.findAll()
      .then(song => {
        totalSong = song.length;
        idSong = Math.ceil(Math.random() * totalSong);
        return Song.findByPk(idSong);
      })
      .then(song => res.status(200).json(song))
      .catch(err => next(err));
  }
}

module.exports = SongController;
