<template>
  <div class="about">
    <input class="input1" placeholder="Tap on the virtual keyboard to start" name="input1"/><br />  <br />
    <input class="input2" placeholder="Tap on the virtual keyboard to start" name="input2"/>
    <tastatur></tastatur>
  </div>
</template>
<script>
import Tastatur from "@/components/Tastatur.vue";
export default {
  components: { Tastatur },
};
</script>
