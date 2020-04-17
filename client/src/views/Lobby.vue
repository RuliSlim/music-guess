<template>
  <div class="lobby py-4">
    <b-form action>
      <h1 style="color: green; font-weight:bold">Hi, {{myName}}</h1>
      <b-row class="my-1 justify-content-center">
        <input
          style="width: 300px;"
          id="input-small"
          size="lg"
          placeholder="Room Name"
          v-model="roomName"
          type="text"
          maxlength="12"
          minlength="4"
          autocomplete="off"
        >
        <b-button type="submit" @click.prevent="createRoom" :disabled="roomName.length < 4">create room</b-button>
      </b-row>
    </b-form>
    <div class="container mt-4 w-100" style="display: flex; flex-wrap: wrap;">
      <Room
        v-for="(room) in roomList" :key="room.id"
        :room="room"/>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
//import db from "@/fb";
import io from 'socket.io-client'
import {mapState, mapMutations} from 'vuex'
import Room from '../components/Room.vue'
export default {
  beforeRouteEnter (to, from, next) {
   if(localStorage.getItem("playerName")){
     next()
   }else {
     next(false)
   }
  },
  name: "lobby",
  components : {
    Room
  },
  data() {
    return {
      roomName: "",
      roomList: [],
    };
  },
  computed : {
    ...mapState(["socket", "myName"])
  },
  created() {

    if(this.socket === null){    
      let socket = io.connect("http://localhost:3000")
      this.$store.commit('setSocket',socket)
    }
    this.$store.commit('resetState')
    this.listenOnSocketEvent()
    this.listRoom();
  },
  methods: {
    listRoom() {
      this.socket.emit('get-rooms')
    },
    createRoom() {
      let payload = {
        name : this.roomName,
        creator : this.myName
      }
      this.socket.emit('create-room', payload)
    },
    listenOnSocketEvent(){
      this.socket.on('get-rooms', (rooms) => {
        this.roomList = rooms
      })

      this.socket.on('room-created', (room) => {
        this.roomList.push(room)
        
      })

      this.socket.on('get-in-to-room', (room) => {
        room.isCreator && this.$store.commit("setIsCreator", true)
        this.$store.commit("setMyKey", room.playerKey)
        this.$store.commit("setRoom", room.name) 
        this.$store.commit("setOtherPlayers", room.players)
        this.$store.commit("setMyScore", 0)
        this.$router.push('/play') 
      })

      this.socket.on('update-client-room', ()=>{
        this.socket.emit('get-rooms')
      })
    }
  }
};
</script>

<style scoped>
.lobby {
  background: url("http://getwallpapers.com/wallpaper/full/1/3/d/504382.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif
}

.lets-play {
  width: 300px;
  font-size: 40px;
}


</style>
