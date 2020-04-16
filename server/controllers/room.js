const { Room } = require("../models")

class RoomController {
  static create(roomData, callback){
    let newRoom = {
      name : roomData.name,
      players : {
        ["1-" + roomData.creator] : 0
      }
    }

    Room.create(newRoom)
    .then(createdRoom => {   
      callback(null, createdRoom.dataValues)
    })
    .catch(err => {
      console.log(err)
      callback(err)
    })
  }

  static findAll(callback){
    Room.findAll({
      order: [
        ['id', 'ASC'],
      ],
    })
    .then(results => {
      callback(null, results)
    })
    .catch(err => {
      callback(err)
    })
    
  }

  static delete(roomName, callback){
    Room.destroy({
      where : {
        name : roomName
      }
    })
    .then(result => {
      console.log("Success delete room")
      callback(null)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static leave(payload, callback){
    Room.findOne({
      where : {
        name : payload.roomName
      }
    })
    .then(result => {
      if(result){
        delete result.players[payload.playerKey];
        result.changed("players", true)
        return result.save()
      } 
    })
    .then(result => {
      callback(null, result.dataValues)
    })
    .catch(err => {
      callback(err)
    })
  }
}

module.exports = RoomController