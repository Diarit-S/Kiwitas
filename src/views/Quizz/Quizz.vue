<template lang="pug">
  v-stepper(
    v-model="currentQuestion",
    v-if="questions.length"
  )
    v-stepper-header
      template(v-for="(step, index) in steps")
        v-stepper-step(
          :step="step"
          :key="'step' + index"
          :complete="step < currentQuestion"
        )
    v-stepper-items
      v-stepper-content(
        v-for="(step, index) in steps"
        :key="'content' + index"
        :step="step"
      )
        div.question
          span {{ `Question ${index + 1} : ` }}
          span.question__body {{ `${questions[index].title}` }}
        img(:src="questions[index].mediaUrl")
        div.assertations
          assertation(
            v-for="(assertation, index) in questions[index].assertations" 
            :key="'assertation' + index" 
            :assertation="assertation"
            v-model="activeAssertation"
            :position="index + 1"
            :isResponseValidated="isResponseValidated"
            :goodAnswerIndex="goodAnswerPosition"
          )
    div(style="height: 100px")
      v-btn(
        v-if="activeAssertation && !isResponseValidated" 
        color="primary" 
        @click="analyseAnswer()"
      ) Valider
      v-btn(
        v-else-if="isResponseValidated" 
        color="primary" 
        @click="nextQuestion()"
      ) {{ currentQuestion < steps ? 'Question suivante' : 'Terminer' }}
    finished-quizz-popup(
      :show="isQuizzFinished"
      :isQuizzWon="score === steps"
      @restartQuizz="restartQuizz()"
    )
    leave-quizz-dialog(:showDialog="showDialog" @Leave:route="handleDialogDecision")
</template>

<script>
import Assertation from "./components/Assertation.vue"
import FinishedQuizzPopup from "./components/FinishedQuizzPopup.vue"
import LeaveQuizzDialog from "./components/LeaveQuizzDialog.vue"

import { articlesMixin } from "@/mixins/articles"

// import articlesNavigation from "@/utils/articlesNavigation.json"

export default {
  name: "Quizz",
  components: {
    Assertation,
    FinishedQuizzPopup,
    LeaveQuizzDialog
  },
  data() {
    return {
      currentQuestion: 1,
      activeAssertation: 0,
      isResponseValidated: false,
      score: 0,
      isQuizzFinished: false,
      canLeaveRoute: null,
      showDialog: false,
      to: null,
      questions: [],
      steps: 0
    }
  },
  mixins: [articlesMixin],
  computed: {
    goodAnswerPosition() {
      return Number(this.questions[this.currentQuestion - 1].answerIndex) + 1
    }
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.steps) {
        this.currentQuestion++
        this.isResponseValidated = false
        this.activeAssertation = 0
      } else {
        this.canLeaveRoute = true
        this.isQuizzFinished = true
        if (this.score === this.steps) {
          this.$store.dispatch("addArticleToReadList", this.$route.params.id)
        }
      }
    },
    async getArticleQuestions() {
      try {
        const questions = await this.$http.get(`/question/fromArticleId/${this.$route.params.id}`)
        this.questions = questions.data
        this.steps = questions.data.length
      } catch (error) {
        console.log(error)
      }
    },
    analyseAnswer() {
      if (this.activeAssertation === this.goodAnswerPosition) {
        this.score++
      }
      this.isResponseValidated = true
    },
    restartQuizz() {
      this.isQuizzFinished = false
      this.currentQuestion = 1
      this.activeAssertation = 0
      this.score = 0
      this.isResponseValidated = false
    },
    handleDialogDecision(decision) {
      this.canLeaveRoute = decision
      if (decision) {
        this.$router.push(this.to)
      } else {
        this.to = null
        this.showDialog = false
      }
    }
  },
  created() {
    this.getArticleQuestions()
  },
  beforeRouteLeave(to, from, next) {
    if (this.canLeaveRoute) {
      next()
    } else {
      this.to = to
      this.showDialog = true
      next(false)
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/styles.scss";

.v-stepper {
  font-family: "Gotham", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: none;
  height: calc(100vh - 48px);
  margin: 0;

  @include small-screen {
    height: calc(100vh - 104px);
  }

  .v-stepper__header {
    width: 80%;
    border: none;
    box-shadow: none;

    .v-stepper__step {
      width: 15%;

      .v-stepper__step__step {
        width: 100%;

        i {
          display: none;
        }
      }
    }
  }

  .v-stepper__items {
    width: 80%;
    height: 80%;

    @include small-screen {
      width: 90%;
    }

    .v-stepper__content {
      height: 100%;
      padding: 0;

      .question {
        text-align: center;

        .question__body {
          font-size: 24px;
        }
      }

      .v-stepper__wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        > * {
          max-height: 33%;
        }

        @include medium-screen {
          img {
            max-height: 30%;
          }
          .assertations {
            max-height: 45%;
          }
        }
      }
    }
  }

  .assertations {
    width: 100%;
    display: flex;
    justify-content: center;

    flex-wrap: wrap;
  }
}
</style>
