<template>
  <div class="home">
    <h2>Pagina principala</h2>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="prod in produse" :key="prod.ProdID" cols="12" sm="6" md="4">
          <v-card outlined max-width="100%">
            <v-card-title v-text="prod.name"></v-card-title>
            <v-card-text class="pb-5 pt-3">
              <p>Culoare: {{ prod.color }}</p>
              <p>Pret: {{ prod.price }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    AddInCos(prod) {
      if (this.user == null) {
        this.$store.dispatch("updateAlert", {
          show: true,
          msg: "Produsul deja exista"
        });
      } else {
        this.$store.dispatch("updateCos", prod);
      }
    }
  },
  computed: {
    produse: function() {
      return this.$store.getters.getProduse;
    },
    user: function() {
      return this.$store.getters.getUser;
    }
  }
};
</script>

<style scoped>
.myinput {
  width: 100px !important;
  background: #89eaea !important;
  height: unset !important;
  padding: 5px !important;
}
</style>
