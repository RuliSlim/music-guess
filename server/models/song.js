'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    lyrics: DataTypes.TEXT
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};