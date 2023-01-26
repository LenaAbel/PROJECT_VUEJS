<template>
    <div>
        <div>
            <div>{{ slotName }}</div>
            <!-- <span v-for="(item, index) in slot.items" :key="index">{{ item.nom }}, </span> -->
        </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';



export default {
    props: ['slotName'],
    computed: {
        ...mapGetters(['getCurrentPerso']),
        slot() {
            console.log('this.name SlotEdit',this.slotName);
            console.log('emplqcementsslotedit',this.currentPersos.emplacements.find(element => element.nom === this.name));
            // console.log(this.getCurrentPerso.emplacements[this.slotConstants.indexOf(this.name)]);
            return this.getCurrentPerso.emplacements
        }
    },
    created(){
        console.log("ratooii")
    }

}
</script>

<style></style>