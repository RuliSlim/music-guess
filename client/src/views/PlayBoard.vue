<template>
  <h1>TES CUY</h1>
</template>

<script>
import io from 'socket.io-client';
import {mapState, mapMutations} from 'vuex';

export default {
  mounted() {
    console.log(socket)
    let socket = io.connect("http://localhost:3000/play")
    this.setSocket(socket)
    console.log(socket)
  },
  computed : {
    ...mapState(["socket", "myName"]),
  },
  methods: {
    ...mapMutations(['setSocket'])

  }
}
</script>

<style>

</style>