<template>
  <div class="home">
    <h2>Admin page</h2>
    <div class="container">
      <div v-for="prod in produse" :key="prod.ProdID" class="row blue">
        <div class="col">
          Nume:
          <input type="text" class="myinput" v-model="prod.name" />
        </div>
        <div class="col">
          Culoare:
          <input type="text" class="myinput" v-model="prod.color" />
        </div>
        <div class="col">
          Pret:
          <input type="text" class="myinput" v-model="prod.price" />
        </div>
      </div>
    </div>
    <div class="btn" @click="updatePrices()">update</div>
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
    updatePrices() {
      this.$store.dispatch("updateProd", this.produse);
    }
  },
  computed: {
    produse: function() {
      return this.$store.getters.getProduse;
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
