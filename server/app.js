const express   = require('express');
const app       = express();
const cors      = require('cors');
const PORT      = process.env.PORT || 3000;
const socket    = require('socket.io');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const server    = app.listen(PORT, () => console.log('Server listening on port ' + PORT));
const io        = socket(server);

module.exports  = io;
