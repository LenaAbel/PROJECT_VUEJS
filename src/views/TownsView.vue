<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <label for="filteractive">Filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <label for="filtertown">Filtre : </label><input class="townselect" :value="filter" @input="townSelected($event.target.value)" id="filtertown">
        </div>
        <ul>
          <li v-for="(ville, index) in villesFiltre" :key="index">
            <router-link :to="{ name: 'town', params: { id: index } }">{{ville.nom}}</router-link>
          </li>
        </ul>
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
              <router-link :to="{ name: 'street', params: { townId: currentTown.id, streetId: street.id } }">{{street.nom}} : {{ street.boutiques.length }} boutiques</router-link>
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
        <router-view />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import CheckedList from "@/components/CheckedList";

export default {
  name: 'TownsView',
  components: {CheckedList},
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
  }),
  computed: {
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