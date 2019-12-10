import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";
import fireOBJ from "firebase/app";
import "firebase/auth";
import router from "../router";

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
  state: {
    alertObj: {
      show: false
    },
    albume: {},
    materiale: {},
    cos: {},
    user: null,
    ShowUserPrompt: false
  },
  getters: {
    getCos(state) {
      return state.cos;
    },
    getAlbume(state) {
      return state.albume;
    },
    getMateriale(state) {
      return state.materiale;
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

      console.log("read user from DB");
      firebase.database
        .ref("Users/" + payload.uid)
        .once("value", querySnapshot => {
          let resp = querySnapshot.val();

          let userObj = {
            id: payload.uid,
            email: payload.email,
            name: resp.name
          };
          console.log("set user in store");
          state.user = userObj;
          //bind cos updates
          firebase.database
            .ref("Users/" + payload.uid + "/cos")
            .on("value", querySnapshot => {
              if (querySnapshot.val() != null) {
                state.cos = querySnapshot.val();
              } else {
                state.cos = {};
              }
            });
        });
    },
    removeUser(state, payload) {
      state.user = null;
      // router.push("/");
    },
    updateAlbums(state, payload) {
      //
      state.albume = payload;
      // for (let key in payload) {
      //   const albObj = payload[key];
      //   albObj.ProdID = key;
      //   state.albume.push(albObj);
      // }
    },
    updateMateriale(state, payload) {
      state.materiale = payload;
      // for (let key in payload) {
      //   const albObj = payload[key];
      //   albObj.ID = key;
      //   state.materiale.push(albObj);
      // }
    },
    setCos(state, payload) {
      // state.cos.q = 1;
      // if (state.cos.findIndex(elm => elm.ProdID == payload.ProdID) > -1) {
      // if (state.cos.hasOwnProperty(payload.AlbmID)) {
      //   // M.toast({ html: "Produsul e deja in cos" });
      //   state.alertObj.show = true;
      //   state.alertObj.type = "alert";
      //   state.alertObj.msg = "Produsul e deja in cos";
      //   return false;
      // }

      firebase.database
        .ref("Users/" + state.user.id + "/cos")
        .push({
          AlbmID: payload.AlbmID,
          dimensiune: payload.AlbmDim,
          AlbmCat: payload.AlbmCat,
          ColectionID: payload.ColID,
          Personalizari: payload.Personalizari
        })
        .then(resp => {
          // M.toast({ html: "Produsul a fost adaugat" });
          state.alertObj.show = true;
          state.alertObj.type = "alert";
          state.alertObj.msg = "Produsul a fost adaugat";
        });
    },
    remvCos(state, payload) {
      firebase.database
        .ref("Users/" + state.user.id + "/cos/" + payload)
        .remove();
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
    ShowUserPrompt({ commit }, payload) {
      commit("setUserPrompt", payload);
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
          console.log("Create user in DB");
          firebase.database
            .ref("Users/" + clbuser.user.uid)
            .set({
              name: userObj.name,
              cos: {}
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
    loadDB({ commit }) {
      firebase.database.ref("AlbumeCat").on("value", querySnapshot => {
        commit("updateAlbums", querySnapshot.val());
      });
      firebase.database.ref("Materiale").on("value", querySnapshot => {
        commit("updateMateriale", querySnapshot.val());
      });
    },
    updateProd({ commit }, payload) {
      // payload.forEach(prod => {
      //   let prodId = prod.ProdID;
      //   let prodObj = {};
      //   prodObj.color = prod.color;
      //   prodObj.name = prod.name;
      //   prodObj.price = prod.price;
      //   firebase.database.ref("Albums/" + prodId + "/").update(prodObj);
      // });
      // router.push("/");
    },
    updateCos({ commit }, payload) {
      console.log(payload);
      commit("setCos", payload);
    },
    removeDinCos({ commit }, payload) {
      commit("remvCos", payload);
    },
    updateAlert({ commit }, payload) {
      commit("setAlert", payload);
    }
  }
});
