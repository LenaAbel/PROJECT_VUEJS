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
        itemLimits: [],
        currentPerso: null,
        currentShop: null,
        currentItem: null,
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
        setCurrentItem(state, item) {
            state.currentItem = item
        },
        // ne vérifie pas l'or possédé par le personnage courant,
        // ajouter l'item passé en paramètre à la liste itemAchetes du personnage courant,
        // supprime l'item passé en paramètre à la liste des items vendus par la boutique courante
        sell(state, item) {
            if (state.currentPerso) {
                state.currentPerso.itemsAchetes.push(item)
                state.currentPerso.or -= item.prix
                state.currentShop.itemStock.splice(state.currentShop.itemStock.indexOf(item), 1)
            } else {
                console.log("Pas de personnage courant")
            }
        },
        // Ajoutez au store une mutation stock(state, item) qui permet d'ajouter item à la liste des items à vendre.
        stock(state, item) {
            if (state.currentShop) {
                state.currentShop.itemStock.push(item)
            } else {
                console.log("Pas de boutique courante")
            }
        },
        // Ajouter au store une mutation resell(state, data), permettant d'enlever data.item de la liste itemsAchetes du personnage courant,
        // de l'ajouter à la liste des items à vendre de la boutique courante, si elle existe, et enfin de créditer le personnage avec data.gold pièces d'or.
        resell(state, data) {
            if (state.currentPerso) {
                state.currentPerso.itemsAchetes.splice(state.currentPerso.itemsAchetes.indexOf(data.item), 1)
                state.currentPerso.or += data.gold
                if (state.currentShop) {
                    state.currentShop.itemStock.push(data.item)
                } else {
                    console.log("Pas de boutique courante")
                }
            } else {
                console.log("Pas de personnage courant")
            }
        },

        //assignItem(state, data) {

        //}
    },
    // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async getAllTowns({commit}) {
            console.log('récupération des villes');
            let response = await TownService.getAllTowns()
            if (response.error === 0) {
                commit('updateVilles', response.data)
            } else {
                console.log(response.data)
            }
        },
        async getAllCharacs({commit}) {
            console.log('récupération des personnages');
            let response = await CharacService.getAllCharacs()
            if (response.error === 0) {
                commit('updatePersos', response.data)
            } else {
                console.log(response.data)
            }
        },
        async setCurrentPerso({commit}, perso) {
            commit("setCurrentPerso", perso)
        },
        async setCurrentShop({commit}, shop) {
            commit("setCurrentShop", shop)
        },
        async setCurrentItem({commit}, item) {
            commit("setCurrentItem", item)
        },
        async buyingItem({commit}, item) {
            console.log("BUYING ITEM")
            commit("sell", item)
        },
        async orderingItem({commit}, item) {
            console.log("ORDERING ITEM")
            commit("orderItem", item)
        },
        async stockingItem({commit}, item) {
            console.log("STOCKING")
            commit("stock", item)
        },
        async order({commit}, data) {
            setTimeout(() => {
                commit('stock', data.item)
            }, data.time)
        },
        async resell({commit}, data) {
            console.log("RESELLING")
            commit("resell", data)
        },
        async assignItem({commit}, data) {
            console.log("ASSIGNING")
            commit("assignItem", data)
        },
        async unassignItem({commit}, payload) {
            commit('unassignItem', payload)
        }
    },
    getters: {
        // Renvoyer la quantitié d'or du perso courant ou bien 0 si pas de perso courant
        currentGoldPerso(state) {
            return state.currentPerso ? state.currentPerso.or : 0;
        }
    }
})