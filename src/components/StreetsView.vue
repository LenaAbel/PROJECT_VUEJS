<template>
    <div>
        <h1>LESGO</h1>
    </div>
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
        navigateToSelectedTown(){
        console.log(this.selected)
        this.$store.dispatch('setCurrentTown', this.villesFiltre.find(element => element.nom == this.selected))
        this.$router.push({ name: 'town', params: { idtown: this.villesFiltre.find(element => element.nom == this.selected)._id } });
        }
    },
    }
</script>

<style></style>