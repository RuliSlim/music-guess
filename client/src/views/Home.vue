<template>
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
