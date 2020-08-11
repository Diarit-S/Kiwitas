<template lang="pug">
  div(:class="$style.signIn")
    loader(v-if="isLoading" :class="$style.loader")
    template(v-else)
      h2 Connecte toi à #[span Kiwitas]
        p ou #[router-link(to="/sign-up") inscris-toi]
      v-form(:class="$style.form" ref="form" v-model="valid" @submit.prevent="getUser")
        p(v-if="failLogIn") Tes identifiants ne correspondent pas.
        v-text-field(v-model="email" :rules="emailRules" label="E-mail exemple@gmail.com" outlined required)
        v-text-field(v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" label="Mot de passe" outlined required)
        v-btn(:disabled="!valid" color="primary"  @click="getUser") Je me connecte
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
    async getUser() {
      this.isLoading = true
      this.validate()
      const { email, password } = this
      const token = await this.$http
        .post("/auth/login", { email, password })
        .catch(err => console.error(err))
      // setTimeout(() => {
      //   if (this.isLoged) {
      //     this.$router.push("/")
      //   } else {
      //     this.failLogIn = true
      //     this.isLoading = false
      //   }
      // }, 3000)
      console.log(token)
    }
  },
  computed: {
    isLoged() {
      return this.$store.getters.isLoged
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
