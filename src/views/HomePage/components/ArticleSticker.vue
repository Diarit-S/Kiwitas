<template lang="pug">
  div(:class="[$style.articleSticker, $style[className], {[$style['chapters-first']] : isChaptersFirst}]" @click="openModal")
    v-badge(
      bottom
      style="z-index: 4"
      color="success" 
      overlap
      icon="mdi-check-bold"
      :value="isReaded(article)"
      :class="$style.badge"
    )
      Pellet(:imageName="article.icon" :activeBorder="activeBorder")
    span(
      :class="{[$style['sticker-text']] : true, [$style['single-sticker-text']] : className !== 'single'}"
    ) {{ article.name }}
    div(
      v-if="className === 'single' && !isLastArticle" 
      :class="[$style['next-road'], $style['single-road'], {[$style['active-road']] : isReaded(article)}]"
    )
    Modal(:dialog="isOpen" :content="modalContent" @closeModal="isOpen = false")
</template>

<script>
//- TODO look for grammatical issues
import Modal from "@/components/DiscoverModal/DiscoverModal.vue"
import Pellet from "@/components/Pellet.vue"

import { articlesMixin } from "@/mixins/articles"

export default {
  name: "ArticleSticker",
  mixins: [articlesMixin],
  components: {
    Pellet,
    Modal
  },
  data() {
    return {
      isOpen: false,
      modalContent: {}
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    },
    className: {
      type: String,
      required: false
    },
    isLastArticle: {
      type: Boolean,
      required: false
    },
    activeBorder: {
      type: Boolean,
      required: false
    },
    isChaptersFirst: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    stickerTextStyle() {
      if (this.$vuetify.theme.dark) {
        return { background: this.$vuetify.theme.themes.dark.background }
      }
      return { background: this.$vuetify.theme.themes.light.background }
    }
  },
  methods: {
    openModal() {
      this.modalContent = this.article
      this.isOpen = true
    }
  }
}
</script>

<style lang="scss" module>
@import "~vuetify/src/styles/styles.sass";
@import "@/scss/core/colors.scss";

.articleSticker {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  z-index: 2;

  .avatar {
    background-color: gray;
  }
}

//- Make a single class for cube-sticker for shared style
.cube-sticker-1,
.cube-sticker-2,
.cube-sticker-3,
.cube-sticker-4 {
  position: absolute;
}

.cube-sticker-1 {
  left: 50%;
  transform: translate(-50%, calc(-50% + 6px));
}

.cube-sticker-2 {
  top: 50%;
  transform: translate(calc(-50% + 6px), -50%);
}

.cube-sticker-3 {
  left: 100%;
  top: 50%;
  transform: translate(calc(-50% - 6px), -50%);
}

.cube-sticker-4 {
  left: 50%;
  top: 100%;
  transform: translate(-50%, calc(-50% - 6px));
}

.sticker-text {
  padding: 0.2rem 0;
  background-color: var(--v-background-base);
}

.single-sticker-text {
  position: absolute;
  white-space: nowrap;
  top: 100%;
}

.single {
  margin: 3rem 0 2rem 0;
}

.single.chapters-first {
  margin-top: 1rem;
}

.single-road {
  width: 10px;
  height: 150px;
  background-color: var(--v-gray-base);
  position: absolute;
  z-index: -2;
  transform: translateY(40px);
}

.active-road {
  background-color: $primary;
}

// .next-road {
//   top: 50%;
// }
</style>
