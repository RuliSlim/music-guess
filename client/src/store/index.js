import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: null,
    joinedRoom: "",
    myKey: "",
    myName: "",
    playerCount: 0,
  },
  mutations: {
    resetState(state, payload) {
      state.joinedRoom = "",
        state.myKey = "",
        state.myScore = 0,
        state.playerCount = 0
    },
    setRoom(state, payload) {
      state.joinedRoom = payload
    },
    setMyKey(state, payload) {
      state.myKey = payload
    },
    setMyName(state, payload) {
      state.myName = payload
    },
    setSocket(state, payload) {
      state.socket = payload
    },
    setPlayerCount(state, payload) {
      state.playerCount = payload.length + 1
    }
  },
  actions: {
    // getPlayerList({ state, commit }, payload) {
    //   let arr = []
    //   console.log(payload)
    //   console.log(state.listOtherPlayers, 'hiis')
    //   for (let i in payload) {
    //     if (state.listOtherPlayers.length = 0) {
    //       if (payload[i] == state.myKey) {
    //         console.log('hi ini sama key')
    //       } else {
    //         arr.push({ key: payload[i], score: 0 })
    //       }
    //     }
    //     for (let j in state.listOtherPlayers) {
    //       if (payload[i] == state.myKey) {
    //         console.log('hi ini sama key')
    //         // || payload[i] == state.listOtherPlayers[j].key
    //       } else {
    //         arr.push({ key: payload[i], score: 0 })
    //       }
    //     }
    //   }
    //   console.log(arr)


    //   for (let in payload)
    //   commit('setPlayerList', arr)
    // }

  }
})



