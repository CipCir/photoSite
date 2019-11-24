import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";
import fireOBJ from "firebase";

import router from "../router";

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
  state: {
    alertObj: {
      show: false
    },
    produse: [],
    cos: [],
    user: null,
    ShowUserPrompt: true
  },
  getters: {
    getCos(state) {
      return state.cos;
    },
    getProduse(state) {
      return state.produse;
    },
    getUser(state) {
      return state.user;
    },
    getAlert(state) {
      return state.alertObj;
    },
    getUserPrompt(state) {
      return state.ShowUserPrompt;
    }
  },
  mutations: {
    setAlert(state, payload) {
      state.alertObj = payload;
    },
    setUserPrompt(state, payload) {
      state.ShowUserPrompt = payload;
    },

    setUser(state, payload) {
      console.log("set user");
      firebase.database
        .ref("Users/" + payload.uid)
        .once("value", querySnapshot => {
          let resp = querySnapshot.val();

          let userObj = {
            id: payload.uid,
            email: payload.email,
            name: resp.name
          };
          state.user = userObj;
        });
      //bind cos updates
      firebase.database
        .ref("Users/" + payload.uid + "/cos")
        .on("value", querySnapshot => {
          state.cos = [];
          let cosDB = querySnapshot.val();
          for (let key in cosDB) {
            const prod = cosDB[key];
            state.cos.push(prod);
          }
        });
    },
    removeUser(state, payload) {
      state.user = null;
      // router.push("/");
    },
    updateProds(state, payload) {
      //
      state.produse = [];
      for (let key in payload) {
        const fam = payload[key];
        fam.ProdID = key;
        state.produse.push(fam);
      }
    },
    setCos(state, payload) {
      // state.cos.q = 1;
      if (state.cos.findIndex(elm => elm.ProdID == payload.ProdID) > -1) {
        // M.toast({ html: "Produsul e deja in cos" });
        state.alertObj.show = true;
        state.alertObj.type = "alert";
        state.alertObj.msg = "Produsul e deja in cos";
        return false;
      }
      const cart = state.cos;
      cart.push(payload);

      firebase.database
        .ref("Users/" + state.user.id + "/cos")
        .update(cart)
        .then(resp => {
          // M.toast({ html: "Produsul a fost adaugat" });
          state.alertObj.show = true;
          state.alertObj.type = "alert";
          state.alertObj.msg = "Produsul a fost adaugat";
        });
    }
  },
  actions: {
    autoSingIn({ commit }, payload) {
      console.log("autosign");
      commit("setUser", payload);
    },
    signUserIn({ commit }, payload) {
      fireOBJ
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(clbuser => {
          //check user permissions

          commit("setUser", clbuser.user);
        })
        .catch(error => {
          commit("setAlert", {
            show: true,
            type: "error",
            msg: error.message
          });

          console.log(error);
        });
    },
    signUserOut({ commit }) {
      fireOBJ
        .auth()
        .signOut()
        .then(() => {
          commit("removeUser");
          commit("setAlert", { show: false });
        });
    },
    CreateUser({ commit }, payload) {
      fireOBJ
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(clbuser => {
          //check user permissions
          let userObj = {
            id: clbuser.user.uid,
            email: clbuser.user.email,
            name: payload.name
          };

          firebase.database
            .ref("Users/" + clbuser.user.uid)
            .set({
              name: userObj.name,
              cos: []
            })
            .then(res => {
              console.log("sign user in");
              commit("setUser", clbuser.user);
              commit("setAlert", {});
            });
        })
        .catch(error => {
          commit("setAlert", {
            show: true,
            type: "error",
            msg: error.message
          });

          console.log(error);
        });
    },
    loadProds({ commit }) {
      firebase.database.ref("Albums").on("value", querySnapshot => {
        commit("updateProds", querySnapshot.val());
      });
    },
    updateProd({ commit }, payload) {
      payload.forEach(prod => {
        let prodId = prod.ProdID;
        let prodObj = {};
        prodObj.color = prod.color;
        prodObj.name = prod.name;
        prodObj.price = prod.price;

        firebase.database.ref("Albums/" + prodId + "/").update(prodObj);
      });
      router.push("/");
    },
    updateCos({ commit }, payload) {
      commit("setCos", payload);
    },
    updateAlert({ commit }, payload) {
      commit("setAlert", payload);
    }
  }
});
