<template>
  <div>
    <p>{{ windowHeight }}</p>
    <p>{{ windowWidth }}</p>

    <!-- @mousemove="showFavorites" -->

    <ul>
      <li v-for="(favorite, index) in favorites" :key="index">
        <!-- <h3>{{ index }} . {{favorite.name}}</h3>
         
        <p> {{favorite}} </p> -->
        <!-- <p>{{index}}</p>
        <p>{{favorite.id}}</p> -->
        <a :href="favorite.url">{{ favorite.name }}</a>
        <button @click="removeFav(favorite.id)">Löschen</button>
      </li>
      <li class="">
        <slot></slot>
      </li>
    </ul>
    <!-- <input
            :value="input"
            class="input"
            @input="onInputChange"
            placeholder="Tap on the virtual keyboard to start"
    >
    <Tastatur @onChange="onChange" @onKeyPress="onKeyPress" :input="input"/> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import Tastatur from '@/components/Tastatur.vue'
export default {
  name: "Favorites",
  // components: {Tastatur},
  data: () => ({
    input: "",
    // windowHeight: window.innerHeight,
    // windowWidth: window.innerWidth,
    // selectionFavorites: [],
    // currentX: 0,
    // currentY: 0,
  }),
  computed: {
    /*...mapState([
            "favorites"
        ]),*/
    ...mapGetters(["favorites"]),
  },

  // mounted(){
  //     this.selectionFavorites = this.favorites;
  // },

  methods: {
    removeFav: function(favoriteId) {
      this.$store.commit("removeFav", favoriteId);
    },

    // showFavorites:function(event){
    //     console.log("mouse move");
    //     console.log(event.clientX);
    //     console.log(event.clientY);
    //     this.currentX = event.clientX;
    //     this.currentY = event.clientY;

    //     let all = [];
    //     let index = 0;
    //     let left = [0,1,4,5];
    //     let right =[2,3,6,7];
    //     for (const iterator of this.favorites) {
    //         console.log(iterator);

    //         if(this.currentX <= this.windowWidth/2){
    //             if(left.includes(index)){
    //                 all.push(iterator);
    //             }
    //         }

    //         if(this.currentX > this.windowWidth/2){
    //             if(right.includes(index)){
    //                 all.push(iterator);
    //             }
    //         }
    //         /*if(index % 2 == 0){
    //             all.push(iterator);
    //         }*/
    //         index++;

    //     }
    //     this.selectionFavorites = all;
    // },
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
    },
  },
};
</script>

<style scoped>
/* .favs {
    list-style: none;
    line-height:800%;
} */
/* ul, li {
    list-style: none;
}
.parent {
  display: flex;
  flex-wrap: wrap;
}

.child {
  flex: 1 0 21%; 
  margin: 5px;
  height: 100px;
  background-color: rgb(209, 209, 223);
} */
</style>
