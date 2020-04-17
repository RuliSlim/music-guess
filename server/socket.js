const io = require('./app');
const SongController = require('./controllers/song.js');
const RoomController = require("./controllers/room")
let nameSpace;

io.on("connection", function (socket) {
  console.log('User connected')

  socket.on('create-room', function (roomData) {
    RoomController.create(roomData, function (err, createdRoom) {
      if (err) {
        socket.emit('show-error', 'Failed to create room')
      } else {
        io.emit('room-created', createdRoom)
        socket.join(createdRoom.name)
        socket.emit('get-in-to-room', { ...createdRoom, playerKey: `1-${roomData.creator}`, isCreator: true })
      }
    })
  })

  socket.on('get-rooms', function () {
    RoomController.findAll(function (err, results) {
      if (err) {
        socket.emit('show-error', "Failed to get room data")
      } else {
        socket.emit("get-rooms", results)
      }
    })
  })

  socket.on('join-room', (room) => {
    let id = room.id;
    let player = room.playerName;
    let roomName = room.name;

    RoomController.findOne(id, (err, room) => {
      if (err) {
        socket.emit('show-error', 'Room doesnt exists')
      } else {
        io.to(roomName).clients((err, client) => {

          if(client.length == 2) {
            socket.emit('failJoin', 'Room fuul')
          } else {
            socket.join(roomName);
            socket.emit('selfJoin', client[client.length-1]);
            io.to(roomName).emit('joined-room', client);
          }
        })
      }
    })
  })


  socket.on('guess', (answer) => {
    socket.broadcast.to(answer.room).emit('otherGuess', answer.guess);
  })






  // let hasSend = false;
  socket.on('getSong', (roomName) => {
    // if(io.to)
    io.to(roomName).clients((err, client) => {
        if(client.length > 1) {
          SongController.getOne((err, song) => {
            io.to(roomName).emit('getSong', song)
          })
        }
    })
  })
})