<template lang="pug">
  v-app
    v-row(no-gutters)
      v-col(:cols="$vuetify.breakpoint.xs ? 0 : 3" v-if="$vuetify.breakpoint.mdAndUp")
        Navigation(v-if="!isFirstTime")
        //- TODO Set this style on a class in proper way
      v-col(style="padding-top: 3rem" :cols="$vuetify.breakpoint.smAndDown ? 12 : 9")
        router-view(v-if="!isFirstTime" :class="$style.app")
    theme-toggler
    Introduction(v-if="isFirstTime" @closeIntroduction="isFirstTime = false")
    MobileNavigation(v-if="!isFirstTime && $vuetify.breakpoint.smAndDown")
</template>

<script>
import ThemeToggler from "@/components/ThemeToggler.vue"
import Introduction from "@/components/Introduction/Introduction.vue"
import Navigation from "@/components/Navigation/Navigation.vue"
import MobileNavigation from "@/components/MobileNavigation/MobileNavigation.vue"

export default {
  name: "App",
  components: {
    ThemeToggler,
    Introduction,
    Navigation,
    MobileNavigation
  },
  data() {
    return {
      isFirstTime: true,
      testArticle: {}
    }
  },
  created() {
    this.isFirstTime = JSON.parse(localStorage.getItem("firstTime")) === null
    let localUser = JSON.parse(localStorage.getItem("userLog"))
    if (localUser) {
      this.$store.dispatch("getLocalUserData", { localUser })
    }
    if (!localStorage.getItem("readArticles")) {
      localStorage.setItem("readArticles", JSON.stringify([]))
    }
    if (localStorage.getItem("isDark")) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("isDark"))
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.app {
  margin-bottom: 70px;
}
@media (max-width: 600px) {
  .app {
    padding: 0 15px 0;
  }
}
</style>
