<template lang="pug">
  div(:class="$style.signIn")
    loader(v-if="isLoading" :class="$style.loader")
    template(v-else)
      h2 Connecte toi à #[span Kiwitas]
        p ou #[router-link(to="/sign-up") inscris-toi]
      v-form(:class="$style.form" ref="form" v-model="valid" @submit.prevent="login")
        p(v-if="failLogIn") Tes identifiants ne correspondent pas.
        v-text-field(v-model="email" :rules="emailRules" label="E-mail exemple@gmail.com" outlined required)
        v-text-field(v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" label="Mot de passe" outlined required)
        v-btn(:disabled="!valid" color="primary"  @click="login") Je me connecte
        v-btn(color="primary" @click="logState") Log state
</template>

<script>
import Loader from "@/components/Loader.vue"

export default {
  name: "SignIn",
  components: {
    Loader
  },
  data: () => ({
    valid: true,
    email: "",
    show1: false,
    emailRules: [
      v => !!v || "Une adresse e-mail est requis",
      v => /.+@.+\..+/.test(v) || "Votre addresse e-mail semble incorrecte"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Un mot de passe est requis",
      v => v.length >= 8 || "Votre mot de passe doit contenir au moins 8 caractères"
    ],
    failLogIn: false,
    isLoading: false
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async login() {
      this.isLoading = true
      this.validate()
      const { email, password } = this
      this.$store.dispatch("login", { email, password }).finally(() => (this.isLoading = false))
    },
    logState() {
      console.log(this.$store.state)
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.signIn {
  .loader {
    left: 50%;
  }

  h2 {
    position: relative;
    width: max-content;
    margin: 100px auto 110px;

    p {
      position: absolute;
      left: 0;
      color: $greyDarken;
      font-size: 18px;

      a {
        text-decoration: underline;
        font-weight: 800;
      }
    }
  }
  .form {
    text-align: center;
    margin: 0 auto;
    width: 400px;
  }
}
@media (max-width: 600px) {
  .form {
    width: 100% !important;
  }
}
</style>
