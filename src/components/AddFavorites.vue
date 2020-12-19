<template>
  <button @click="onClick" class="">Add Favorite</button>
</template>

<script>
export default {
  name: "AddFavorites",
  methods: {
    onClick() {
      this.$store.commit("showModal");
    },
  },
};
</script>

<style lang="stylus" scoped>
// button
//     appearance unset
//     background-color unset
//     border unset
</style>
