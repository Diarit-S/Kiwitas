<template lang="pug">
  div
    chapter-road(
      v-for="(chapter, index) in articleNavigation" 
      :chapter="chapter" 
      :key="'chapter' + index"
      :isLastChapter="index === articleNavigation.length - 1"
      :previousChapterArticleIds="previousChapterArticleIds(index)"
    )
</template>

<script>
import articleNavigation from "@/utils/articlesNavigation.json"
import ChapterRoad from "./components/ChapterRoad.vue"

export default {
  name: "Homepage",
  components: {
    ChapterRoad
  },
  computed: {
    articleNavigation() {
      return articleNavigation
    }
  },
  methods: {
    previousChapterArticleIds(index) {
      if (index !== 0) {
        return this.articleNavigation[index - 1].articles.map(article => article.apiId)
      }
    }
  }
}
</script>
