<<<<<<< HEAD
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
=======
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.get("/", function(req, res){
  res.send("Server is running")
})

const http = require("http").createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, function(){
  console.log("server is running on PORT " + PORT)
})

module.exports = http
>>>>>>> ed29b85116c453d66f614b3c5bcf977b800831f0
