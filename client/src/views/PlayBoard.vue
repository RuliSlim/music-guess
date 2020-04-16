<template>
  <div class="lobby py-4">
    <b-row no-gutters style="width: 80%; margin: 0px; padding-top: 100px">
      <b-col cols="6" md="4">
        <b-container
          style="background-color: white; width:100%; height: 100%"
        >{{myName}} : {{score}}</b-container>
      </b-col>
      <b-col cols="12" md="8">
        <b-row style="margin: 0px; height:500px;">
          <b-jumbotron
            :header="questionNumber"
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
              <li v-for="(data,i) in answerList" :key="i">
                <span
                  :style="{color: data.type == 1 ? 'red' : 'black'}"
                >{{data.user}}nameplaceholder:{{data.guess}}</span>
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
      answerList: [],
      quenum: 1,
      score: 0,
    };
  },
  computed: {
    ...mapState(["socket", "myName"]),
    questionNumber() {
      return `Question ${this.quenum}`;
    }
  },
  mounted() {
    this.socket.on("joined-room", (data) => {
      console.log(data, 'ini data')
      // console.log(data.nickname, 'nickname cuy')
      // this.$store.commit("setMyKey", data[data.length-1]);
      this.$store.commit("setPlayerList", data)
    })
    // let socket = io.connect("http://localhost:3000/play")
    // this.setSocket(socket)
    // console.log(socket)
    this.socket.on('selfJoin', (data) => {
    console.log(data, 'dayada csanjdja')
      this.$store.commit("setMyKey", data);
    })
  },
  created() {
  },
  methods: {
    ...mapMutations(['setSocket']),

    guess(evt) {
      evt.preventDefault();
      if (this.answer == "is lit") {
        this.answerList.push({
          user: this.myName,
          guess: this.answer,
          type: 1
        });
        this.score++;
        this.quenum++;
      } else {
        this.answerList.push({
          user: this.myName,
          guess: this.answer,
          type: 0
        });
      }
      this.answer = null;
      this.scrollToEnd();
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#answercontainer");
      container.scrollTop = container.scrollHeight;
    },
    listenOnSocketEvent() {
      this.socket.on("get-rooms", rooms => {
        this.roomList = rooms;
      });

      this.socket.on("room-created", room => {
        this.roomList.push(room);
      });

      this.socket.on("get-in-to-room", room => {
        room.isCreator && this.$store.commit("setIsCreator", true);
        this.$store.commit("setMyKey", room.playerKey);
        this.$store.commit("setRoom", room.name);
        this.$store.commit("setOtherPlayers", room.players);
        this.$store.commit("setMyScore", 0);
        this.$router.push("/play");
      });

      this.socket.on("update-client-room", () => {
        this.socket.emit("get-rooms");
      });
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