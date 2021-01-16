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
        <div v-bind:class="[isSlotHighlighted ? 'highlighted' : '']">
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
      :position="determinePos(0)"
      @highlighted="handleHighlighted"
    />
    <HalfFavourite
      :fav-index="determineSecondHalf()"
      :x1="xMin"
      :y1="yMin"
      :x2="xMax"
      :y2="yMax"
      :position="determinePos(1)"
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
      selectionRunning: 0,
      selected: [],
      arrIsHighlighted: [],
      isSlotHighlighted: 0,
      isAppOn: false,
      mode: 1, // 1 absolute 2 relative
    };
  },
  methods: {
    ...mapMutations(["setSelected"]),
    handleHighlighted: function(arrHighlighted) {
      for (let i = 0; i < this.favorites.length; i++) {
        this.arrIsHighlighted[i] = arrHighlighted.includes(i);
      }
      if (
        this.favorites.length < 8 &&
        arrHighlighted.includes(this.favorites.length)
      ) {
        this.isSlotHighlighted = 1;
      } else {
        this.isSlotHighlighted = 0;
      }
      if (this.selectionRunning == 0 && this.selected.length > 1) {
        this.selectionRunning = 1;
        setTimeout(() => {
          this.selected = this.getHighlighted;
          this.setSelected(this.selected);
          this.selectionRunning = 0;
          //console.log(this.selected);
        }, 5000);
      } else if (this.selectionRunning == 0 && this.selected.length == 1) {
        //console.log(this.favorites[this.selected[0]].url);
        if (this.isSlotHighlighted) {
          console.log("click add favorite");
          document.getElementById("addfav").click();
        } else {
          //window.open(this.favorites[this.selected[0]].url, "_blank");
          location.reload();
        }
        this.selected = [];
        this.selectionRunning = 0;
        this.arrIsHighlighted = [];
        this.setSelected(this.selected);
      }

      //console.log(this.selected);
    },
    determinePos(index) {
      let arrPosition = ["", ""]; //top bottom right left
      if (this.mode == 1) {
        return arrPosition[index];
      }
      if (this.mode == 2) {
        let selected = this.getSelected;
        if (selected.length > 4) {
          arrPosition = ["left", "right"];
        } else if (selected.length > 2) {
          if (selected[2] - selected[0] > 3) {
            arrPosition = ["top", "bottom"];
          } else {
            arrPosition = ["left", "right"];
          }
        } else if (selected.length > 0) {
          arrPosition = ["left", "right"];
        }
      }

      return arrPosition[index];
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
    onClickRemove(favoriteId) {
      this.$store.commit("removeFav", favoriteId);
    },
  },
  //hier stellt man den mode ein, relative= 2,oder absolute =1
  mounted() {
    this.mode = 1;
  },
  updated() {
    if (this.getCurrentCoor.x != 0 || this.getCurrentCoor.y != 0) {
      //mouse moved
      this.isAppOn = true;
    }
    if (this.favorites.length == 0) {
      //no favorites stored. do nothing
      this.isAppOn = false;
    }
    if (!this.isAppOn) {
      return;
    }
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
      if (this.favorites.length < 8) {
        selected.push(this.favorites.length);
      }
      this.setSelected(selected);
    }
    this.selected = selected;
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
