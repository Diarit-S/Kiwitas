export const articlesMixin = {
  computed: {
    readArticles() {
      return JSON.parse(localStorage.getItem("readArticles"))
    },
    isReaded() {
      return article => this.readArticles.includes(article.apiId)
    }
  }
}
