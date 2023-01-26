import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'
import {itemLimits} from "@/services/data.service";

export default new Vuex.Store({
    // state = les données centralisées
    state: () => ({
        villes: [],
        persos: [],
        itemLimits: [],
        currentPerso: null,
        currentShop: null,
        currentItem: null,
        currentTown: null,
        currentStreet: null,
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
        setCurrentTown(state, town) {
            console.log(town);
            state.currentTown = town
        },
        setCurrentStreet(state, street) {
            state.currentStreet = street
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
        assignItemToSlot(state, data) {
            // check if the selected item matches the type and there is still room in the slot
            // remove item from itemsAchetes
            // add item to the appropriate slot
            // display alert message
            let itemInType = itemLimits.filter(item => {
                //console.log('Type : ', item.types.includes(data.item.type))
                return item.types.includes(data.item.type)
            })
            // afficher les items assigné du perso courant
            if(state.currentPerso) {
                if(itemInType[0].slot === data.slot.nom) {
                    // verifier que le slot n'est pas plein en fonction de la limite indiqué dans itemLimits
                    if(data.slot.items.length < itemInType[0].limit) {
                        state.currentPerso.emplacements.forEach(slot => {
                            if (slot.nom === data.slot.nom) {
                                state.currentPerso.itemsAchetes.splice(state.currentPerso.itemsAchetes.indexOf(data.item), 1)
                                // push l'item dans l'emplacement du personnage courant
                                slot.items.push(data.item)
                                alert(`L'item ${data.item.nom} a été assigné au slot ${data.slot.label}`)
                            }
                        })
                    } else {
                        alert(`Le slot ${data.slot.label} est plein`)
                    }
                } else {
                    alert(`L'item ${data.item.nom} ne peut pas être assigné au slot ${data.slot.label}, mais au slot ${itemInType[0].slot}`)
                }
            } else {
                console.log("Pas de personnage courant")
            }
        },
        unassignItemFromSlot(state, data) {
            // remove item from slot
            // add item to itemsAchetes
            // display alert message
            let found = false;
            itemLimits.filter(item => {
                if (item.types.includes(data.item.type) && item.slot === data.slot.nom){
                    found = true;
                    console.log(item);
                } else if(item.types.includes(data.item.type) && item.slot !== data.slot.nom) {
                    let allTypesItem = item.types;
                    alert(`L'item ${data.item.nom} ne peut pas être désassigné du slot ${data.slot.label}, mais au slot ${allTypesItem}`)
                }
            })
            if(state.currentPerso && found) {
                let emplacementIndex = state.currentPerso.emplacements.findIndex(elt => elt.nom === data.slot.nom);
                let itemIndex = state.currentPerso.emplacements[emplacementIndex].items.findIndex(elt => elt.nom === data.item.nom);
                state.currentPerso.emplacements[emplacementIndex].items.splice(state.currentPerso.emplacements[emplacementIndex].items[itemIndex], 1)
                state.currentPerso.itemsAchetes.push(data.item)
                alert(`L'item ${data.item.nom} a été retiré du slot ${data.slot.label}`)
            } else {
                console.log("Pas de personnage courant ou item non trouvé.")
            }
        }
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
        async setCurrentTown({commit}, town) {
            commit("setCurrentTown", town)
        },
        async setCurrentStreet({commit}, street) {
            commit("setCurrentStreet", street)
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
        async assignItemToSlot({commit}, data) {
            console.log("ASSIGNING ITEM")
            commit("assignItemToSlot", data)
        },
        async unassignItemFromSlot({commit}, data) {
            commit('unassignItemFromSlot', data)
        }
    },
    getters: {
        // Renvoyer la quantitié d'or du perso courant ou bien 0 si pas de perso courant
        currentGoldPerso(state) {
            return state.currentPerso ? state.currentPerso.or : 0;
        },
        getCurrentTown(state) {
            console.log('getCurrentTown', state.currentTown);
            return state.currentTown
        },
        getCurrentStreet(state) {
            console.log('getCurrentStreet', state.currentStreet);
            return state.currentStreet
        },
        getCurrentShop(state) {
            console.log('getCurrentShop', state.currentShop);
            return state.currentShop
        },
        getCurrentPerso(state) {
            console.log('getCurrentPerso', state.currentPerso);
            return state.currentPerso
        }
    }
})