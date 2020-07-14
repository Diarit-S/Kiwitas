<template lang="pug">
  div(:class="$style.course")
    loader(v-if="isLoading")
    template(v-else)
      h1 {{ course.title }}
      img(
        v-if="course.media_link && isMediaImage" 
        :class="$style['main-image']" 
        :src="course.media_link"
      )
      section(
        :class="$style['content-container']"
      )
        v-runtime-template(
          :template='course.content' 
          :class="$style.content"
        )
        iframe(
          v-if="course.media_link && !isMediaImage" 
          :class="$style.embed" 
          :src="course.media_link" 
          allowfullscreen="true" 
          width="425" 
          height="344" 
          frameborder="0"
        )
        remember(
          :listToRemember="course.to_remember" 
          :courseId="$route.params.id"
        )
        v-btn(
          :class="$style['quizz-btn']" 
          color="primary" 
          depressed
          @click="handleQuizzBtn"
        ) Faire le quizz
        v-dialog(
          :value="shouldShowModal"
          max-width="290"
        )
          v-card(:class="$style.card")
            span
              | Faites d'abord le quizz des cours précedents !
            v-btn(
              @click="shouldShowModal = false" 
              color="primary"
            ) D'accord !
</template>

<script>
import Tweet from "./components/Tweet.vue"
import Remember from "./components/Remember.vue"
import Loader from "@/components/Loader.vue"

import VRuntimeTemplate from "v-runtime-template"

import { articlesMixin } from "@/mixins/articles"

import articlesNavigation from "@/utils/articlesNavigation.json"

// import _ from "lodash"

export default {
  name: "Course",
  components: {
    Tweet,
    Remember,
    VRuntimeTemplate,
    Loader
  },
  mixins: [articlesMixin],
  data() {
    return {
      course: {
        toRemember: []
      },
      shouldShowModal: false,
      isLoading: false
    }
  },
  computed: {
    currentArticleApiId() {
      return this.$route.params.id
    },
    articlesNavigation() {
      return articlesNavigation
    },
    navigationArticleIds() {
      return this.articlesNavigation
        .reduce((acc, category) => {
          acc = acc.concat(category.articles)
          return acc
        }, [])
        .map(article => article.apiId)
    },
    currentArticleIndexInNav() {
      return this.navigationArticleIds.findIndex(apiId => apiId === this.currentArticleApiId)
    },
    previousArticlesIds() {
      return this.navigationArticleIds.slice(0, this.currentArticleIndexInNav)
    },
    arePreviousArticlesReaded() {
      return this.currentArticleIndexInNav === "0"
        ? true
        : this.previousArticlesIds.every(id => this.readArticles.includes(id))
    },
    isMediaImage() {
      const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
      return regex.test(this.course.media_link)
    }
  },
  methods: {
    async getArticle() {
      this.isLoading = true
      try {
        const article = await this.$http.get(`article/${this.currentArticleApiId}`)
        this.course = article.data
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    handleQuizzBtn() {
      this.arePreviousArticlesReaded
        ? this.$router.push({ name: "Quizz", params: { id: this.course._id } })
        : (this.shouldShowModal = true)
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="scss" module>
@import "@/scss/styles.scss";

.course {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 1rem 0;
  }

  .main-image {
    width: 80%;
    height: 100px;
    object-fit: cover;
    object-position: left top;
    border-radius: 6px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;

    @include small-screen {
      width: 90%;
    }

    .embed {
      max-width: 100%;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    width: 100%;

    & > * {
      margin: 1rem 0;
    }
  }

  .quizz-btn {
    display: block;
    margin: 2rem auto;
  }
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 1rem;
    text-align: center;
  }
}
</style>
