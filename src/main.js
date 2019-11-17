import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created: function() {
    this.$store.dispatch("loadProds");
  },
  render: h => h(App)
}).$mount("#app");
