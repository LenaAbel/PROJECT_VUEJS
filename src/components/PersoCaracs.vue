<template>
  <v-container>
    <h1 style="text-align: center;">{{ selected.nom }}</h1>
    <v-simple-table>
      <tr class="text-center">
        <th>Attributs</th>
        <th>Emplacements</th>
      </tr>
      <tr>
        <td>
          <v-card
              class="mx-auto"
              max-width="400"
              tile>
            <v-list dense>
              <v-subheader style="text-align: center; zoom: 150%; font-weight: bold">{{ selected.nom }}
                <v-avatar v-if="selected.nom === 'Conan'" style="zoom: 70%; margin: 10px; ">
                  <img src="data:image/jpeg;base64,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">
                </v-avatar>
                <v-avatar v-else-if="selected.nom === 'Xena'" style="zoom: 70%; margin: 10px;">
                  <img src="http://www.topkool.com/fr/wp-content/uploads/2012/08/xena-la-guerriere-001.jpg">
                </v-avatar>
              </v-subheader>

              <v-list-item-group>
                <div style="align-content: center; margin: 10px">
                  <span class="mdi mdi-account-circle"></span><span><slot name="niveau" style="align-content: center" :Niveau="selected.niveau"></slot></span><br>
                  <span><slot name="vitalite" style="align-content: center" :Vitalite="selected.attributs.vitalite" :Vie="selected.attributs.vie"></slot></span>
                  <span class="mdi mdi-account-multiple-plus"></span>
                  <span> Force :</span> {{ selected.attributs.force }}
                  <span class="mdi mdi-chess-knight"></span><span>Armure :</span> {{ selected.attributs.protection }}
                </div>
              </v-list-item-group>
            </v-list>
          </v-card>
        </td>
        <td>

          <ul>
            <ul v-for="(slot, index) in slots" :key="index">
              <v-btn style="margin: 10px" @click="navigateToSlot(slot.nom)" :key="index">{{ slot.label }}</v-btn>
              <span v-for="(item, index) in slot.items" :key="index">{{ item.nom }}, </span>
            </ul>
          </ul>
        </td>
      </tr>
      <tr>
        <td><b><slot name="or" :Or="selected.or"></slot></b></td>
        <!--<td><b> Or : <span style="color: goldenrod">{{ selected.or }}</span></b></td>-->
        <td>
          <div style="margin-left: 10px; margin-bottom: 10px; margin-top: 10px">

            <CheckedList
              :data="selected.itemsAchetes"
              :fields="['nom', 'type']"
              :checked="checkedBoughtItems"
              item-check
              :item-button=true
              :list-button=true
              @checked-changed="toggleItem"
              @item-button-clicked="showItemPrice"
              @list-button-clicked="showItemsInfo">
            <template v-slot:list-button>
              <v-btn color="#5BDDB3" @click="showItemsInfo">
                Infos
              </v-btn> 
            </template> 
            <template  v-slot:item="{item}">
              <div style="margin: 15px;">{{item.nom}} : {{ item.type }}</div>
            </template>
            <template v-slot:item-button="{item}">
              <v-btn color="#C4A693" @click="showItemPrice(item)">
                Prix
              </v-btn> 
            </template>
          </CheckedList>
            <v-divider inset style="margin: 30px; color: #512B1D"></v-divider>

            <h4 style="margin: 15px; color: #5BDDB3">Sélectionner un item à revendre :</h4>
            <select v-model="selectedItem" @change="resellItems()" class="persoselect">
              <option disabled value="">Sélectionner un item</option>
              <option v-for="(item, index) in selected.itemsAchetes" :key="index" :value="item">{{ item.nom }}
              </option>
            </select>


            <h4 style="margin: 15px;"><span style="color: #5BDDB3">ASSIGNER </span> UN OBJET</h4>
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

            <div v-if="navigateToSlot">
              <router-view name="slot"></router-view>
            </div>
          </div>
        </td>
      </tr>
    </v-simple-table>
  </v-container>
</template>

<script>
import CheckedList from "@/components/CheckedList.vue";
import {mapActions, mapState, mapGetters} from "vuex";

export default {
  name: "PersoCaracs",
  components: {CheckedList},
  props: {
    selected: Object,
  },
  data: () => ({
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
    selectedItem: null,
    selectedSlot: null,
    slotButton: null,
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
        return tab
      }
      return []
    },
  },
  methods: {
    showItemPrice(itemName) {
      alert(this.selected.itemsAchetes.find(e => e.nom == itemName.nom).nom + ' : ' + this.selected.itemsAchetes.find(e => e.nom == itemName.nom).prix)
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
    navigateToSlot(slotName) {
      console.log(slotName);
      this.$router.push({name: 'slot', params: {name: slotName}})}
  },
}
</script>

<style scoped>

.assignselect {
  background-color: #5BDDB3 ;
  margin-left: 3px;
  color: #512B1D;
  font-weight: 800;
  border-radius: 10px;
  font-size: large;
  margin-bottom: 5px;
}

.chooseselect {
  background-color: #C4A693;
  margin-left: 3px;
  color: #512B1D;
  font-weight: 800;
  border-radius: 10px;
  font-size: large;
  margin-bottom: 5px;
}


</style>