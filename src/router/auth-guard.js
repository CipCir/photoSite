import { store } from "../store/store";

let isLoggedin = (to, from, next) => {
  if (store.getters.getUser) {
    next();
  } else {
    next("/login");
  }
};

export default {
  guardUser: isLoggedin
};
