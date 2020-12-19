<template>
  <li class="favorite-element" ref="elem">
    <div>
      <a :href="fav.url">{{ fav.name }}</a>
      <button @click="onClickRemove(fav.id)">Löschen</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "Favorite",
  props: {
    fav: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
    };
  },
  methods: {
    updateBoundingBox() {
      const rect = this.$refs.elem.getBoundingClientRect();
      console.log(rect);
    },
    onClickRemove(favoriteId) {
      this.$store.commit("removeFav", favoriteId);
    },
  },
  mounted() {
    this.updateBoundingBox();
  },
};
</script>

<style lang="stylus" scoped></style>
