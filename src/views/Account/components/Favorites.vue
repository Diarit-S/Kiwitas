<template lang="pug">
  div(:class="$style.favorites")
    Pellet(:imageName="content.icon" activeBorder :class="$style.sticker")
    div(:class="$style.container")
      div(:class="$style.title")
        h3 {{content.name}}
        img(src="/img/icons/fav.svg" alt="favorite star")
      p #[span Résumé] : {{content.abstract}}
      v-btn(:class="$style.btn" color="primary" :to="`/course/${content.apiId}`") LIRE
</template>

<script>
import Pellet from "@/components/Pellet.vue"

export default {
  name: "Favorites",
  components: {
    Pellet
  },
  props: {
    content: { type: Object, required: true }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.favorites {
  display: flex;
  align-items: flex-start;
  font-family: "Gotham", sans-serif;
  margin-bottom: 24px;

  .sticker {
    margin-right: 1rem;
    min-width: 80px;
  }

  p {
    font-family: "OpenSans", sans-serif;
    font-size: 12px;
    max-width: 500px;

    span {
      font-weight: bold;
    }
  }
}
.title {
  display: flex;
  align-items: center;

  h3 {
    margin: 0 8px 0 0 !important;
    font-size: 14px;
    color: var(--v-text-base);
  }
}
.btn {
  span {
    color: $white;
  }
}
</style>
