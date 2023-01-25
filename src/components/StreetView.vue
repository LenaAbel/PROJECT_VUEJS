<template>
  <v-container>
    <div style="text-align: left; width: 50%">
      <h1>Les rues</h1>
      <select v-model="selected"  @change="navigateToSelectedStreet"  class="townselect" >
        <option disabled value="">Sélectionner une rue</option>
        <option v-for="(street, index) in getCurrentTown.rues" :key="index">{{street.nom}}</option>
      </select>
    </div>

    <router-view name="shops"></router-view>
<!--
    <div v-if="selected" style="text-align: left; width: 80%">
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'StreetsView',
  props: ['idtown'],
  created() {
    console.log(this.idtown)
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
    navigateToSelectedStreet(){
      console.log(this.selected)
      this.$store.dispatch('setCurrentStreet', this.villesFiltre.find(element => element.nom === this.selected))
      this.$router.push({name: 'street', params: {idstreet: this.getCurrentTown.rues.id}})
    }
  },
}
</script>

<style></style>