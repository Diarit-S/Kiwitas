import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
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
      state.userData.user.favorites = newFavorites
    },
    UPDATE_READ_ARTICLES(state, newReadArticles) {
      state.userData.user.readArticles = newReadArticles
    }
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
    async toggleFromFavorites(context, articleId) {
      let favoritesCopy = _.cloneDeep(context.state.userData.user.favorites)

      const itemIndex = favoritesCopy.indexOf(articleId)
      itemIndex >= 0 ? favoritesCopy.splice(itemIndex, 1) : favoritesCopy.push(articleId)

      const userId = context.state.userData.user._id

      await axios.post("/user/updateFavorites", { favorites: favoritesCopy, userId }).catch(err => {
        console.error(err)
        throw err
      })
      context.commit("UPDATE_FAVORITES", favoritesCopy)
    },
    async addArticleToReadList(context, articleId) {
      let readArticlesCopy = _.cloneDeep(context.state.userData.user.readArticles)

      if (!readArticlesCopy.includes(articleId)) {
        readArticlesCopy.push(articleId)
      }

      const userId = context.state.userData.user._id

      await axios
        .post("/user/updateReadArticles", { readArticles: readArticlesCopy, userId })
        .catch(err => {
          console.error(err)
          throw err
        })

      context.commit("UPDATE_READ_ARTICLES", readArticlesCopy)
    }
  }
})
