const io = require('./app');
const SongController = require('./controller/song.js');

io.on('connection', (socket) => {
  console.log('User connect')
  console.log(socket)
})