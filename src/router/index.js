import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Cos from "../views/Cos.vue";
import AuthGuard from "./auth-guard";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue")
  },
  {
    path: "/Materiale",
    name: "Materiale",
    component: () => import("../views/Materiale.vue")
  },
  {
    path: "/colectii",
    name: "Colectii",
    component: () => import("../views/Colectii.vue")
  },
  {
    path: "/Accesorii",
    name: "Accesorii",
    component: () => import("../views/Accesorii.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
    path: "/cutii",
    name: "cos",
    component: Cos,
    beforeEnter: AuthGuard.guardUser
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  // ...
  next();
});
export default router;
