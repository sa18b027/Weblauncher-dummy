<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "HalfFavourite",
  props: {
    FavIndex: {
      type: Array,
      required: true,
    },
    x1: { type: Number },
    y1: { type: Number },
    x2: { type: Number },
    y2: { type: Number },
  },
  data() {
    return {
      xMin: 0, //getBoundingClientRect.x/getBoundingClient.left
      xMax: 0, //.right
      yMin: 0, //.y/.top
      yMax: 0, //.bottom
    };
  },
  computed: {
    ...mapGetters(["getCurrentCoor"]),
  },
  watch: {
    FavIndex(arrIndex) {
      //console.log(newValue);
      if (arrIndex.length > 0) {
        let index = arrIndex[0] % 4;
        this.xMin = this.x1 + (index * (this.x2 - this.x1)) / 4;
        index = 0;
        if (arrIndex[0] > 3) {
          index = 1;
        }
        this.yMin = this.y1 + (index * (this.y2 - this.y1)) / 2;
        let lastIndex = arrIndex.length - 1;

        index = (arrIndex[lastIndex] % 4) + 1;
        if (arrIndex.length == 3) {
          // shape is not rectangle
          index++;
        }
        this.xMax = this.x1 + (index * (this.x2 - this.x1)) / 4;
        index = 1;
        if (arrIndex[lastIndex] > 3) {
          index = 2;
        }
        this.yMax = this.y1 + (index * (this.y2 - this.y1)) / 2;
      } else {
        this.xMin = 0;
        this.xMax = 0;
        this.yMin = 0;
        this.yMax = 0;
      }
      if (
        this.getCurrentCoor.x < this.xMax &&
        this.getCurrentCoor.x > this.xMin &&
        this.getCurrentCoor.y < this.yMax &&
        this.getCurrentCoor.y > this.yMin
      ) {
        this.setHighlighted(arrIndex);
        this.$emit("highlighted", arrIndex);
      }
    },
  },
  methods: {
    ...mapMutations(["setHighlighted"]),
  },
  mounted() {
    console.log(this.FavIndex);
  },
};
</script>

<style></style>
