<template>
<<<<<<< Updated upstream
    <div>
        <h1>LESGO</h1>
    </div>
=======
    <v-container>
        <div style="text-align: left; width: 50%">
            <h1>Les rues</h1>
            <select v-model="selected"  @change="navigateToSelectedStreet"  class="townselect" >
                <option disabled value="">Sélectionner une rue</option>
                <option v-for="(street, index) in selectedTown.rues" :key="index">{{street.nom}}</option>
            </select>
        </div>
        <router-view name="shops"></router-view>
    </v-container>
>>>>>>> Stashed changes
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'StreetsView',
<<<<<<< Updated upstream
    props: ['idtown'],
    created() {
        console.log(this.idtown)
    },
=======
    props: ['idTown'],
>>>>>>> Stashed changes
    data: () => ({
        filter: '',
        filterActive: false,
        currentShop: null,
        selected: null,
    }),
    computed: {
        ...mapState(['villes']),
        ...mapGetters(['getCurrentTown']),
<<<<<<< Updated upstream
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
        console.log(this.selected)
        this.$store.dispatch('setCurrentTown', this.villesFiltre.find(element => element.nom == this.selected))
        this.$router.push({ name: 'town', params: { idtown: this.villesFiltre.find(element => element.nom == this.selected)._id } });
        }
    },
    }
=======
        selectedTown() {
            console.log(this.villes.find(v => v._id === this.idTown));
            return this.villes.find(v => v._id === this.idTown)
        }
    },
    methods: {
    },
}
>>>>>>> Stashed changes
</script>

<style></style>