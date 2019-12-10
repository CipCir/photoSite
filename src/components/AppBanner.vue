<template>
  <div>
    <v-app-bar
      elevation="2"
      app
      class="brown lighten-5"
      :elevate-on-scroll="true"
      extension-height="64"
    >
      <!-- <v-container class="fill-height">
      <v-row align="center">-->
      <v-toolbar-title>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/img/logo.png"
          transition="scale-transition"
          width="170"
        />
      </v-toolbar-title>
      <v-btn fab class="ml-3" small @click="ShowSearch = !ShowSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- cart -->
      <!-- registred User -->
      <div v-if="user">
        <v-menu
          :close-on-content-click="false"
          :min-width="$vuetify.breakpoint.xsOnly ? 264 : 340"
          :max-width="$vuetify.breakpoint.xsOnly ? '100%' : 540"
          bottom
          content-class="elevation-18 cart-popout"
          :left="$vuetify.breakpoint.mdAndUp"
          offset-y
          origin="top right"
          transition="scale-transition"
          width="100%"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn aria-label="Cart" fab small v-bind="attrs" v-on="on">
              <v-badge color="accent" left>
                <v-icon v-text="'mdi-cart'" />
                <span>{{Object.keys(cart).length}}</span>
              </v-badge>
            </v-btn>
          </template>
          <v-card flat>
            <v-list two-line>
              <v-list-item v-if="Object.keys(cart).length==0">
                <v-list-item-title class="text-center">No Products Found</v-list-item-title>
              </v-list-item>

              <v-list-item v-else v-for="(prod,pk) in cart" :key="pk">
                <v-row class="blue lighten-5 my-1">
                  <v-col cols="10">
                    Album ID : {{prod.AlbmID}}
                    <br />
                    Dimensiune: {{prod.dimensiune}}
                    <br />
                    Personalizari: {{prod.Personalizari}}
                  </v-col>
                  <v-col cols="2">
                    <v-hover v-slot:default="{ hover }">
                      <v-btn @click="RemoveCos(pk)" text icon :color="hover?'red':'grey'">
                        <v-icon v-text="'mdi-delete'" />
                      </v-btn>
                    </v-hover>
                  </v-col>
                </v-row>
                <!-- <v-icon right @click="RemoveCos(pk)">mdi-delete</v-icon> -->
              </v-list-item>
              <v-divider />
              <v-row justify="center">
                <v-btn>Finalizeaza comanda</v-btn>
              </v-row>
            </v-list>
          </v-card>
        </v-menu>
        <v-chip
          class="green lighten-3 ml-3 blue--text text--darken-1 d-none d-sm-inline-block"
          close-icon="mdi-logout"
        >
          <v-icon left>mdi-account-circle</v-icon>
          {{user.name}}
        </v-chip>
        <v-btn title="Delogare" text icon color="red darken-1" @click="SignOut()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <!-- User neautentificat-->
      <div v-else>
        <v-btn text small class="green--text" @click.stop="ShowUserPrompt = true;isLogin= true">
          <v-icon left>mdi-account</v-icon>
          <span class="d-none d-md-block">Autentificare</span>
        </v-btn>
        <v-btn
          text
          small
          class="blue--text d-none d-sm-inline"
          @click.stop="ShowUserPrompt = true;isLogin= false"
        >
          <v-icon left>mdi-account-plus</v-icon>
          <span class="d-none d-md-block">Inregistrare</span>
        </v-btn>

        <v-dialog v-model="ShowUserPrompt" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">
                <span v-text="isLogin ? infLogin : infInreg"></span>
              </span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-form v-model="validF" ref="LoginForm">
                  <v-row>
                    <v-col cols="12" v-if="!isLogin">
                      <v-text-field label="Nume*" required :rules="nameRules" v-model="uName"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="Email*" required :rules="emailRules" v-model="uEmail"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        :rules="paswordRules"
                        required
                        v-model="uPassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-container fluid>
                <v-row justify="center">
                  <v-col md="6">
                    <v-btn
                      x-large
                      width="100%"
                      dark
                      class="darken-1"
                      :color="isLogin?'green':'blue'"
                      v-text="isLogin ? infLogin : infInreg"
                      @click="AccountUser()"
                    ></v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <small v-text="isLogin ? infToInreg : infToLogin"></small>
                  <span
                    style="cursor:pointer"
                    class="text--darken-2 ml-2"
                    :class="isLogin?'blue--text':'green--text'"
                    @click="isLogin=!isLogin;ErrObj.hasErr=false"
                    v-text="isLogin ? infInreg : infLogin"
                  ></span>
                </v-row>
                <v-row v-if="ErrObj.hasErr">
                  <v-col cols="12">
                    <v-alert type="error">{{ErrObj.msg}}</v-alert>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- rand doi -->
      <template v-slot:extension>
        <v-tabs v-if="ShowSearch" background-color="primary" centered hide-slider>
          <v-container class="pa-0 pr-4 white">
            <v-autocomplete
              ref="search"
              append-icon
              append-outer-icon="$vuetify.close"
              background-color="white"
              flat
              height="64"
              hide-details
              hide-no-data
              label="Search for a product"
              light
              solo
              text-color="primary"
            >
              <template v-slot:append-outer>
                <v-icon class="mt-2" @click="isSearching = false">$vuetify.close</v-icon>
              </template>
            </v-autocomplete>
          </v-container>
        </v-tabs>
        <v-row v-else-if="$vuetify.breakpoint.smAndDown">
          <v-app-bar-nav-icon
            aria-label="Open Navigation Drawer"
            class="mr-auto ml-3 align-self-center"
            @click="drawer = !drawer"
          />

          <v-btn v-for="flw in followList" :key="flw.icon" text icon :color="flw.color">
            <v-icon v-text="flw.icon" />
          </v-btn>
        </v-row>

        <v-row v-else>
          <v-tabs align-with-title color="amber darken-3" background-color="transparent">
            <v-tab v-for="(item,i) in navList" :key="i" :to="item.to">{{item.lbl}}</v-tab>

            <v-spacer></v-spacer>
            <div>
              <v-hover v-for="flw in followList" :key="flw.icon" v-slot:default="{ hover }">
                <v-btn text icon :color="hover?flw.color:'grey'">
                  <v-icon v-text="flw.icon" />
                </v-btn>
              </v-hover>
            </div>
          </v-tabs>
        </v-row>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" left color="primary" fixed temporary width="280">
      <v-list nav>
        <v-list-item>
          <v-spacer />

          <v-list-item-action class="mr-n2">
            <v-btn
              aria-label="Close Navigation Drawer"
              color="white"
              depressed
              light
              min-width="0"
              width="40"
              @click="drawer = false"
            >
              <v-icon>$vuetify.close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          exact
          class="brown lighten-3"
          v-for="(item,i) in navList"
          :key="i"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon v-text="'mdi-page-next'" />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-capitalize" v-text="item.lbl" />
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item exact class="blue">
          <v-list-item-icon>
            <v-icon v-text="'mdi-cart'" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize" v-text="'Cutii'" />
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import fireOBJ from "firebase/app";
import "firebase/auth";
export default {
  data: () => ({
    AutoSign: true,
    drawer: false,
    validF: false,
    ShowUserPrompt: false,
    isLogin: true,
    infLogin: "Intra in cont",
    infInreg: "Creeaza cont",
    infToLogin: "Ai deja cont?",
    infToInreg: "Nu ai cont?",
    ErrObj: { hasErr: false, msg: null },

    uName: "",
    uEmail: "",
    uPassword: "",
    nameRules: [v => !!v || "Numele este obligatoriu"],
    emailRules: [
      v => !!v || "E-mail este obligatoriu",
      v => /.+@.+/.test(v) || "Adresa de email nu este valida"
    ],
    paswordRules: [
      v => !!v || "Parola este obligatorie",
      v => v.length >= 6 || "Parola trebuie sa contina minim 6 caractere"
    ],
    ShowLogin: false,
    ShowSearch: false,
    navList: [
      { lbl: "Albume", to: "/" },
      // { lbl: "Materiale", to: "/materiale" },
      { lbl: "Accesorii", to: "/accesorii" },
      { lbl: "Contact", to: "/about" },
      { lbl: "Admin", to: "/admin" }
    ],
    followList: [
      { icon: "mdi-facebook-box", color: "indigo" },
      { icon: "mdi-twitter", color: "blue lighten-3" },
      { icon: "mdi-youtube", color: "red" }
    ]
  }),
  created() {
    let vueOBJ = this;
    fireOBJ.auth().onAuthStateChanged(user => {
      if (user && vueOBJ.AutoSign) {
        console.log("din created");
        vueOBJ.$store.dispatch("autoSingIn", user);
        vueOBJ.AutoSign = false;
      }
    });
  },
  methods: {
    RemoveCos(pID) {
      this.$store.dispatch("removeDinCos", pID);
    },
    AccountUser() {
      if (this.$refs.LoginForm.validate()) {
        if (this.isLogin) {
          //validare

          this.$store.dispatch("signUserIn", {
            email: this.uEmail,
            password: this.uPassword
          });
        } else {
          this.$store.dispatch("CreateUser", {
            email: this.uEmail,
            password: this.uPassword,
            name: this.uName
          });
        }
      }
    },
    SignOut() {
      console.log("signedout");
      this.$store.dispatch("signUserOut");
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    cart() {
      return this.$store.getters.getCos;
    }
  }
};
</script>