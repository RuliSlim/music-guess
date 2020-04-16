import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket : null,
    joinedRoom:"",
    isCreator : false,
    myKey : "",
    myName : "",
    myScore:"",
    otherPlayers:{},
    listPlayer: []
  },
  mutations: {
    resetState(state, payload){
      state.joinedRoom = "",
      state.isCreator  =  false,
      state.myKey  =  "",
      state.myScore = 0,
      state.otherPlayers = {}
    },
    setRoom(state,payload){
      state.joinedRoom = payload
    },
    setIsCreator(state,payload){
      state.isCreator = payload
    },
    setMyKey(state,payload){
      state.myKey = payload
    },
    setMyName(state,payload){
      state.myName = payload
    },
    setMyScore(state,payload){
      state.myScore = payload
    },
    setOtherPlayers(state,payload){
      delete payload[state.myKey]
      state.otherPlayers = payload
    },
    updateOtherScore(state, payload){
      state.otherPlayers[payload.key] = payload.score
    },
    setSocket(state, payload){
      state.socket = payload
    },
    setPlayerList(state, payload){
      state.listPlayer.push(payload)
    }
  },
  actions: {
   
  }
})
