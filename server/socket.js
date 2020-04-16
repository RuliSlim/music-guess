const io = require('./app');
const SongController = require('./controllers/song.js');
const RoomController = require("./controllers/room")

io.on("connection", function(socket){
  console.log('User connected')

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