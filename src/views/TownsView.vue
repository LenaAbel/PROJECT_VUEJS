<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <select v-model="selectedTown" @change="$router.push( {name: 'towns', params: { idtown: $event } })" class="persoselect">
          <option disabled value="">Sélectionner une ville</option>
          <option v-for="(town, index) in villes" :key="index" :value="town">{{ town.nom }}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="currentTown" style="text-align: left; width: 80%">
        <h1>{{currentTown.nom.toUpperCase()}}</h1>
        <v-simple-table>
          <tr class="text-center">
            <th>Rues: {{currentTown.rues.length}}</th>
            <th>Boutiques</th>
          </tr>
          <tr v-for="(street, index) in currentTown.rues" :key="index">
            <td>
              <router-link :to="{ name: 'streets', params: { idtown: currentTown.id, idstreet: street.id } }">{{street.nom}} : {{ street.boutiques.length }} boutiques</router-link>
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
        <Shop v-if="$store.state.currentShop != null">

        </Shop>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import CheckedList from "@/components/CheckedList";
import {Town} from "@/datasource/model";

export default {
  name: 'TownsView',
  components: {CheckedList},
  data: () => ({
    filter: '',
    filterActive: false,
    selectedTown: null,
    currentShop: null,
  }),
  computed: {
    Town() {
      return Town
    },
    ...mapState(['villes']),
    ...mapGetters(['currentTown']),
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
    changeRoute(evt) {
      this.$router.push({ name: 'towns', params: { idtown: evt.target.value } })
    },
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