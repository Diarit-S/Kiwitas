<template lang="pug">
  div(:class="$style.user")
    div(:class="$style.container")
      img(src="/img/icons/medal.svg" alt="medal of honor")
      div
        p(:class="$style.title") Qu’est-ce que c’est ?
        p(:class="$style.text") Cette certification est une récompense pour ton dévouement quant à l’apprentissage des devoirs que tu dois accomplir en tant que citoyen français. #[span Lorsque tu auras lu et validé tous les sujets de la plateforme, tu auras la possibilité de télécharger ta certification.]
    v-btn(color="primary" :disabled="!enabled") Télécharger ma certification
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      enabled: false
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.container {
  display: flex;
  align-items: flex-start;
  font-family: "Gotham", sans-serif;
  margin-bottom: 32px;

  img {
    width: 68px;
    height: 68px;
    margin-right: 16px;
  }
  .title {
    margin-bottom: 0 !important;
    font-size: 14px;
    color: var(--v-text-base);
    font-weight: bold;
  }
  .text {
    margin: 0;
    font-family: "OpenSans", sans-serif;
    color: var(--v-text-base);
    max-width: 500px;

    span {
      font-weight: bold;
    }
  }
}
</style>
