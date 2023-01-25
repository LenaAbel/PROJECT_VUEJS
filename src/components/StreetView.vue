<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les rues</h1>
        <select v-model="selected" class="persoselect">
          <option disabled value="">Sélectionner une rue</option>
          <option v-for="(rue, index) in rue" :key="index" :value="rue">{{ rue.nom }}</option>
        </select>



        <label for="filteractive">Filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <label for="filtertown">Filtre : </label><input class="townselect" :value="filter" @input="townSelected($event.target.value)" id="filtertown">
        </div>
        <ul v-if="filterActive">
          <li v-for="(ville, index) in villesFiltre" :key="index">
            <router-link :to="{ name: 'towns', params: { idtown: index } }">{{ville.nom}}</router-link>
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
export default {
  name: "StreetView",
  props: {
    idTown: Number
  }
}
</script>

<style scoped>

</style>