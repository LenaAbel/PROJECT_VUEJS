<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <!--  lors de la sélection d'un personnage, on appelle la mutation setCurrentPerso(state, perso) afin de mettre à jour le personnage courant. -->
        <select v-model="selected" @change="$store.dispatch('setCurrentPerso', selected)" class="persoselect">
          <option disabled value="">Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{ perso.nom }}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="getCurrentPerso != null" style="text-align: left; width: 80%">
        <PersoCaracs :selected="getCurrentPerso" ></PersoCaracs>
      </div>
    </div>
  </v-container>
</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex'
import PersoCaracs from '@/components/PersoCaracs'

export default {
  name: 'PersosView',
  components: {PersoCaracs},
  data: () => ({
    selected: null,
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
    selectedItem: null,
    selectedSlot: null,

  }),
  computed: {
    ...mapState(['persos']),
    ...mapActions(["setCurrentPerso"]),
    ...mapGetters(['getCurrentPerso']),
    checkedBoughtItems() {
      if (this.selected === null) return []
      // construit un tableau contenant autant de cases qu'il y a d'items achetés
      // chaque case contient true/false en fonction du fait que l'item est sélectionné ou non
      let tab = []
      for (let i = 0; i < this.selected.itemsAchetes.length; i++) {
        if (this.idSelectedBoughtItems.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    // récupère la liste des emplacements du personnage courant afin de
    // les classer dans l'ordre qu'il convient pour l'affichage, avec le nom en français.
    slots() {
      if (this.selected) {
        let tab = [];
        let slot = this.selected.emplacements.find(s => s.nom === 'head')
        slot.label = 'Tête'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'body')
        slot.label = 'Corps'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'hands')
        slot.label = 'Mains'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'belt')
        slot.label = 'Ceinture'
        tab.push(slot)
        slot = this.selected.emplacements.find(s => s.nom === 'bag')
        slot.label = 'Sac à dos'
        tab.push(slot)
        console.log(tab)
        return tab
      }
      return []
    }
  },
  methods: {
    showItemPrice(index) {
      alert(this.selected.itemsAchetes[index].nom + ' : ' + this.selected.itemsAchetes[index].prix)
    },
    showItemsInfo() {
      let items = ""
      this.idSelectedBoughtItems.forEach(e => items += ' ' + this.selected.itemsAchetes[e].nom)
      alert(items)
    },
    toggleItem(index) {
      let id = this.idSelectedBoughtItems.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedBoughtItems.push(index)
      } else {
        // enleve index
        this.idSelectedBoughtItems.splice(id, 1)
      }
    },
    //tirer aléatoirement un prix de revente entre 0.4 et 0.9 fois le prix d'achat d'origine,
    //d'afficher une boîte de dialogue pour indiquer ce prix et 2 boutons pour refuser ou accepter,
    //en cas d'acceptation, appeler la mutation resell(...), avec en paramètre un objet au format { item: ..., gold: ... }., permettant de spécifier quel item revendre et à quel prix.
    resellItems() {
      let price = Math.round(this.selectedItem.prix * (0.4 + Math.random() * 0.5))
      if (confirm('Voulez-vous vendre ' + this.selectedItem.nom + ' pour ' + price + ' pièces d\'or ?')) {
        this.$store.commit('resell', {item: this.selectedItem, gold: price})
      }
    },
    assignItemToSlot(item, slot) {
      if (item && slot) {
        this.$store.commit('assignItemToSlot', {item: item, slot: slot})
        this.selectedSlot = null;
        this.selectedItem = null;
      }
    },
    unassignItemFromSlot(item, slot) {
      console.log('unassignItemFromSlot', item, slot);
      if (item && slot) {
        this.$store.dispatch('unassignItemFromSlot', {item, slot})
        this.selectedSlot = null;
        this.selectedItem = null;
      }
    },
    findItemsInEmplacements() {
      let currentPerso = this.selected;
      console.log('currentPerso : ',currentPerso);
      let items = [];
      for (let elt of currentPerso.emplacements) {
        if (elt.items.length > 0) {
          for (let eltElement of elt.items) {
            items.push(eltElement);
          }
        }
      }
      return items;
    }
  },
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}
</style>