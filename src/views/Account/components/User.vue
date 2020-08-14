<template lang="pug">
  div(:class="$style.user")
    img(src="/img/icons/profil-picture.png" alt="user profil picture")
    div
      h3 {{$store.state.userData.user.name}} {{$store.state.userData.user.lastName}}
      p {{$store.state.userData.user.username}}
</template>

<script>
export default {
  name: "User"
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.user {
  margin: 80px 0 55px;
  display: flex;
  align-items: center;
  font-family: "Gotham", sans-serif;

  img {
    width: 68px;
    height: 68px;
    margin-right: 16px;
  }
  h3 {
    margin-bottom: 0 !important;
    font-size: 34px;
    color: var(--v-text-base);
  }
  p {
    margin: 0;
    color: $greyDarken;
  }
}
</style>
