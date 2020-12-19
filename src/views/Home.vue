<template>
  <div class="home">
    <Favorites>
      <AddFavorites />
    </Favorites>
    <AddFavoritesModal />
  </div>
</template>

<script>
// @ is an alias to /src
import Favorites from "@/components/Favorites.vue";
import AddFavorites from "@/components/AddFavorites.vue";
import AddFavoritesModal from "@/components/AddFavoritesModal.vue";

export default {
  name: "Home",
  components: {
    Favorites,
    AddFavorites,
    AddFavoritesModal,
  },
};
</script>
