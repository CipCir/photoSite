<template>
  <div class="home">
    <h2>Albume foto</h2>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="albmCat in albume" :key="albmCat.ProdID" cols="12">
          <v-card outlined max-width="100%">
            <v-card-title v-text="albmCat['0_lbl']"></v-card-title>
            <v-card-text class="pb-3 pt-3">
              <!-- colectii -->
              <v-row>
                <v-col v-for="colectie in albmCat.Colectii" :key="colectie['0_lbl']" cols="12">
                  <v-card class="amber lighten-4">
                    <v-card-title>{{colectie['0_lbl']}}</v-card-title>
                    <!-- albume -->
                    <v-card-text>
                      <v-row>
                        <v-col v-for="album in colectie.Albume" :key="album['0_lbl']" cols="6">
                          <v-card>
                            <v-list-item three-line>
                              <v-list-item-content>
                                <v-list-item-title class="headline mb-1">{{album['0_lbl']}}</v-list-item-title>
                                <v-list-item-subtitle
                                  v-for="material in album.materiale"
                                  :key="material.cod"
                                >{{materiale[material]['0_lbl']}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
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
    albume: function() {
      return this.$store.getters.getAlbume;
    },
    materiale: function() {
      return this.$store.getters.getMateriale;
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
