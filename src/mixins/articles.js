export const articlesMixin = {
  computed: {
    readedArticles() {
      return JSON.parse(localStorage.getItem("readedArticles"))
    },
    isReaded() {
      return article => this.readedArticles.includes(article.apiId)
    }
  }
}
