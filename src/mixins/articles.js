import store from "@/store"

export const articlesMixin = {
  computed: {
    readArticles() {
      return store.state.userData.user ? store.state.userData.user.readArticles : []
    },
    isReaded() {
      return article => this.readArticles.includes(article.apiId)
    }
  }
}
