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

  static findOne(id, callback) {
    Room.findOne({where: {id}})
      .then(room => callback(null, room))
      .catch(err => callback(err, null));
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

  static join(payload, callback) {

    let playerKey;
    Room.findOne({
            where: {             
                name: payload.roomName
            }
        })
        .then(result => {
            if (result) {
                let idx = Object.keys(result.players).length;
                playerKey = `${idx + 1}-${payload.playerName}`;
                result.players[playerKey] = 0;
                result.changed('players', true);

                return result.save();
            } else {
                throw {
                    status_code: 404,
                    message: 'Room Not Found'
                };
            }
        })
        .then(result => {
            let data_result = result.dataValues
            callback(null, {
                ...data_result,
                playerKey
            });
        })
        .catch(err => {
            callback(err, null);
        });
}
}

module.exports = RoomController