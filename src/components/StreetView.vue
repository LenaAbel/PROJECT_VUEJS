<template>
  <v-container>
    <div style="text-align: left; width: 50%">
      <h1>Les rues de {{selectedTown.nom}}</h1>
      <select v-model="selected"  @change="navigateToSelectedStreet"  class="townselect" >
        <option disabled value="">Sélectionner une rue</option>
        <option v-for="(street, index) in selectedTown.rues" :key="index">{{street.nom}}</option>
      </select>
    </div>

    <router-view name="shops"></router-view>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'StreetsView',
  props: ['idTown'],
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
    selected: null,
  }),
  computed: {
    ...mapState(['villes']),
    ...mapGetters(['getCurrentTown']),
    selectedTown() {
      // console.log('idtown = ', this.idTown);
      return this.villes.find(v => v._id === this.idTown)
    }
  },
  methods: {
    navigateToSelectedStreet(){
      console.log('selected street=',this.selected)
      console.log(this.villes.find(element => element._id == this.getCurrentTown._id).rues.find(element => element.nom == this.selected));
      let currentStreet = this.villes.find(element => element._id == this.getCurrentTown._id).rues.find(element => element.nom == this.selected)
      this.$store.dispatch('setCurrentStreet', currentStreet)
      this.$router.push({name: 'shops', params: {idstreet: currentStreet._id}})
    }
  },
}
</script>

<style></style>