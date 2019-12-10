<template>
  <div>
    <v-breadcrumbs class="pl-0" :items="items" divider=">"></v-breadcrumbs>
    {{colectie.A_lbl}}
    <v-row justify="center" class="amber lighten-5 pb-2">
      <v-col v-for="(album,k) in colectie.Albume" :key="album.A_lbl" cols="12" md="3">
        <v-hover v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            @click="SelectieAlbum(album,k)"
            :class="{'selectedAlbm':SelID==k}"
          >
            <v-card-title>
              <div class="subtitle-2 mb-1 text-center">{{album.A_lbl}}</div>
            </v-card-title>

            <v-img contain :src="'/img/albums/'+k+'/1.jpg'"></v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <!-- carusel -->
    <div v-if="SelectedAlbum">
      <v-row class="mt-3 indigo lighten-5" justify="center" align="center">
        <v-col cols="12" sm="8" xs="12">
          <!-- <v-carousel height="auto">
            <v-carousel-item v-for="imgNr in SelectedAlbum.imgs" :key="imgNr">
              <span style="color:#e8eaf6">{{imgNr}}</span>
              <v-img contain max-height="400px" :src="'/img/albums/'+SelID+'/'+imgNr+'.jpg'"></v-img>
            </v-carousel-item>
          </v-carousel>-->
          <v-card flat tile>
            <v-window v-model="CaruselIndx">
              <v-window-item v-for="n in SelectedAlbum.imgs" :key="`card-${n}`">
                <v-card color="transparent" height="auto">
                  <v-row class="fill-height pt-1" align="center" justify="center">
                    <v-img
                      contain
                      aspect-ratio="1"
                      :max-height="$vuetify.breakpoint.xsOnly ? 300 : 300"
                      :max-width="$vuetify.breakpoint.xsOnly ? 300 : 500"
                      :src="'/img/albums/'+SelID+'/'+n+'.jpg'"
                    ></v-img>
                  </v-row>
                </v-card>
              </v-window-item>
            </v-window>

            <v-card-actions class="justify-space-between">
              <v-btn text @click="prev('CaruselIndx',SelectedAlbum.imgs)">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-item-group v-model="CaruselIndx" class="text-center" mandatory>
                <v-item
                  v-for="n in SelectedAlbum.imgs"
                  :key="`btn-${n}`"
                  v-slot:default="{ active, toggle }"
                >
                  <v-btn :input-value="active" icon @click="toggle">
                    <v-icon>mdi-record</v-icon>
                  </v-btn>
                </v-item>
              </v-item-group>
              <v-btn text @click="next('CaruselIndx',SelectedAlbum.imgs)">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="4" xs="12">
          <h3>Zona Poveste album</h3>
          <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis optio placeat ipsam eos alias possimus facere laboriosam nihil deleniti, ut animi cum reprehenderit vitae, ipsa doloremque non, maiores qui labore.</div>
        </v-col>
      </v-row>
      <!-- material -->
      <v-row class="blue mt-2 lighten-5">
        <v-container>
          <div>Material</div>
        </v-container>
        <v-col
          cols="12"
          sm="4"
          md="2"
          class="d-flex child-flex"
          v-for="mat in materiale[SelectedAlbum.materiale.cod].imgs"
          :key="mat"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                flat
                tile
                elevation="2"
                class="pa-2"
                @click="overlay=true,MateriallIndx=mat-1"
              >
                <v-img
                  contain
                  aspect-ratio="1"
                  :src="'/img/materiale/'+SelectedAlbum.materiale.cod+'/'+mat+'.jpg'"
                ></v-img>
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn>Click pentru marire</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <!-- background loader -->
      <!-- <div style="display:none">
        <img
          v-for="mat in materiale[SelectedAlbum.materiale.cod].imgs"
          :key="mat"
          :src="'/img/materiale/'+SelectedAlbum.materiale.cod+'/'+mat+'.jpg'"
        />
      </div>-->
      <!-- stepper -->
      <v-row class="teal lighten-5">
        <v-col cols="12">
          <v-expansion-panels popout v-model="Earr">
            <!-- <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4">Material</v-col>
                    <v-col cols="8" class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open" key="0">Materiale disponibile</span>
                        <span v-else key="1">{{ Pers.material }}</span>
                      </v-fade-transition>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col
                    cols="4"
                    class="d-flex child-flex"
                    v-for="mat in SelectedAlbum.materiale"
                    :key="mat"
                  >
                    <v-card
                      flat
                      tile
                      class="d-flex"
                      @click="Pers.material=mat"
                      max-width="150px"
                      max-height="150px"
                    >
                      <v-img
                        :src="'/img/materiale/'+mat+'/1.jpg'"
                        aspect-ratio="1"
                        contain
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-btn @click="Earr=1;" text>Urmatorul pas</v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>-->

            <v-expansion-panel>
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">Dimensiune</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open" key="0">Alege dimensiune</span>
                      <span v-else key="1">{{ Pers.dimensiune }}</span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                  <v-spacer></v-spacer>
                  <v-col cols="5">
                    <v-select
                      background-color="blue lighten-2"
                      v-model="Pers.dimensiune"
                      :items="dimensiuni"
                      chips
                      flat
                      solo
                    ></v-select>
                  </v-col>

                  <v-divider vertical class="mx-4"></v-divider>

                  <v-col cols="3">Alte informatii aditionale</v-col>
                </v-row>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="Earr=2" text>Urmatorul pas</v-btn>
                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">Personalizari</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open">
                        <span v-if="Pers.opt.length>0">{{Pers.opt}}</span>
                        <span v-else>Nepersonalizat</span>
                      </span>
                      <v-row v-else no-gutters style="width: 100%">
                        <span v-if="Pers.opt.length>0">{{Pers.opt}}</span>
                        <span v-else>Optiuni disponibile</span>
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row justify="space-around" no-gutters>
                  <v-switch v-model="Pers.opt" label="Colturi rotunjite" value="Colturi rotunjite"></v-switch>
                  <v-switch v-model="Pers.opt" label="Coltar metalic" value="Coltar metalic"></v-switch>
                  <v-switch v-model="Pers.opt" label="Cotor cu nervuri" value="Cotor cu nervuri"></v-switch>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6">
          <v-btn style="width:100%" class="green" @click="Comanda()">Comanda</v-btn>
        </v-col>
        <v-snackbar v-model="snackbar" right>
          Trebuie sa te loghezi
          <v-btn color="indigo" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-row>
    </div>
    <v-fade-transition mode="out-in">
      <v-overlay v-if="overlay" fixed opacity=".9">
        <v-btn color="transparent" depressed fab fixed large right top @click="overlay = false">
          <v-icon large>mdi-close</v-icon>
        </v-btn>
        <!-- <v-card flat title v-for="mat in SelectedAlbum.materiale" :key="mat">
          <v-card-title>Descriere</v-card-title>
          <v-card-text>
            <v-img :src="'/img/materiale/'+mat+'/1.jpg'" width="800" max-width="90vw" />
          </v-card-text>
        </v-card>-->
        <v-card flat tile width="800" max-width="90vw">
          <v-window v-model="MateriallIndx">
            <v-window-item
              v-for="n in materiale[SelectedAlbum.materiale.cod].imgs"
              :key="`card-${n}`"
            >
              <v-card color="transparent" height="auto">
                <v-img
                  contain
                  aspect-ratio="1"
                  :src="'/img/materiale/'+SelectedAlbum.materiale.cod+'/'+n+'.jpg'"
                ></v-img>
              </v-card>
            </v-window-item>
          </v-window>

          <v-card-actions class="justify-space-between">
            <v-btn text @click="prev('MateriallIndx', materiale[SelectedAlbum.materiale.cod].imgs)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="MateriallIndx" class="text-center" mandatory>
              <v-item
                v-for="n in  materiale[SelectedAlbum.materiale.cod].imgs"
                :key="`btn-${n}`"
                v-slot:default="{ active, toggle }"
              >
                <v-btn :input-value="active" icon @click="toggle">
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </v-item>
            </v-item-group>
            <v-btn text @click="next('MateriallIndx', materiale[SelectedAlbum.materiale.cod].imgs)">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- <v-carousel height="auto">
          <v-carousel-item
            v-for="mat in materiale[SelectedAlbum.materiale.cod].imgs"
            :key="mat"
            min-height="200px"
          >
            <span>{{mat}}</span>
            <v-img
              :src="'/img/materiale/'+SelectedAlbum.materiale.cod+'/'+mat+'.jpg'"
              width="800"
              max-width="90vw"
            />
          </v-carousel-item>
        </v-carousel>-->
      </v-overlay>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: "Colectii",
  data: () => ({
    overlay: false,
    snackbar: false,
    length: 3,
    CaruselIndx: 0,
    MateriallIndx: 0,
    Earr: 0,
    Pers: {
      material: "",
      dimensiune: null,
      opt: []
    },
    dimensiuni: ["30 x 40", "25 x 35", "25 x 30"],

    items: [
      {
        text: "Albume",
        disabled: false,
        to: "/"
      },
      {
        text: "Colectii",
        disabled: true
      }
    ],
    SelectedAlbum: null,
    SelID: null,
    SelColID: null,
    SelAlbumCatID: null
  }),
  mounted() {
    window.scrollTo(0, 0);
    this.SelID = this.$route.query.sel;
    this.SelColID = this.$route.query.cid;
    this.SelAlbumCatID = this.$route.query.aid;
    this.SelectedAlbum = this.colectie.Albume[this.SelID];
  },
  methods: {
    next(variable, maxNr) {
      this[variable] = this[variable] + 1 === maxNr ? 0 : this[variable] + 1;
    },
    prev(variable, maxNr) {
      variable = variable - 1 < 0 ? maxNr - 1 : variable - 1;
    },
    SelectieAlbum(album, ID) {
      this.CaruselIndx = 0;
      this.SelectedAlbum = album;
      this.SelID = ID;
      this.Pers.dimensiune = "";
      this.Pers.opt = [];
    },
    Comanda() {
      if (this.user) {
        this.$store.dispatch("updateCos", {
          AlbmCat: this.SelAlbumCatID,
          ColID: this.SelColID,
          AlbmID: this.SelID,
          AlbmDim: this.Pers.dimensiune,
          Personalizari: this.Pers.opt
        });
      } else {
        this.snackbar = true;
      }
    }
  },
  computed: {
    colectie() {
      return this.$store.getters.getAlbume[this.$route.query.aid].Colectii[
        this.$route.query.cid
      ];
    },
    user: function() {
      return this.$store.getters.getUser;
    },
    materiale() {
      return this.$store.getters.getMateriale;
    }
  }
};
</script>
<style >
.v-application a {
  color: #ff8f00;
}
.selectedAlbm {
  border: solid #e3955e !important;
}
</style>