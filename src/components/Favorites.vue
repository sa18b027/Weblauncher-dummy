<template>
  <div>
    <div>{{ getCurrentCoor }}</div>
    <ul ref="parent" style="background-color: blue !important">
      <Favorite
        v-for="(favorite, index) in favorites"
        :key="index"
        :highlighted="isHighlighted(index)"
        :fav="favorite"
      />
      <li class="favorite-element">
        <div v-bind:class="[isHighlighted(7) ? 'highlighted' : '']">
          <slot></slot>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Favorite from "@/components/Favorite.vue";
export default {
  name: "Favorites",
  components: { Favorite },
  computed: {
    ...mapGetters(["favorites", "getCurrentCoor"]),
  },
  data() {
    return {
      xMin: 0, //getBoundingClientRect.left
      xMax: 0, //.right
      yMin: 0, //.top
      yMax: 0, //.bottom
      x_Middle: 0,
      xMiddleMiddle: 0,
      xMiddleMiddleMiddle: 0,
      middleLeft: 0,
      yMiddle: 0,
      iterations: 0,
    };
  },
  methods: {
    updateBoundingBox() {
      const rect = this.$refs.parent.getBoundingClientRect();
      console.log(rect);
      console.log("favorite parent");
      let ul_middle = (rect.right - rect.left) / 2;

      this.xMiddle = ul_middle + rect.left;

      //left
      this.xMiddleMiddle = ul_middle / 2 + rect.left;
      //right
      this.xMiddleMiddleMiddle = (ul_middle / 2) * 3 + rect.left;

      //this.$store.commit("coordinates_area", { middle: middle });
    },
    onClickRemove(favoriteId) {
      this.$store.commit("removeFav", favoriteId);
    },
    isHighlighted(index) {
      console.log("+++++++++++++++++++++++++++");
      //console.log(this.selection);

      let highlighted = false;

      //console.log(this.xMiddleMiddle);
      //console.log(this.xMiddleMiddleMiddle);
      //ifif (
      //this.selection == -1 &&
      /*if (
        this.iterations == 1 &&
        this.getCurrentCoor.x < this.xMiddleMiddle &&
        [0, 4].includes(index)
      ) {
        highlighted = true;
        //return true;
      } else if (
        this.iterations == 1 &&
        this.getCurrentCoor.x > this.xMiddleMiddleMiddle &&
        [3, 7].includes(index)
      ) {
        highlighted = true;
        //return true;
      } else */
      if (
        this.getCurrentCoor.x < this.xMiddle &&
        [0, 1, 4, 5].includes(index)
      ) {
        //this.selection = -1;
        highlighted = true;
      } else if (
        this.getCurrentCoor.x > this.xMiddle &&
        [2, 3, 6, 7].includes(index)
      ) {
        //this.selection = 1;
        highlighted = true;
        /*if (index == 7) {
          this.iterations++;
        }*/
      } else {
        highlighted = false;
      }

      //console.log(this.iterations);
      return highlighted;
    },
  },
  mounted() {
    this.updateBoundingBox();
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/styles/variables.styl";

ul
  list-style-type none
  padding-left unset
  margin auto
  display flex
  flex-flow row wrap
  width $maxWidth

@media (max-width: 350px)
  ul
    width ($maxWidth*1.1)vw
</style>
