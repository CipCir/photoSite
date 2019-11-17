<template>
  <div id="ModBackCont" @click.self="CloseModal()">
    <div id="vueModMainCont">
      <div id="vueModHeader">
        <span class="close-button">
          <i class="fa fa-times-circle float-right" aria-hidden="true" @click="CloseModal()"></i>
        </span>
      </div>
      <!-- Inregistrare -->
      <div id="ModContent" v-if="ModalContent==1">
        <div class="container">
          <div class="row">
            <div class="col s12 m8 offset-m2">
              <h3>Inregistrare</h3>
              <form>
                <div class="input-field">
                  <i class="material-icons prefix">account_circle</i>
                  <input type="text" id="Nume" v-model="name" />
                  <label for="Nume">Nume</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">email</i>
                  <input type="text" id="email" v-model="email" />
                  <label for="email">Email</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">lock</i>
                  <input type="password" id="password" v-model="password" />
                  <label for="password">Parola</label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="vueModFooter">
          <div class="btn blue" @click="CreateUser()">Creare cont</div>
          <div class>sau</div>
          <div class="btn green" @click="UpdateModal(2)">Am deja cont</div>
        </div>
      </div>
      <!-- login -->
      <div id="ModContent" v-if="ModalContent==2">
        <div class="container">
          <div class="row">
            <div class="col s12 m8 offset-m2">
              <h3>Login</h3>
              <form>
                <div class="input-field">
                  <i class="material-icons prefix">email</i>
                  <input type="text" id="email" v-model="email" />
                  <label for="email">Email</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">lock</i>
                  <input type="password" id="password" v-model="password" />
                  <label for="password">Parola</label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="vueModFooter">
          <div class="btn blue" @click="LoginUser()">Autentificare</div>
          <div class>sau</div>
          <div class="btn green" @click="UpdateModal(1)">Creare cont</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "modal",
  props: {
    ModalContent: Number
  },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },

  methods: {
    CreateUser() {
      this.$store.dispatch("CreateUser", {
        email: this.email,
        password: this.password,
        name: this.name
      });
    },
    UpdateModal(val) {
      this.$store.dispatch("updateModal", { show: true, content: val });
    },
    LoginUser() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    CloseModal() {
      this.$store.dispatch("updateModal", { show: false, content: 1 });
    }
  }
};
</script>
<style  scoped>
#ModBackCont {
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.7490196078431373);
  position: fixed;
  z-index: 9999999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#vueModHeader {
  display: flex;
  align-items: flex-end;
  flex-flow: column;
}
#vueModMainCont {
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 90%;
  width: 80%;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #dadada;
  border-radius: 0.25em;
  padding: 1em;
  box-shadow: 0 0 75px rgba(0, 0, 0, 0.35);
  background-color: #fff;
  z-index: 100001;
  margin-right: auto;
  margin-left: auto;
  padding-left: 3px;
  padding-right: 3px;
  min-width: 300px;
}
.close-button {
  /* display: block;
  width: 40px;
  height: 40px;
  z-index: 10000; */
  margin-right: 5px;
  cursor: pointer;
}
.close-button i {
  top: 0px !important;
  padding-top: unset !important;
  font-size: 30px;
  color: #666 !important;
}
#vueModFooter {
  display: flex;
  justify-content: center;
}
#vueModFooter > div {
  margin: 0 5px;
}
</style>