import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {}
  },
  mutations: {
    SET_ACCOUNT(state, payload) {
      const { userData } = payload
      state.userData = { userData }
    },
    STORE_NEW_TOKEN(state, token) {
      Cookies.set("token", token, {
        expires: 2
      })
    }
  },
  actions: {
    async login(context, credentials) {
      const userData = await axios.post("/auth/loginn", credentials)
      context.commit("SET_ACCOUNT", { userData: userData.data })
      context.commit("STORE_NEW_TOKEN", userData.data.token)
    }
  }
})
