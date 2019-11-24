<template>
  <v-app>
    <appBanner />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-dialog v-model="alert.show" width="500">
      <v-card>
        <v-card-title>{{alert.type}}</v-card-title>
        <v-card-text>{{alert.msg}}</v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" text @click="CloseAlert()">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import appBanner from "./components/AppBanner";
import fireOBJ from "firebase";
export default {
  name: "App",

  components: {
    appBanner
  },

  methods: {
    CloseAlert() {
      this.$store.dispatch("updateAlert", { show: false });
    }
  },
  computed: {
    alert() {
      return this.$store.getters.getAlert;
    },
    cos() {
      return this.$store.getters.getCos;
    }
  }
};
</script>
