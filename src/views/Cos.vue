<template>
  <div class="home">
    <h2>Cos user</h2>
    <div>
      <div class="row">
        <div class="col s12 m4" v-for="prod in produse" :key="prod.ProdID">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Nume: {{ prod.name }}</span>
              <p>Culoare: {{ prod.color }}</p>
              <p>Pret: {{ prod.price }}</p>
            </div>
            <div class="card-action">
              <div class="btn red darken-1" @click="StergeCos(prod)">Sterge</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "../store/firebase";

export default {
  name: "cos",
  data() {
    return {
      cos: []
    };
  },
  // created() {
  //   firebase.database
  //     .ref("Users/" + this.user.id + "/cos")
  //     .on("value", querySnapshot => {
  //       this.cos = querySnapshot.val();
  //     });
  // },
  methods: {
    StergeCos(prod) {
      let pIndx = this.produse.findIndex(elm => elm.ProdID == prod.ProdID);
      this.produse.splice(pIndx, 1);
      firebase.database.ref("Users/" + this.user.id + "/cos").set(this.produse);
    }
  },
  computed: {
    produse: function() {
      return this.$store.getters.getCos;
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
