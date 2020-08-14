<template lang="pug">
  div(:class="$style.account")
    div(:class="$style['account__container']")
      User
      Tabs(@changeCategory="changeCategory")
      Favorites(v-if="isFavorite" v-for="favorite in favArticles" :key="favorite.id" :content="favorite")
      Certification(v-if="isCertification")
      span(v-else-if="favorites.length === 0") Vous retrouverez ici vos favoris
</template>

<script>
import User from "@/views/Account/components/User.vue"
import Tabs from "@/views/Account/components/Tabs.vue"
import Favorites from "@/views/Account/components/Favorites.vue"
import Certification from "@/views/Account/components/Certification.vue"
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
    },
    async getFavoriteArticles() {
      const fav = await this.$http.post("/favoriteArticles", { ids: this.favArticles })
      this.favorites = fav
    }
  },
  computed: {
    favArticles() {
      return this.$store.state.userData.user.favorites
    }
  },
  created() {
    this.getFavoriteArticles()
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
