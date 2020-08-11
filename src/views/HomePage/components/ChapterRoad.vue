<template lang="pug">
  section(:class="$style['chapter-road']")
    chapter-head(:chapterHead="chapterHead" :hasActiveBorder="isFirstArticleRoadActive")
    div(:class="[$style['previous-road'], $style['single-road'], {[$style['single-road--active']] : isFirstArticleRoadActive}]")
    template(v-if="structuredChapterRoad.cube")
      div(:class="[$style.cube, $style.outer, $style.road, {[$style['active-road']] : isReaded(structuredChapterRoad.cube[0])}]")
        div(:class="[$style.cube, $style.inner, $style.road, {[$style.leftCubeBranchActive] : isReaded(structuredChapterRoad.cube[1]), [$style.rightCubeBranchActive] : isReaded(structuredChapterRoad.cube[2])}]")
        article-sticker(
          v-for="(article, index) in structuredChapterRoad.cube" 
          :article="article"
          :className="'cube-sticker-' + (index + 1)" 
          :key="chapter.categoryName + 'cubeArticle' + index"
          :activeBorder="hasActiveBorder('cube', index)"
        )
        div(v-if="chapter.articles.length > 3" :class="[$style['next-road'], $style['single-road'], {[$style['single-road--active']] : isReaded(structuredChapterRoad.cube[3])} ]")
    article-sticker(
      v-for="(article, index) in structuredChapterRoad.single" 
      :article="article"
      className="single"
      :isChaptersFirst="index === 0 && (!structuredChapterRoad.cube || structuredChapterRoad.cube.length < 1)"
      :key="chapter.categoryName + 'singleArticle' + index"
      :isLastArticle="isLastChapter && index === structuredChapterRoad.single.length -1"
      :activeBorder="hasActiveBorder('single', index)"
    )
</template>

<script>
import ChapterHead from "./ChapterHead.vue"
import ArticleSticker from "./ArticleSticker.vue"

import { articlesMixin } from "@/mixins/articles"

export default {
  name: "ChapterRoad",
  mixins: [articlesMixin],
  components: {
    ChapterHead,
    ArticleSticker
  },
  data() {
    return {
      modalContent: {},
      isOpen: false
    }
  },
  props: {
    chapter: {
      type: Object,
      required: true
    },
    isLastChapter: {
      type: Boolean,
      required: true
    },
    previousChapterArticleIds: {
      type: Array,
      required: false
    }
  },
  computed: {
    chapterHead() {
      const chapter = this.chapter
      return {
        title: chapter.categoryName,
        icon: chapter.icon,
        index: chapter.index,
        hash: chapter.path
      }
    },
    structuredChapterRoad() {
      const articles = this.chapter.articles
      return this.groupBy(articles, "branchesModel")
    },
    isFirstArticleRoadActive() {
      return this.chapter.index === 1
        ? true
        : this.previousChapterArticleIds.every(id => this.readArticles.includes(id))
    }
  },
  methods: {
    //- Second parameter is the value that we group by
    groupBy(articles, key) {
      return articles.reduce((acc, article) => {
        ;(acc[article[key]] = acc[article[key]] || []).push(article)
        return acc
      }, {})
    },
    hasActiveBorder(branchModel, index) {
      if (branchModel === "cube") {
        if ([1, 2].includes(index)) {
          return this.isReaded(this.structuredChapterRoad.cube[0])
        } else if (index === 3) {
          return [1, 2].some(index => this.isReaded(this.structuredChapterRoad.cube[index]))
        }
      } else {
        if (index === 0) {
          if (this.structuredChapterRoad.cube) {
            return this.isReaded(this.structuredChapterRoad.cube[3])
          }
        } else return this.isReaded(this.structuredChapterRoad.single[index - 1])
      }
      if (index === 0) {
        return this.isFirstArticleRoadActive
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
@import "@/scss/styles.scss";

.chapter-road {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.outer {
  width: 400px;
  height: 400px;
  position: relative;
  box-sizing: border-box;
  margin: 3rem 0;

  @include small-screen {
    max-width: 60vw;
    max-height: 60vw;
  }

  &:before {
    //- Top left corner
    border-left: 12px solid;
    border-top: 12px solid;
    border-radius: 100px 0px 0px 0px;
  }

  &:after {
    //- Top Right corner
    right: 0;
    border-right: 12px solid;
    border-top: 12px solid;
    border-radius: 0px 100px 0px 0px;
  }
}

.inner {
  box-sizing: border-box;
}

.cube:before,
.cube:after {
  content: "";
  position: absolute;
  height: 50%;
  width: 50%;
}

.inner {
  &:before {
    //- Bottom Left corner
    bottom: 0;
    border-left: 12px solid;
    border-bottom: 12px solid;
    border-radius: 0px 0px 0px 100px;
  }

  &:after {
    //- Bottom Right corner
    bottom: 0;
    right: 0;
    border-right: 12px solid;
    border-bottom: 12px solid;
    border-radius: 0px 0px 100px 0px;
  }
}

// TODO changes these colors with vuetify variables
.road {
  &::after,
  &::before {
    border-color: var(--v-gray-base);
  }
}

.single-road {
  width: 12px;
  height: 100px;
  // TODO get the vutify sass variables colors
  background-color: var(--v-gray-base);
  position: absolute;
}

.next-road {
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
}

.previous-road {
  top: 70px;
}

.single-road--active {
  background-color: $primary;
}

.active-road {
  &::after,
  &::before {
    border-color: $primary;
  }
}

.leftCubeBranchActive {
  &::before {
    border-color: $primary;
  }
}

.rightCubeBranchActive {
  &::after {
    border-color: $primary;
  }
}
</style>
