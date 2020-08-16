import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
// import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"
import _ from "lodash"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {}
  },
  getters: {
    isUserLogged(state) {
      return state.userData.token ? true : false
    }
  },
  mutations: {
    SET_ACCOUNT(state, payload) {
      const { userData } = payload
      state.userData = userData
    },
    STORE_NEW_TOKEN(state, token) {
      Cookies.set("token", token, {
        expires: 2
      })
    },
    UPDATE_FAVORITES(state, newFavorites) {
      console.log("je suis dans la mutation")
      state.userData.user.favorites = newFavorites
    }
    // TOGGLE_FROM_FAVORITES(state, articleId) {
    //   const itemIndex = state.userData.user.favorites.indexOf(articleId)
    //   itemIndex >= 0 ?
    //   state.userData.user.favorites.splice(itemIndex, 1) :
    //   state.userData.user.favorites.push(articleId)
    // }
  },
  actions: {
    async login(context, credentials) {
      const userData = await axios.post("/user/login", credentials)
      context.commit("SET_ACCOUNT", { userData: userData.data })
      context.commit("STORE_NEW_TOKEN", userData.data.token)
    },
    async loginFromToken(context, token) {
      const userData = await axios.post("/user/loginFromToken", { token })
      context.commit("SET_ACCOUNT", { userData: userData.data })
      context.commit("STORE_NEW_TOKEN", userData.data.token)
    },
    //- TODO Find the best way to update favorites in DB
    async toggleFromFavorites(context, articleId) {
      console.log("okkkkk", articleId)
      let favoritesCopy = _.cloneDeep(context.state.userData.user.favorites)

      const itemIndex = favoritesCopy.indexOf(articleId)
      itemIndex >= 0 ? favoritesCopy.splice(itemIndex, 1) : favoritesCopy.push(articleId)

      const userId = context.state.userData.user._id

      await axios.post("/user/updateFavorites", { favorites: favoritesCopy, userId }).catch(err => {
        console.error(err)
      })
      console.log("eee")
      context.commit("UPDATE_FAVORITES", favoritesCopy)
    }
  }
})
