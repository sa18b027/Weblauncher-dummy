<template>
  <div>
    <ul>
      <Favorite
        v-for="(favorite, index) in favorites"
        :key="index"
        :fav="favorite"
      />
      <li class="favorite-element">
        <div>
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
    ...mapGetters(["favorites"]),
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
