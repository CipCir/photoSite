<template>
  <div class="home">
    <h2>Albume foto</h2>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="(albmCat,akey) in albume" :key="albmCat.ProdID" cols="12">
          <v-card outlined max-width="100%">
            <v-card-title v-text="albmCat.A_lbl"></v-card-title>
            <v-card-text class="pb-3 pt-3">
              <!-- colectii -->
              <v-row>
                <v-col v-for="(colectie,ckey) in albmCat.Colectii" :key="colectie.A_lbl" cols="12">
                  <v-card class="amber lighten-5">
                    <v-card-title>{{colectie.A_lbl}}</v-card-title>
                    <!-- albume -->
                    <v-card-text>
                      <v-row justify="space-around">
                        <v-col
                          v-for="(album,k) in colectie.Albume"
                          :key="album.A_lbl"
                          cols="12"
                          md="4"
                        >
                          <v-card
                            @click="$router.push('/colectii'+'?aid='+akey+'&cid='+ckey+'&sel='+k)"
                          >
                            <div class="subtitle-1 mb-1 text-center">{{album.A_lbl}}</div>
                            <v-img max-height="150px" contain :src="'/img/albums/'+k+'/1.jpg'"></v-img>
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
