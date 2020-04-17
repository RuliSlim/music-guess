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
    // console.log(room, 'ROOM IKI CUUK')
    let id = room.id;
    let player = room.playerName;
    let roomName = room.name;

    RoomController.findOne(id, (err, room) => {
      if (err) {
        socket.emit('show-error', 'Room doesnt exists')
      } else {
        socket.join(roomName);
        io.to(roomName).clients((err, client) => {
          socket.emit('selfJoin', client[client.length - 1]);
          io.to(roomName).emit('joined-room', client);
        })
      }
    })
  })

  socket.on('guess', (answer) => {
    socket.broadcast.to(answer.room).emit('otherGuess', answer.guess);
    // io.to(answer.room).emit('otherGuess', answer.guess)
  })

  // socket.on('updateScore', (data) => {
  //   io.to(data.room).emit('otherScores', answer.guess)
  // })


})


const insideRoom = io.of('/play');
insideRoom.on('connection', (socket) => {
  console.log('YOU ARE IN THE PLAYROOM')

  socket.on('play', () => {
    SongController.getOne((err, data) => {
      if (err) {
        socket.emit('show-error', 'Something went wrong!');
      } else {
        socket.emit('play', data);
      }
    })
  })
})

// function getAllRoomMembers(room, _nsp) {
//   var roomMembers = [];
//   var nsp = (typeof _nsp !== 'string') ? '/' : _nsp;

//   for( var member in io.nsps[nsp].adapter.rooms[room] ) {
//       roomMembers.push(member);
//   }

//   return roomMembers;
// }

// SongController.getOne((err, song) => {
//   if (err) {
//     let allData = {
//       player: player,
//       room: roomName,
//       song: song
//     }
//     io.to(roomName).emit('joined-room')
//   }
// })