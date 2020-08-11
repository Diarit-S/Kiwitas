<template lang="pug">
  div(
    :class="$style.tweet"
  )
    tweetos
    div(:class="$style.message")
      p(v-html="tweet.title")
    div(:class="$style.options")
      div(:class="$style.text") 
        span 6:24 PM - 23 juin 2020
      v-divider
      div(:class="$style.text")
        span(:class="$style.stat") 236 
        | Retweets 
        span(:class="$style.stat") 1.3 k 
        | J'aime 
      v-divider
      //- TODO remove repetition here
      div(:class="$style.icons")
        img(src='@/assets/icons/tweet_comment.svg')
        img(src='@/assets/icons/tweet_retweet.svg')
        img(src='@/assets/icons/tweet_heart.svg')
        img(src='@/assets/icons/tweet_save.svg')
    template(v-if="tweet.content")
      tweetos
      div(:class="$style.response")
        div
          p(v-html="tweet.content")
          div(:class="$style['comment-icons']")
            img(src='@/assets/icons/tweet_comment.svg')
            img(src='@/assets/icons/tweet_retweet.svg')
            img(src='@/assets/icons/tweet_heart.svg')
            img(src='@/assets/icons/tweet_save.svg')

      
</template>

<script>
import Tweetos from "./Tweetos.vue"

export default {
  name: "Tweet",
  components: {
    Tweetos
  },
  props: {
    tweet: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "~vuetify/src/styles/styles.sass";
@import "@/scss/styles.scss";

.tweet {
  width: 450px;
  font-size: 12px;
  padding: 0.5rem;
  background-color: var(--v-tweet-base);

  border-radius: 4px;
  align-self: center;

  @include small-screen {
    max-width: 100%;
  }

  &:after {
    content: "Cette représentation de tweet ne traduit pas la réalité";
    display: flex;
    justify-content: center;
  }

  .options {
    font-size: 10px;

    .text {
      margin: 0.5rem 0;
    }

    .stat {
      font-weight: bold;
    }
  }

  .icons {
    display: flex;
    justify-content: space-around;
    margin: 0.5rem 0;

    img {
      width: 20px;
    }
  }

  .comment-icons {
    display: flex;
    justify-content: space-around;

    img {
      width: 15px;
    }
  }

  .message {
    font-size: 16px;
  }

  .response {
    display: flex;
    margin: 0.5rem 0;
    font-size: 14px;

    &::before {
      content: "";
      margin: 0 25px 0 17px;
      width: 2px;
      background-color: gray;
    }
  }
}
</style>
