import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    currentPerso: null,
    currentShop: null
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateVilles(state, villes) {
      state.villes = villes
    },
    updatePersos(state, persos) {
      state.persos = persos
    },
    setCurrentPerso(state, perso) {
        state.currentPerso = perso
    },
    setCurrentShop(state, shop) {
        state.currentShop = shop
    },
    // ne vérifie pas l'or possédé par le personnage courant,
    // ajouter l'item passé en paramètre à la liste itemAchetes du personnage courant,
    // supprime l'item passé en paramètre à la liste des items vendus par la boutique courante
    sell(state, item) {
      console.log("SELLING")
      if (state.currentPerso) {
        state.currentPerso.itemsAchetes.push(item)
        state.currentPerso.or -= item.prix
        state.currentShop.itemStock.splice(state.currentShop.itemStock.indexOf(item), 1)
      } else {
        console.log("Pas de personnage courant")
      }
    },
    // stock(state, item) {
    //
    // }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async getAllTowns({commit}) {
      console.log('récupération des villes');
      let response = await TownService.getAllTowns()
      if (response.error === 0) {
        commit('updateVilles', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllCharacs({commit}) {
      console.log('récupération des personnages');
      let response = await CharacService.getAllCharacs()
      if (response.error === 0) {
        commit('updatePersos', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async setCurrentPerso({commit}, perso) {
      commit("setCurrentPerso", perso)
    },
    async setCurrentShop({commit}, shop) {
      commit("setCurrentShop", shop)
    },
    async buyingItem({commit}, item) {
      commit("sell", item)
    }
  },
  getters : {
    // Renvoyer la quantitié d'or du perso courant ou bien 0 si pas de perso courant
    currentGoldPerso(state) {
        return state.currentPerso ? state.currentPerso.or : 0;
    }
  }
})
