import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import jwt_decode from "jwt-decode"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accountData: {},
    isLoged: false
  },
  mutations: {
    getAccountData(state, data) {
      state.accountData = data
    },
    setIsLoged(state, bool) {
      state.isLoged = bool
    }
  },
  actions: {
    getLocalUserData({ commit }, data) {
      commit("getAccountData", data.localUser)
    },
    async getAccountData({ commit, state }, { email, password }) {
      const getUserToken = await axios
        .post("/login_check", { email, password })
        .then(response => {
          // Check if these id are correct and get the token if is it
          if (response.status === 200) {
            return response.data.token
          }
        })
        .catch(e => {
          console.log(e)
        })
      if (getUserToken !== undefined) {
        // If we got a token we decode it do get the user ID
        const idUser = jwt_decode(getUserToken).user
        const getUserData = await axios.get(`/user/${idUser}`).then(response => {
          return response.data
        })
        // here we store the userData in our app
        localStorage.setItem("userLog", JSON.stringify(getUserData))
        localStorage.setItem("userIsAuth", JSON.stringify(state.isLoged))
        commit("getAccountData", getUserData)
        commit("setIsLoged", true)
      } else {
        commit("setIsLoged", false)
      }
    }
  },
  getters: {
    hasData: state => {
      return state.accountData.id === undefined ? false : true
    },
    isLoged: state => {
      return state.isLoged === false ? false : true
    }
  },
  modules: {}
})
