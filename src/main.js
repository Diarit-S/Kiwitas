import Vue from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import axiosSetup from "@/utils/axios-setup"
import "@/scss/styles.scss"
import { handleError } from "./utils/errorHandle"

Vue.config.errorHandler = handleError

axiosSetup.initSetup()

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
