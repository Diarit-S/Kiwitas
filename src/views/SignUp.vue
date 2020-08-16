<template lang="pug">
  div(:class="$style.signUp")
    loader(v-if="isLoading" :class="$style.loader")
    template(v-else)
      h2 Inscris toi à #[span Kiwitas]
        p ou #[router-link(to="/sign-in") connecte-toi]
      v-form(:class="$style.form" ref="form" v-model="valid" @submit.prevent="createUser")
        p(v-if="failLogIn") Tes identifiants ne correspondent pas.©©
        v-row(:class="$style.dividedColumns")
          v-col(:class="$style.dividedColumn" :cols="$vuetify.breakpoint.xs ? 12 : 6")
            v-text-field(v-model="name" :rules="simpleRules" label="Prénom" outlined required)
          v-col(:class="$style.dividedColumn" :cols="$vuetify.breakpoint.xs ? 12 : 6")
            v-text-field(v-model="lastName" :rules="simpleRules" label="Nom" outlined required)
        v-text-field(v-model="username" :rules="simpleRules" label="Pseudo" outlined required)
        v-text-field(v-model="email" :rules="emailRules" label="E-mail" outlined required)
        v-text-field(v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" label="Mot de passe" outlined required)
        v-btn(:disabled="!valid" color="primary" @click="createUser") Je m'inscris
</template>

<script>
import Loader from "@/components/Loader.vue"

export default {
  name: "SignUp",
  components: {
    Loader
  },
  data: () => ({
    valid: true,
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    show1: false,
    simpleRules: [v => !!v || "Ce champ est requis"],
    emailRules: [
      v => !!v || "Une adresse e-mail est requis",
      v => /.+@.+\..+/.test(v) || "Votre addresse e-mail semble incorrecte"
    ],
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
    async createUser() {
      this.isLoading = true
      this.validate()
      const { name, lastName, email, password, username } = this
      // eslint-disable-next-line no-unused-vars
      const sendUserData = await this.$http
        .post("/user/signup", {
          name,
          lastName,
          email,
          password,
          username
        })
        .then(response => {
          console.error("its okkkk")
          console.log(response)
        })
        .catch(e => {
          console.log(e)
          this.isLoading = false
        })
    },
    getUser() {
      const { email, password } = this
      this.$store.dispatch("getAccountData", { email, password })
      setTimeout(() => {
        if (this.isLogged) {
          this.$router.push("/")
        } else {
          this.failLogIn = true
        }
      }, 3000)
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isUserLogged
    }
  }
}
</script>

<style lang="scss" module>
@import "@/scss/core/colors.scss";
.signUp {
  .loader {
    left: 50%;
  }

  h2 {
    position: relative;
    width: max-content;
    margin: 100px auto 80px;

    p {
      position: absolute;
      left: 0;
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
.dividedColumns {
  width: 100%;
  margin: 0;
  .dividedColumn:first-child {
    padding-right: 15px;
  }
}
.dividedColumn {
  padding: 0;
}
@media (max-width: 600px) {
  .form {
    width: 100% !important;
  }
  .dividedColumns {
    .dividedColumn:first-child {
      padding-right: 0;
    }
  }
}
</style>
