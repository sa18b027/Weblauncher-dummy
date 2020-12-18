import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites : [
      {
        name: "YouTube",
        id: 1,
        url: "https://www.youtube.com"
      },
      {
        name: "Gmail",
        id: 2,
        url: "https://www.gmail.com"
      }
    ],
    showAddFavoritesModal: false
  },
  mutations: {
    showModal (state){
      state.showAddFavoritesModal = true;
    },
    hideModal (state){
      state.showAddFavoritesModal = false;
    },
    addFavorite (state, data){
      console.log(data);

      console.log("add favorite");
      console.log(state.favorites);

    if (state.favorites.length < 8){
        state.favorites.push({
          id: state.favorites.length +1,
          name: data.name,
          url: data.url
        });
        //console.log(localStorage.getItem("favorites"));
        localStorage.setItem("favorit", JSON.stringify(state.favorites));
        console.log(localStorage.getItem("favorit"));

        console.log(state.favorites);
      }else{
        alert("Maximum erreicht, bitte einen Favoriten löschen.");
      }
    },
  
  removeFav: function(state, favoriteId){
    let index = state.favorites.indexOf(favoriteId);
    if(index  !== -1){
      
    state.favorites.splice(index, 1);
    localStorage.setItem("favorit", JSON.stringify(state.favorites));
    }
  }
},
  getters:{
  favorites(state){
    if(localStorage.getItem("favorit")){
      state.favorites = JSON.parse(localStorage.getItem("favorit"));
    }else{
      state.favorites = [];
    }
    console.log(state.favorites);
    return state.favorites; 
  }
  },
  actions: {

  },
  modules: {
  }
})
