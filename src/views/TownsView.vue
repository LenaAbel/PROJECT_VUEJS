<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <select v-model="selected"  @change="navigateToSelectedTown"  class="townselect" >
          <option disabled value="">Sélectionner une ville</option>
          <option v-for="(ville, index) in villesFiltre" :key="index">{{ville.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="selected">
        <router-view name="streets"></router-view>
      </div>

<!--    <div v-if="selected" style="text-align: left; width: 80%">
        <h1>{{getCurrentTown.nom.toUpperCase()}}</h1>
        <v-simple-table>
          <tr class="text-center">
            <th>Rues: {{getCurrentTown.rues.length}}</th>
            <th>Boutiques</th>
          </tr>
          <tr v-for="(street, index) in getCurrentTown.rues" :key="index">
            <td>
            </td>
            <td>
              <CheckedList
                  :data="street.boutiques"
                  :fields="['nom']"
                  :item-button="{show: true, text: 'select'}"
                  @item-button-clicked="shopSelected(index, $event)"
              >
              </CheckedList>
            </td>
          </tr>
        </v-simple-table>
      </div>-->
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
//import CheckedList from "@/components/CheckedList";

export default {
  name: 'TownsView',
  //components: {CheckedList},
  props: {
    idtown: Number
  },
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
    selected: null,
  }),
  computed: {
    ...mapState(['villes']),
    ...mapGetters(['getCurrentTown']),
    villesFiltre() {
      if (this.filterActive) {
        return this.villes.filter(v => v.nom.match(this.filter))
      } else {
        return this.villes
      }
    },
  },
  methods: {
    townSelected(evt) {
      this.filter = evt
      this.currentShop = null // pour enlever la boutique courante affichée si on change de ville
    },
    shopSelected(streetIndex, shopIndex) {
      this.currentShop = this.currentTown.rues[streetIndex].boutiques[shopIndex]
      this.$store.dispatch('setCurrentShop', this.currentShop)
    },
    navigateToSelectedTown(){
      console.log(this.villesFiltre.find(element => element.nom == this.selected)._id )
      //let id = this.villesFiltre.find(element => element.nom == this.selected)._id
      this.$store.dispatch('setCurrentTown', this.villesFiltre.find(element => element.nom == this.selected))
      this.$router.push({
        name: 'streets',
        params: {
          idtown: this.villesFiltre.find(element => element.nom == this.selected)._id
        }
      });
    }
  },
}
</script>

<style>
table, th, td {
  border: 1px solid;
}
.townselect {
  background-color: lightgray;
}
</style>