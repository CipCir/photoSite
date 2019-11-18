<template>
  <div id="app">
    <header id="main-app-bar" class="row">
      <div id="toolbarContent" class="col m10">
        <router-link class="tlb_itm" to="/">Acasa</router-link>
        <router-link class="tlb_itm" to="/about">Contact</router-link>
        <router-link class="tlb_itm" to="/admin">ADMIN</router-link>
      </div>
      <div id="account" class="tlb_itm" @click="UserClick()">
        <i class="fas fa-user-circle"></i>
        <span v-if="user==null" class="clickable">Logare</span>
        <span title="sign out" v-if="user!=null">{{user.name}}</span>
      </div>

      <router-link
        style="color:#2671a6;margin-right:5px"
        v-if="user"
        class="clickable tlb_itm"
        :to="{name:'cos',params:{uid:user.id}}"
      >
        <i class="fas fa-shopping-cart"></i>
        {{cos.length}}
      </router-link>
    </header>

    <router-view style="margin-top:50px;" class="container" />

    <modal v-if="modal.show" :ModalContent="modal.content" />
  </div>
</template>
<script>
import modal from "./components/Modal";
import fireOBJ from "firebase";
export default {
  name: "app",
  components: { modal },
  data() {
    return {
      AutoSign: true
    };
  },
  created() {
    fireOBJ.auth().onAuthStateChanged(user => {
      if (user && this.AutoSign) {
        console.log("din created");
        this.$store.dispatch("autoSingIn", user);
        this.AutoSign = false;
      }
    });
  },
  methods: {
    UserClick() {
      if (this.user) {
        let conf = confirm("Sigur te deloghezi?");
        if (conf) {
          this.SignOut();
        }
      } else {
        this.ShowModal();
      }
    },
    ShowModal() {
      this.$store.dispatch("updateModal", { show: true, content: 1 });
    },
    SignOut() {
      console.log("signedout");
      this.$store.dispatch("signUserOut");
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    },
    modal() {
      return this.$store.getters.getModal;
    },
    cos() {
      return this.$store.getters.getCos;
    }
  }
};
</script>
<style>
.clickable {
  cursor: pointer;
}
#app {
  font-family: "Roboto,sans-serif";
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
#main-app-bar {
  background-color: #f5ede2;
  border-color: #003b63 !important;
  color: black;
  height: 50px;
  margin-top: 0px;
  left: 0px;
  right: 0px;
  top: 0;
  position: fixed;
  z-index: 5;
  max-width: 100%;
  display: block;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}
#toolbarContent {
  display: flex;

  align-items: center;
  justify-content: center;
}
.tlb_itm {
  margin: 0 5px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.tlb_itm:hover {
  background: #e2dacf;
}
#account {
  text-align: right;
}
#account > span {
  margin-left: 5px;
}
</style>