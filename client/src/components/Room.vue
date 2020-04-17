<template>
  <div class="room p-2 m-2 rounded" style="min-width:200px; ;">
    <h4>{{room.name}}</h4>

    <h5 v-if="players.length >= 4">FULL</h5>
    <div class="w-100" v-if="players.length < 4">
      <p class="text-left" v-for="(player, index) in players" :key="index">{{player}}</p>
    </div>
    <b-button
      v-if="players.length < 4"
      size="small"
      type="submit"
      variant="info"
      @click.prevent="joinRoom(room.name)"
    >Join</b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["room"],
  computed: {
    ...mapState(["socket", "myName", "joinedRoom"]),
    players() {
      return Object.keys(this.room.players).map(key => key.split("-")[1]);
    }
  },
  methods: {
    joinRoom(name) {
      let payload = {
        playerName: this.myName,
        name: this.room.name,
        id: this.room.id
      };
      // console.log(payload)
      this.socket.emit("join-room", payload);
      this.$store.commit("setRoom", this.room.name);
      this.socket.on("joined-room", data => {});
      this.socket.on("selfJoin", data => {
        // console.log(data, 'dayada csanjdja')
        this.$store.commit("setMyKey", data);
        this.$router.push("/play");
      });
      this.socket.on("failJoin", data => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style scoped>
.room {
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: white;
}
</style>