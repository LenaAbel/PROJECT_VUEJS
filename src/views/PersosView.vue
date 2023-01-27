<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <!--  lors de la sélection d'un personnage, on appelle la mutation setCurrentPerso(state, perso) afin de mettre à jour le personnage courant. -->
        <select v-model="selected" @change="$store.dispatch('setCurrentPerso', selected)" class="persoselect">
          <option disabled value="">Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{ perso.nom }}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="getCurrentPerso != null" style="text-align: left; width: 80%">
        <PersoCaracs :selected="getCurrentPerso">
          <template #niveau="Niveau">
            Niveau : {{ Niveau.Niveau }}
            <template v-for="i in getCurrentPerso.niveau">
              <v-icon color="blue lighten-2" :key="i" v-if="levelIcons[i]">{{ levelIcons[i] }}</v-icon>
            </template>
          </template>
          <template #vitalite="Vitalite">
            <div>
              Vie & vitalité :
              <div class="progress">
                <v-progress-linear :value="Vitalite.Vie" :max="Vitalite.Vitalite" color="green" height="20" background-color="red">{{Vitalite.Vie}}/{{Vitalite.Vitalite}}</v-progress-linear>
              </div>
            </div>
          </template>
          <template #or="Or">
            <div class="gold">Or: {{ romanConversion(Or.Or) }}<div style="padding-left: 5px"><svg-icon color="yellow " type="mdi" :path="path"></svg-icon></div></div>

          </template>
        </PersoCaracs>
      </div>
    </div>
  </v-container>
</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex'
import PersoCaracs from '@/components/PersoCaracs'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAlphaGCircle } from '@mdi/js';

export default {
  name: 'PersosView',
  components: {PersoCaracs, SvgIcon},
  data: () => ({
    selected: null,
    idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
    selectedItem: null,
    selectedSlot: null,
    path: mdiAlphaGCircle,
    levelIcons: {
      1: 'mdi-heart-circle',
      2: 'mdi-cloud-circle',
      3: 'mdi-water-circle',
      4: 'mdi-star-circle',
      5: 'mdi-star-circle-box',
      6: 'mdi-fire-circle',
      7: 'mdi-eye-circle',
      8: 'mdi-leaf-circle',
    },

  }),
  computed: {
    ...mapState(['persos']),
    ...mapActions(["setCurrentPerso"]),
    ...mapGetters(['getCurrentPerso']),
  },
  methods: {
    romanConversion(number) {
      var roman = "";
      var romanNumeral = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      var numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      for (var i = 0; i < numbers.length; i++) {
        while (number >= numbers[i]) {
          roman += romanNumeral[i];
          number -= numbers[i];
        }
      }
      return roman;
    }
  }
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}

.progress {
  width: 90%;
  margin: 10px;
}

.gold {
  display: inline-flex;
  padding: 10px;
}
</style>