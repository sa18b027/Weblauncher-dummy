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
      // array of indices of the tiles
      type: Array,
      required: true,
    },
    //großes Rechteck
    x1: { type: Number }, //oben links
    y1: { type: Number }, //oben link
    x2: { type: Number }, //unten rechts
    y2: { type: Number }, //unten rechts
    position: { type: String }, //z.B.left,rigth,top, bottom
  },
  data() {
    return {
      xMin: 0, //getBoundingClientRect.leftKoordinaten von der Hälfte, die ändern sich ständig
      xMax: 0, //.right
      yMin: 0, //.top
      yMax: 0, //.bottom
      counter: 0,
    };
  },
  computed: {
    ...mapGetters(["getCurrentCoor", "getLastMouseForRelative"]),
  },
  watch: {
    FavIndex(arrIndex) {
      // console.log("this arrIndex", arrIndex);
      if (arrIndex.length > 0) {
        //arrIndex[0]=ist die Stelle des Index von der gewählten Kachel
        let index = arrIndex[0] % 4; //0,1,2,3
        //console.log("this x1:", this.x1);
        //console.log(this.x2);
        //this.xMin =
        this.xMin = this.x1 + (index * (this.x2 - this.x1)) / 4; //Hälfte vom großen Rechteck(blau)=thisx2-this.x1
        index = 0;
        //y nur 2 Möglichkewiten,index 0=Kacheln[0,1,2,3], index 1=[4,5,6,7]
        if (arrIndex[0] > 3) {
          index = 1;
        }
        this.yMin = this.y1 + (index * (this.y2 - this.y1)) / 2; //Hälfte bestimmen
        let lastIndex = arrIndex.length - 1; //arrIndex.length= Hälfte von Länge,max4
        //xMax:rechterRand
        index = (arrIndex[lastIndex] % 4) + 1;
        if (arrIndex.length == 3) {
          // shape is not rectangle
          index++; //rücke noch eins nach rechts, wenn 3Kacheln in einer Hälfte(L)
        }
        this.xMax = this.x1 + (index * (this.x2 - this.x1)) / 4;
        index = 1;
        //yMax:
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
      //liegt die Maus innerhalb vom Rechteck oder nicht?
      if (this.position == "") {
        //absolute   mode
        if (
          this.getCurrentCoor.x < this.xMax &&
          this.getCurrentCoor.x > this.xMin &&
          this.getCurrentCoor.y < this.yMax &&
          this.getCurrentCoor.y > this.yMin
        ) {
          this.setHighlighted(arrIndex);
          //emit schickt an parent
          this.$emit("highlighted", arrIndex);
        }
      } else {
        //relative mode
        //wenn leer, dann speichere die coor
        if (
          this.getLastMouseForRelative.x == 0 &&
          this.getLastMouseForRelative.y == 0
        ) {
          //at the beginning save positions
          this.setLastMouseForRelative({
            x: this.getCurrentCoor.x,
            y: this.getCurrentCoor.y,
          });
        }
        //warte auf 30 mouseBewegungen/events
        if (this.counter >= 30) {
          this.counter = 0;
          let direction = "";
          if (
            //Differenz von 2 Positionen,vorher,nachher
            Math.abs(this.getCurrentCoor.x - this.getLastMouseForRelative.x) >
            Math.abs(this.getCurrentCoor.y - this.getLastMouseForRelative.y)
          ) {
            direction = "left";
            if (this.getCurrentCoor.x > this.getLastMouseForRelative.x) {
              direction = "right";
            }
          } else if (
            Math.abs(this.getCurrentCoor.x - this.getLastMouseForRelative.x) <
            Math.abs(this.getCurrentCoor.y - this.getLastMouseForRelative.y)
          ) {
            direction = "top";
            if (this.getCurrentCoor.y > this.getLastMouseForRelative.y) {
              direction = "bottom";
            }
          }

          //console.log(direction + " " + this.position)
          if (direction == this.position) {
            console.log(direction);
            console.log(arrIndex);
            this.setHighlighted(arrIndex);
            this.$emit("highlighted", arrIndex);
          }
          /*console.log(this.getCurrentCoor.x + ", " + this.getCurrentCoor.y);
              console.log(this.getLastMouseForRelative.x + ", " + this.getLastMouseForRelative.y);
              console.log(direction);*/
          //Startschuss für die nächste Runde
          if (this.position == "right" || this.position == "bottom")
            this.setLastMouseForRelative({
              x: this.getCurrentCoor.x,
              y: this.getCurrentCoor.y,
            });
        } else {
          this.counter++;
        }
      }
    },
  },
  methods: {
    ...mapMutations(["setHighlighted", "setLastMouseForRelative"]),
  },
  mounted() {
    console.log(this.FavIndex);
  },
};
</script>

<style></style>
