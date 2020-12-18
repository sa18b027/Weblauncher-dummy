<template>
   <button @click="onClick" class="btn btn-primary">Add Favorite</button>
</template>

<script>
export default {
    name: "AddFavorites",
    methods: {
        onClick() {
            this.$store.commit("showModal")
            
        }
    },
    
}
</script>

<style lang="scss" scoped>

</style>