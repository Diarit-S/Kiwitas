<template lang="pug">
  div(:class="$style.account")
    div(:class="$style['account__container']")
      User
      Tabs(@changeCategory="changeCategory")
      Favorites(v-if="isFavorite" v-for="favorite in favArticles" :key="favorite.id" :content="favorite")
      Certification(v-if="isCertification")
      span(v-else-if="favArticles.length === 0") Vous retrouverez ici vos favoris
</template>

<script>
import User from "@/views/Account/components/User.vue"
import Tabs from "@/views/Account/components/Tabs.vue"
import Favorites from "@/views/Account/components/Favorites.vue"
import Certification from "@/views/Account/components/Certification.vue"

import articlesNavigation from "@/utils/articlesNavigation.json"

export default {
  name: "Account",
  components: {
    User,
    Tabs,
    Favorites,
    Certification
  },
  data() {
    return {
      isFavorite: true,
      favorites: [],
      isCertification: false
    }
  },
  methods: {
    changeCategory(category) {
      category === "fav" ? (this.isFavorite = true) : (this.isFavorite = false)
      this.isCertification = !this.isFavorite
    }
    //- TODO This had to be removed
    // async getFavoriteArticles() {
    //   const fav = await this.$http.post("article/favoriteArticles", { ids: this.favArticles })
    //   this.favorites = fav
    // }
  },
  computed: {
    articles() {
      return articlesNavigation.reduce((acc, category) => {
        acc = acc.concat(category.articles)
        return acc
      }, [])
    },
    favArticlesIds() {
      return this.$store.state.userData.user.favorites
    },
    favArticles() {
      return this.articles.filter(article => this.favArticlesIds.includes(article.apiId))
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/styles.scss";
.account {
  .account__container {
    margin-left: 70px;
    @include small-screen {
      margin-left: 0;
    }
  }
}
</style>
