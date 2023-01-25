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
      <div v-if="selected" style="text-align: left; width: 80%">
        <h1>{{ selected.nom }}</h1>
        <v-simple-table>
          <tr class="text-center">
            <th>Attributs</th>
            <th>Emplacements</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li><span style="color: darkblue"><b>Niveau :</b></span>{{ selected.niveau }}</li>
                <li><span style="color: green"><b>Vie :</b></span>{{ selected.attributs.vie }}</li>
                <li><b><span style="color: chocolate">Vitalité :</span></b> {{ selected.attributs.vitalite }}</li>
                <li><b><span style="color: red">Force :</span></b> {{ selected.attributs.force }}</li>
                <li><b><span style="color: dimgrey">Armure :</span></b> {{ selected.attributs.protection }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(slot, index) in slots" :key="index">
                  {{ slot.label }} <span v-if="slot.items.length >0">[{{ slot.items.length }}]</span> :
                  <span v-for="(item, index) in slot.items" :key="index">{{ item.nom }}, </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><b> Or : <span style="color: goldenrod">{{ selected.or }}</span></b></td>
            <td>
              <div style="margin-left: 10px; margin-bottom: 10px; margin-top: 10px">
                <CheckedList
                    :data="selected.itemsAchetes"
                    :fields="['nom','type']"
                    :checked="checkedBoughtItems"
                    item-check
                    :item-button="{show: true, text: 'price'}"
                    :list-button="{show: true, text: 'Infos'}"
                    @checked-changed="toggleItem"
                    @item-button-clicked="showItemPrice"
                    @list-button-clicked="showItemsInfo"
                >
                </CheckedList>
                <br>

                <h3>Sélectionner un item à revendre :</h3>
                <select v-model="selectedItem" @change="resellItems()" class="persoselect">
                  <option disabled value="">Sélectionner un item</option>
                  <option v-for="(item, index) in selected.itemsAchetes" :key="index" :value="item">{{ item.nom }}
                  </option>
                </select>


                <h3><span style="color: lightgreen">ASSIGNER </span> UN OBJET</h3>
                <select v-model="selectedItem" class="chooseselect">
                  <option disabled value="" selected>Sélectionner un item</option>
                  <option v-for="(item, index) in selected.itemsAchetes" :key="index" :value="item">{{ item.nom }}
                  </option>
                </select>
                <select v-model="selectedSlot" @click="assignItemToSlot(selectedItem, selectedSlot)"
                        class="assignselect">
                  <option disabled value="" selected>Sélectionner un emplacement</option>
                  <option v-for="(slot, index) in slots" :key="index" :value="slot">{{ slot.label }}</option>
                </select>
                <br>
                <h3><span style="color: lightcoral">DESASSIGNER </span> UN OBJET</h3>
                <!--affiché dans le dropdown tous les items-->
                <select v-model="selectedItem" class="unassignselect" @change="unassignItemFromSlot(selectedItem, selectedSlot)">
                  <option disabled value="" selected>Sélectionner un item</option>
                  <option v-for="(item, index) in findItemsInEmplacements()" :key="index" :value="item">{{ item.nom }}</option>
                </select>

                <select v-model="selectedSlot" @change="unassignItemFromSlot(selectedItem, selectedSlot)"
                        class="assignselect">
                  <option disabled value="" selected>Sélectionner un emplacement</option>
                  <option v-for="(slot, index) in slots" :key="index" :value="slot">{{ slot.label }}</option>
                </select>
                <br>
              </div>
            </td>
          </tr>
        </v-simple-table>
      </div>
    </div>
  </v-container>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import CheckedList from "@/components/CheckedList";

export default {
  name: 'PersosView',
  components: {CheckedList},
  data: () => ({
    selected: null,
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
    selectedItem: null,
    selectedSlot: null,

  }),
  computed: {
    ...mapState(['persos']),
    ...mapActions(["setCurrentPerso"]),
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