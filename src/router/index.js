import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "Homepage",
    component: () => import("@/views/HomePage/Homepage.vue")
  },
  {
    path: "/courses",
    name: "Courses",
    component: () => import("@/views/Courses.vue")
  },
  {
    path: "/course/:id",
    name: "Course",
    component: () => import("@/views/Course/Course.vue")
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: () => import("@/views/Quizz/Quizz.vue")
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("@/views/SignIn.vue")
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue")
  },
  {
    path: "/profil",
    name: "Account",
    component: () => import("@/views/Account/Account.vue")
  },
  {
    path: "/challenges",
    name: "Challenge",
    component: () => import("@/views/Challenge/Challenge.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 30 }
      }
    }
  },
  routes
})

export default router
