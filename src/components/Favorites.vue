<template>
  <div>
    <div>{{ getCurrentCoor }}</div>
    <ul ref="parent" style="background-color: blue !important">
      <Favorite
        v-for="(favorite, index) in favorites"
        :key="index"
        :highlighted="arrIsHighlighted[index]"
        :fav="favorite"
      />
      <li v-show="favorites.length < 8" class="favorite-element">
        <div v-bind:class="[arrIsHighlighted[7] ? 'highlighted' : '']">
          <slot></slot>
        </div>
      </li>
    </ul>
    <HalfFavourite
      :fav-index="determineFirstHalf()"
      :x1="xMin"
      :y1="yMin"
      :x2="xMax"
      :y2="yMax"
      @highlighted="handleHighlighted"
    />
    <HalfFavourite
      :fav-index="determineSecondHalf()"
      :x1="xMin"
      :y1="yMin"
      :x2="xMax"
      :y2="yMax"
      @highlighted="handleHighlighted"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import Favorite from "@/components/Favorite.vue";
import HalfFavourite from "@/components/HalfFavourite.vue";
export default {
  name: "Favorites",
  components: { Favorite, HalfFavourite },
  computed: {
    ...mapGetters([
      "favorites",
      "getCurrentCoor",
      "getSelected",
      "getHighlighted",
    ]),
  },
  data() {
    return {
      xMin: 0, //getBoundingClientRect.left
      xMax: 0, //.right
      yMin: 0, //.top
      yMax: 0, //.bottom
      // x_Middle: 0,
      // xMiddleMiddle: 0,
      // xMiddleMiddleMiddle: 0,
      // middleLeft: 0,
      // yMiddle: 0,
      // iterations: 0,
      selectionRunning: 0,
      selected: [],
      arrIsHighlighted: [],
    };
  },
  methods: {
    ...mapMutations(["setSelected"]),
    handleHighlighted: function(arrHighlighted) {
      for (let i = 0; i < this.favorites.length; i++) {
        this.arrIsHighlighted[i] = arrHighlighted.includes(i);
      }
      if (this.selectionRunning == 0 && this.selected.length > 1) {
        this.selectionRunning = 1;
        setTimeout(() => {
          this.selected = this.getHighlighted;
          this.setSelected(this.selected);
          this.selectionRunning = 0;
          console.log(this.selected);
        }, 5000);
      } else if (this.selected.length == 1) {
        console.log(this.favorites[this.selected[0]].url);
        window.location.href = this.favorites[this.selected[0]].url;
        this.selected = [];

        this.selectionRunning = 0;

        this.arrIsHighlighted = [];
        this.setSelected(this.selected);
      }

      //console.log(this.selected);
    },
    determineFirstHalf() {
      let result = [];
      let selected = this.getSelected;
      if (selected.length > 4) {
        result = [0, 1, 4];
        if (selected.length > 5) {
          result.push(5);
        }
      } else if (selected.length > 2) {
        result = [selected[0], selected[1]];
      } else if (selected.length > 0) {
        result = [selected[0]];
      }
      //console.log(result);
      return result;
    },
    determineSecondHalf() {
      let result = [];
      let selected = this.getSelected;
      if (selected.length == 8) {
        result = [2, 3, 6, 7];
      } else if (selected.length == 7) {
        result = [2, 3, 6];
      } else if (selected.length > 4) {
        result = [2, 3];
      } else if (selected.length == 4) {
        result = [selected[2], selected[3]];
      } else if (selected.length == 3) {
        result = [selected[2]];
      } else if (selected.length == 2) {
        result = [selected[1]];
      }
      //console.log(result);
      return result;
    },
    updateBoundingBox() {
      const rect = this.$refs.parent.getBoundingClientRect();
      console.log(rect);
      console.log("favorite parent");
      // let ul_middle = (rect.right - rect.left) / 2;

      // this.xMiddle = ul_middle + rect.left;

      // //left
      // this.xMiddleMiddle = ul_middle / 2 + rect.left;
      // //right
      // this.xMiddleMiddleMiddle = (ul_middle / 2) * 3 + rect.left;

      // //this.$store.commit("coordinates_area", { middle: middle });
    },
    onClickRemove(favoriteId) {
      this.$store.commit("removeFav", favoriteId);
    },
  },
  mounted() {
    this.updateBoundingBox();
  },
  updated() {
    const rect = this.$refs.parent.getBoundingClientRect();
    this.xMin = rect.left;
    this.xMax = rect.right;
    this.yMin = rect.top;
    this.yMax = rect.bottom;

    let selected = this.getSelected;
    if (selected.length == 0) {
      for (let i = 0; i < this.favorites.length; i++) {
        selected.push(i);
      }
      this.setSelected(selected);
    }
    this.selected = selected;

    //console.log( this.arrIsHighlighted);
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
