<template>
  <div>
    <h3 v-if="slotItems.length > 0"><span style="color: lightcoral">DESASSIGNER </span> UN OBJET</h3>
    <select v-if="slotItems.length > 0" v-model="selectedItem" class="unassignselect"
            @change="unassignItemFromSlot(selectedItem)">
      <option disabled value="" selected>Sélectionner un item</option>
      <option v-for="(item, index) in slotItems" :key="index" :value="item">{{ item.nom }}
      </option>
    </select>
    <br>

    <h3>Slot : {{slotName}}</h3>
    <ul v-if="slotItems.length > 0">
      <li v-for="(slot, index) in slotItems" :key="index">
        <span >{{ slot.nom }}</span>
      </li>
    </ul>
    <span v-else>Pas d'items dans ce slot</span>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex';
//import CheckedList from "@/components/CheckedList.vue";


export default {
  //components: {CheckedList},
  props: ['slotName'],
  //components: {CheckedList},
  data: () => ({
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
    selectedItem: null,
    selectedSlot: null,
    slotButton: null,
  }),
  computed: {
    ...mapState(['persos', 'currentPerso']),
    ...mapActions(["setCurrentPerso"]),
    ...mapGetters(['getCurrentPerso']),
    // récupère la liste des emplacements du personnage courant afin de
    // les classer dans l'ordre qu'il convient pour l'affichage, avec le nom en français.
    slots() {
      if (this.currentPerso) {
        let tab = [];
        let slot = this.currentPerso.emplacements.find(s => s.nom === 'head')
        slot.label = 'Tête'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'body')
        slot.label = 'Corps'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'hands')
        slot.label = 'Mains'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'belt')
        slot.label = 'Ceinture'
        tab.push(slot)
        slot = this.currentPerso.emplacements.find(s => s.nom === 'bag')
        slot.label = 'Sac à dos'
        tab.push(slot)
        console.log(tab)
        return tab
      }
      return []
    },
    slotItems() {
      return this.currentPerso.emplacements.find(s => s.nom === this.slotName).items;
    },
  },
  methods: {
    //tirer aléatoirement un prix de revente entre 0.4 et 0.9 fois le prix d'achat d'origine,
    //d'afficher une boîte de dialogue pour indiquer ce prix et 2 boutons pour refuser ou accepter,
    //en cas d'acceptation, appeler la mutation resell(...), avec en paramètre un objet au format { item: ..., gold: ... }., permettant de spécifier quel item revendre et à quel prix.
    unassignItemFromSlot(item) {
      let slot = this.currentPerso.emplacements.find(s => s.nom === this.slotName);
      console.log('unassignItemFromSlot', item, slot);
      if (item && slot) {
        this.$store.dispatch('unassignItemFromSlot', {item, slot})
        this.selectedSlot = null;
        this.selectedItem = null;
      }
    },
    findItemsInEmplacements() {
      let currentPerso = this.getCurrentPerso;
      console.log('currentPerso : ', currentPerso);
      let items = [];
      for (let elt of currentPerso.emplacements) {
        if (elt.items.length > 0) {
          for (let eltElement of elt.items) {
            items.push(eltElement);
          }
        }
      }
      return items;
    },
  }
}
</script>

<style>
.assignselect {
  background-color: lightblue;
  margin-left: 3px;
}

.chooseselect {
  background-color: lightgreen;
}

.unassignselect {
  background-color: lightcoral;
  margin-bottom: 5px;
}
</style>