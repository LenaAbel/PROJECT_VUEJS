<template>
  <v-container>

      <!-- partie gauche -->
      <div style="text-align: left; width: 30%;">
        <h1>Les villes</h1>
        <select style="background-color: #C4A693;" v-model="selected"  @change="navigateToSelectedTown"  class="townselect" >
          <option disabled value="">Sélectionner une ville</option>
          <option v-for="(ville, index) in villesFiltre" :key="index">{{ville.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="selected">
        <router-view name="streets"></router-view>
      </div>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'TownsView',
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
      // console.log('navigateToSelectedTown ',this.villesFiltre.find(element => element.nom == this.selected)._id )
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

select {
  background-color: #C4A693;
  color: #512B1D;
  font-weight: 800;
  border-radius: 10px;
  font-size: large;
  align-items: center;
}
</style>