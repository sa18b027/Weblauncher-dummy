import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    current: {
      x: 0,
      y: 0,
    },
    favorites: [
      {
        name: "YouTube",
        id: 1,
        url: "https://www.youtube.com",
      },
      {
        name: "Gmail",
        id: 2,
        url: "https://www.gmail.com",
      },
    ],
    showAddFavoritesModal: false,
  },
  mutations: {
    setCurrentCoor(state, payload) {
      state.current.x = payload.x;
      state.current.y = payload.y;
    },
    showModal(state) {
      state.showAddFavoritesModal = true;
    },
    hideModal(state) {
      state.showAddFavoritesModal = false;
    },
    addFavorite(state, data) {
      console.log(data);

      console.log("add favorite");
      console.log(state.favorites);

      if (state.favorites.length < 7) {
        state.favorites.push({
          id: state.favorites.length + 1,
          name: data.name,
          url: data.url,
        });
        localStorage.setItem("favorit", JSON.stringify(state.favorites));
        console.log(localStorage.getItem("favorit"));

        console.log(state.favorites);
      } else {
        alert("Maximum erreicht, bitte einen Favoriten löschen.");
      }
    },

    removeFav: function(state, favoriteId) {
      const index = state.favorites.findIndex((elem) => {
        return elem.id === favoriteId;
      });
      if (index !== -1) {
        state.favorites.splice(index, 1);
        localStorage.setItem("favorit", JSON.stringify(state.favorites));
      }
    },
  },
  getters: {
    favorites(state) {
      if (localStorage.getItem("favorit")) {
        state.favorites = JSON.parse(localStorage.getItem("favorit"));
      } else {
        state.favorites = [];
      }
      console.log(state.favorites);
      return state.favorites;
    },
  },
  actions: {},
  modules: {},
});
