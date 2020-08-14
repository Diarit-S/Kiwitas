<template lang="pug">
  v-navigation-drawer(:class="$style.nav" fixed width="25%" floating permanent)
    v-list( dense nav class="py-0" :class="$style.navContainer")
      v-list-item(:class="$style.logo")
        router-link(to="/")
          img(src="/img/icons/logo.svg")
      v-list-item
        v-list-item-content(:class="$style.profile")
          h3 PROFIL
          div(v-if="isUserLogged" :class="$style.profileLogged")
            img(src="/img/icons/profil-picture.png")
            div(:class="$style.profileName")
              p {{$store.state.userData.user.name}} {{$store.state.userData.user.lastName}}
              p {{$store.state.userData.user.username}}
          router-link(to="/profil" v-if="isUserLogged" :class="$style.showProfile") Voir profil ►
          div(v-if="!isUserLogged")
            v-btn(medium color="primary" to="/sign-in" :class="$style.signIn") CONNEXION
      v-list-item
        v-list-item-content(:class="$style.discover")
          h3 DÉCOUVRIR
          Link(v-for="content in navContent" :key="content.categoryName" :content="content")
      v-list-item
        v-list-item-content(:class="$style.challenge")
          h3 TES CHALLENGES
          div(v-if="isUserLogged")
            p Les challenges arrivent prochainement!
          p(v-if="!isUserLogged") #[router-link(to="/sign-in" :class="$style.signUp" ) Connecte toi] ou #[router-link(to="/sign-up" :class="$style.signUp") créer un compte] pour pouvoir jouer !
</template>

<script>
import categories from "@/utils/articlesNavigation.json"
import Link from "@/components/Navigation/component/Link.vue"

import { mapGetters } from "vuex"

export default {
  name: "Navigation",
  components: {
    Link
  },
  data() {
    return {
      navContent: categories
    }
  },
  computed: {
    ...mapGetters(["isUserLogged"])
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.nav {
  background-color: var(--v-nav-base) !important;
}
.navContainer {
  margin-left: 40px !important;
  padding: 0 !important;
}

h3 {
  font-family: "Gotham", sans-serif;
  font-size: 12px;
  color: #9498a0;
  margin-bottom: 16px !important;
}

.logo {
  margin-top: 70px;
}

.profile {
  margin: 30px 0 60px;
  padding: 0 !important;

  .signIn {
    font-size: 12px;
    font-family: "Gotham", sans-serif;
    padding: 8px 16px !important;
    background-color: $primary;
    width: 111px !important;
    border-radius: 5px;
    color: #faf9f9 !important;
    margin-bottom: 8px;
  }
}

.profileLogged {
  display: flex;
  align-items: center;
  margin-bottom: 20px !important;
  font-family: "OpenSans", sans-serif;
  font-weight: bold;
  font-size: 12px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }

  p {
    margin: 0 !important;

    &:first-child {
      margin-bottom: 4px !important;
    }

    &:last-child {
      color: $primary;
    }
  }
}

.showProfile {
  font-family: "Gotham", sans-serif;
  font-size: 12px;
  color: var(--v-text-base) !important;
}

.discover {
  margin-bottom: 32px;
  overflow: visible !important;
  padding: 0 !important;
  width: 70%;

  a {
    display: flex;
    align-items: center;
    margin: 0 0 15px -20px !important;
    width: max-content;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 14px;
    font-family: "Gotham", sans-serif;

    &:hover {
      background-color: var(--v-gray-base);
    }

    p {
      margin: 0;
    }
  }
}

.challenge {
  p {
    font-family: "OpenSans", sans-serif;
    font-size: 12px;
    font-weight: 600;

    a {
      color: $primary !important;
      text-decoration: underline;
    }
  }
}
</style>
