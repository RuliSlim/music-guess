const io = require('./app');
const SongController = require('./controllers/song.js');
const RoomController = require("./controllers/room")
let nameSpace;
let allData

let roomOne = {
  name: 'asd',
  players: []
}
let joinedRoom  = {

}

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

  socket.on('join-room', (room) => {
    let id = room.id;
    let player = room.playerName;
    let roomName = room.name;

    // {
    //   namadjasfusaufe: roomName,
    //   playfsakhfsafgoers: []
    // }

    RoomController.findOne(id, (err, room) => {
      if(err) {
        socket.emit('show-error', 'Room doesnt exists')
      } else {
        console.log('masukdmksd')
        // joinedRoom.name = roomName;
        // if(!joinedRoom.players.length) {
        //   console.log('huuh')
        //   joinedRoom.players = [];
        // }
        // joinedRoom.players.push(player);
        // console.log(joinedRoom, 'joinend room')
        roomOne.name = roomName
        roomOne.players.push(player);
        console.log(roomOne)
        socket.join(roomName);
        // io.to(roomName).clients((err, client) => {
          // socket.emit('selfJoin', client[client.length-1]);
          io.to(roomName).emit('joined-room', client);
        // })
      }
    })
  })

  // let hasSend = false;
  socket.on('getSong', (roomName) => {
    // if(io.to)
    io.to(roomName).clients((err, client) => {
      // if(!hasSend) {
        if(client.length > 1) {
          // hasSend = true;
          console.log('sending to client', client)
          SongController.getOne((err, song) => {
            io.to(roomName).emit('getSong', song)
          })
        }
      // }
    })
  })
})

const insideRoom = io.of('/play');
insideRoom.on('connection', (socket) => {
  console.log('YOU ARE IN THE PLAYROOM')

  socket.on('play', () => {
    SongController.getOne((err, data) => {
      if(err) {
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