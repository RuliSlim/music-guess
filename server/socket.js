<<<<<<< HEAD
const io = require('./app');
const SongController = require('./controller/song.js');

io.on('connection', (socket) => {
  console.log('User connect')
  console.log(socket)
})
=======
const http = require("./app.js")
const io = require("socket.io")(http)

const RoomController = require("./controllers/room")

io.on("connection", function(socket){

  socket.on('create-room', function(roomData){
    RoomController.create(roomData, function(err, createdRoom){
      if(err) {
        socket.emit('show-error', 'Failed to create room')
      } else {
        io.emit('room-created', createdRoom) 
        socket.join(createdRoom.name) 
        socket.emit('get-in-to-room', {...createdRoom, playerKey: `1-${roomData.creator}`, isCreator : true}) 
      }
    })
  })

  socket.on('get-rooms', function(){
    RoomController.findAll(function(err, results){
      if(err){
        socket.emit('show-error', "Failed to get room data")
      } else {
        socket.emit("get-rooms", results)
      }
    })
  })

})
>>>>>>> ed29b85116c453d66f614b3c5bcf977b800831f0
