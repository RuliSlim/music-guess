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

  socket.on("join-room", function(payload){
    console.log(payload,`sampai nihhhhh`)
    RoomController.join(payload, function(err, result){
      if (err){
        socket.emit('show-error', 'Failed to join '+ payload.roomName )
      } else  {
        socket.join(payload.roomName) //daftarin player ke room yang dia mau join
        io.to(payload.roomName).emit('player-joined', result.players) // kabarin ke anggota room lain kalo ada yang join
        socket.emit('get-in-to-room', result) //nyuruh yang join untuk masuk ke room
        io.emit('update-client-room') //trigger semua client agar update rooms nya
      }
       
    })
  })

})