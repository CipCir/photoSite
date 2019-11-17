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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
    path: "/cos/:uid",
    name: "cos",
    component: Cos,
    beforeEnter: AuthGuard.guardUser
  }
];

const router = new VueRouter({
  routes
});

export default router;
