<template>
  <div>
    Materiale
    {{$route.query.mID}}
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.query);
  }
};
</script>