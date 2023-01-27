<template>
  <v-responsive>
  <h1>Les boutiques </h1>
      <select v-model="selected" @change="setShop" class="townselect">
        <option disabled value="">Sélectionner une boutique</option>
        <option v-for="(shop, index) in selectedStreet.boutiques" :key="index">{{ shop.nom }}</option>
      </select>
    <div v-if="selected">
      <ShopDetails :shop="getCurrentShop"></ShopDetails>
    </div>
    <br>
  </v-responsive>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import ShopDetails from "../components/ShopDetails.vue";

export default {
  name: "ShopView",
  props: {
    idTown: Number,
    idStreet: Number
  },
  components: {
    ShopDetails
  },
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
    selected: null,
  }),
  computed: {
    ...mapState(['villes']),
    ...mapGetters(['getCurrentStreet', 'getCurrentShop', 'getCurrentTown']),
    selectedStreet() {
      console.log('idstreet = ', this.idStreet);
      return this.getCurrentTown.rues.find(r => r._id === this.idStreet);
    }
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
    setShop() {
      console.log(this.getCurrentStreet.boutiques.find(element => element.nom == this.selected));
      this.$store.dispatch('setCurrentShop', this.getCurrentStreet.boutiques.find(element => element.nom == this.selected))
    }
  },
}
</script>

<style scoped>

</style>