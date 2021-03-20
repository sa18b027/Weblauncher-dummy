<template>
  <div id="app">
    <WebGazer @onNewData="onNewData" :off="gazeroff" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import WebGazer from "@/components/WebGazer.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: { WebGazer },
  data: () => ({
    windowHeight: 0,
    windowWidth: 0,
    currentX: 0,
    currentY: 0,
    x: 0,
    y: 0,
  }),
  computed: {
    gazeroff: function() {
      //return true;
      if (localStorage.getItem("mode")) {
        if (parseInt(localStorage.getItem("mode")) == 4) return false;
      }
      return true;
    },
  },
  created: function() {
    this.windowHeight = window.innerHeight;
    this.windowWidth = window.innerWidth;
    window.addEventListener("mousemove", this.onUpdate);
  },
  destroyed: function() {
    window.removeEventListener("mousemove", this.onUpdate);
  },
  methods: {
    ...mapMutations(["setCurrentCoor"]),
    onUpdate(event) {
      this.currentX = event.clientX;
      this.currentY = event.clientY;
      this.setCurrentCoor({
        x: this.currentX,
        y: this.currentY,
      });
      //console.log(this.currentX, this.currentY);
    },
    onNewData(coord) {
      this.x = coord.x;
      this.y = coord.y;
      this.setCurrentCoor({
        x: coord.x,
        y: coord.y,
      });
    },
  },
};
</script>

<style></style>
