<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <!--  lors de la sélection d'un personnage, on appelle la mutation setCurrentPerso(state, perso) afin de mettre à jour le personnage courant. -->
        <select v-model="selected"  @change="$store.dispatch('setCurrentPerso', selected)"  class="persoselect" >
          <option disabled value="">Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{perso.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="selected" style="text-align: left; width: 80%">
        <h1>{{selected.nom}}</h1>
        <v-simple-table>
          <tr class="text-center">
            <th>Attributs</th>
            <th>Emplacements</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li><span style="color: darkblue"><b>Niveau :</b></span>{{ selected.niveau}}</li>
                <li><span style="color: green"><b>Vie :</b></span>{{ selected.attributs.vie}}</li>
                <li><b><span style="color: chocolate">Vitalité :</span></b> {{ selected.attributs.vitalite}}</li>
                <li><b><span style="color: red">Force :</span></b> {{ selected.attributs.force}}</li>
                <li><b><span style="color: dimgrey">Armure :</span></b> {{ selected.attributs.protection}}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(slot, index) in slots" :key="index">
                  {{ slot.label }} <span v-if="slot.items.length >0">[{{slot.items.length}}]</span> :
                  <span v-for="(item, index) in slot.items" :key="index">{{item.nom}}, </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td><b> Or : <span style="color: goldenrod">{{selected.or}}</span></b></td>
            <td>
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
  }),
  computed: {
    ...mapState(['persos']),
    // ...mapMutations(["setCurrentPerso"]),
    ...mapActions(["setCurrentPerso"]),
    checkedBoughtItems() {
      if (this.selected === null) return []
      // construit un tableau contenant autant de cases qu'il y a d'items achetés
      // chaque case contient true/false en fonction du fait que l'item est sélectionné ou non
      let tab = []
      for(let i=0;i<this.selected.itemsAchetes.length;i++) {
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
        slot.label = 'tête'
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
        return tab
      }
      return []
    },
  },
  methods: {
    showItemPrice(index) {
      alert(this.selected.itemsAchetes[index].nom+' : '+ this.selected.itemsAchetes[index].prix)
    },
    showItemsInfo() {
      let items = ""
      this.idSelectedBoughtItems.forEach(e => items += ' '+this.selected.itemsAchetes[e].nom)
      alert(items)
    },
    toggleItem(index) {
      let id = this.idSelectedBoughtItems.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedBoughtItems.push(index)
      }
      else {
        // enleve index
        this.idSelectedBoughtItems.splice(id,1)
      }
    },
    // onChange() {
    //   console.log(this.selected)
    //   this.$store.
    //   return this.$store.dispatch("setCurrentPerso", this.selected)
    //   // this.$store.ge
    // }
  },
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}
</style>