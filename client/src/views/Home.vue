<template>
<<<<<<< HEAD
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1>Youdjas</h1>
    <audio controls autoplay>
      <source src="https://p.scdn.co/mp3-preview/dd64cca26c69e93ea78f1fff2cc4889396bb6d2f">
    </audio>
=======
  <div class="home" >
    <b-form @submit.prevent="startGame">
      <b-form-input
        class="mb-5"
        id="input-small"
        size="sm"
        placeholder="Enter your name"
        v-model="playerName"
        autocomplete="off"
      ></b-form-input>
      <b-button
        type="submit"
        :disabled="playerName === ''"
        class=""
        @click.prevent="startGame"
        variant="outline-primary"
      >Play!</b-button>
    </b-form>
>>>>>>> ed29b85116c453d66f614b3c5bcf977b800831f0
  </div>
</template>

<script>
// @ is an alias to /src
//import db from "@/fb";
import io from 'socket.io-client'
import {mapState, mapMutations} from 'vuex'
export default {
  name: "home",
  data() {
    return {
      playerName: "",
    };
  },
  computed : {
    ...mapState(["socket", "myName"])
  },
  methods: {
    ...mapMutations(['setSocket', 'setMyName']),

    startGame() {
       this.setMyName(this.playerName)
       if(this.socket === null){
         let socket = io.connect("http://localhost:3000")
         this.setSocket(socket)
       }
       localStorage.setItem("playerName", this.playerName)
       this.$router.push("/lobby")
    },
  }

};
</script>

<style scoped>
.home {
  background: url("http://getwallpapers.com/wallpaper/full/1/3/d/504382.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
}

.lets-play {
  width: 300px;
  font-size: 40px;
}

</style>
