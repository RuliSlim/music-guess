<template>
  <div class="lobby py-4">
    <b-row no-gutters style="width: 80%; margin: 0px; padding-top: 100px">
      <b-col cols="6" md="4">
        <!-- <b-container style="background-color: white; width:100%; height: 100%"> -->
        <div style="font-size: 50px; background-color: black; height: 300px;">
          Welcome,
          <br />
          {{myName}}
        </div>
        <div style="background-color: gray; height: auto;">
          <h2 style="font-size: 38px; height: fit-content;">Head Count</h2>
          <h1 style="font-size: 72px; height: 100%">{{playerCount}}</h1>
          <h5 v-if="playerCount<4">Waiting for {{4-playerCount}} more players to join before playing</h5>
        </div>
      </b-col>
      <button @click="getSong">PLAY SONG</button>
      <b-col cols="12" md="8">
        <b-row style="margin: 0px; height:500px;">
          <b-jumbotron
            header="Guess The Song Title Below"
            lead="this is lead"
            style="width:100%; height: 100%; margin: 0px; border-radius: 0px;"
          ></b-jumbotron>
        </b-row>
        <b-row style="margin: 0px">
          <div
            id="answercontainer"
            style="background-color: white; width:100%; height: 300px; overflow:scroll; overflow-x:hidden;"
          >
            <ul>
              <li v-for="(data,i) in answerList" :key="i" style="list-style-type:none;">
                <span
                  v-if="data.user == 1"
                  style="background-color: gray; color: white;"
                >{{myName}}: {{data.guess}}</span>
                <span v-else>Anonymous: {{data.guess}}</span>
              </li>
            </ul>
          </div>
        </b-row>
        <b-row style="margin: 0px">
          <b-form @submit="guess" style="background-color: black; width: 100%;">
            <b-form-input
              v-model="answer"
              type="text"
              placeholder="Your guess.."
              autocomplete="off"
              style="border-radius: 0px;"
            ></b-form-input>
          </b-form>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
//import db from "@/fb";
import io from "socket.io-client";
import { mapState, mapMutations } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("playerName")) {
      next();
    } else {
      next(false);
    }
  },
  name: "Playboard",
  data() {
    return {
      roomName: "",
      roomList: [],
      answer: null,
      answerList: []
    };
  },
  computed: {
    ...mapState(["socket", "myName", "myKey", "playerCount"])
  },
  // watch: {
  //   otherPlayers() {
  //     if(this.$store.state.listOtherPlayers.length >= 2) {
  //       console.log('masuk sini sih')
  //       this.getSong()
  //     }
  //   }
  // },
  mounted() {

    this.socket.on("joined-room", data => {
      console.log(data, "ini data");
      this.$store.commit("setPlayerCount", data);
    });
    this.socket.on("selfJoin", data => {
      console.log(data, "dayada csanjdja");
      this.$store.commit("setMyKey", data);
    });
    this.socket.on("otherGuess", data => {
      console.log(data);
      this.answerList.push({ guess: data, user: 0 });
    });

          this.socket.emit("getSong", this.$store.state.joinedRoom);
      console.log('masuk cuy')
    this.socket.on('getSong', (data) => {
      console.log(data, 'Lagu cuy')
      let audio = new Audio(data.preview);
      if(!audio.paused) audio.play();
    })
  },
  created() {

  },
  methods: {
    ...mapMutations(["setSocket"]),

    guess(evt) {
      evt.preventDefault();
      if (this.answer == "is lit") {
        //next song
      }
      this.answerList.push({
        user: 1,
        guess: this.answer
      });

      this.socket.emit("guess", {
        guess: this.answer,
        room: this.$store.state.joinedRoom
      });

      this.answer = null;
      //   this.scrollToEnd();
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#answercontainer");
      container.scrollTop = container.scrollHeight;
    }
  },
  watch: {
    answerList() {
      this.scrollToEnd();

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
  font-family: Arial, Helvetica, sans-serif;
}

.lets-play {
  width: 300px;
  font-size: 40px;
}
</style>