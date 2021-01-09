<template>
  <div></div>
</template>
<script>
export default {
  name: "HalfFavourite",
  props: {
    FavIndex: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      xMin: 0, //getBoundingClientRect.x/getBoundingClient.left
      xMax: 0, //.right
      yMin: 0, //.y/.top
      yMax: 0, //.bottom
    };
  },
  methods: {
    updateBoundingBox() {},
  },
  mounted() {
    this.updateBoundingBox();
  },
  // highlightFavs(){
  //   //const middle = elem.getBoundingClientRect().left + (2 * elem.getBoundingClientRect().width)
  //   if(this.currentX < innerWidth/2){

  //   }
  // },
};
</script>

<style></style>
