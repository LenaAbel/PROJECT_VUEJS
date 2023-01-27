<template>
  <div>
    <v-simple-table v-if="shop" >
      <tr class="text-center">
        <td colspan="2"><b> <span style="color: cornflowerblue;">{{shop.nom.toUpperCase()}}</span></b></td>
      </tr>
      <tr class="text-center">
        <td><b>Stock :</b> {{shop.itemStock.length}} items</td>
        <td><b>Sur commande :</b> {{shop.itemCommande.length}} items</td>
      </tr>
      <tr>
        <td>
          <CheckedList 
            :data="itemsStock" 
            :fields="['text']" 
            :checked="checkedItemsStock" 
            item-check 
            item-button=true
            :list-button=true 
            @checked-changed="toggleItemStock" 
            @item-button-clicked="buyOneItem"
            @list-button-clicked="buySelectedItems"> 
            <template v-slot:list-button>
              <v-btn color="green" @click="buySelectedItems">
                Buy all 
              </v-btn> 
            </template> 
            <template v-slot:item="{item}">
              <div>{{item.text}}</div>
            </template>
            <template v-slot:item-button="{item, index}">
              <v-btn :color="index % 2 === 0 ? 'red': 'blue'" @click="buyOneItem(item)">
                Buy
              </v-btn> 
            </template>
          </CheckedList>
        </td>
        <td>
          <CheckedList
              :data="itemsCommande"
              :fields="['text']"
              :item-button=true
              @item-button-clicked="orderOneItem"
          >
            <template v-slot:item="{item}">
              <div>{{item.text}}</div>
            </template>
            <template v-slot:item-button="{item, index}">
              <v-btn :color="index % 2 === 0 ? 'red': 'blue'" @click="orderOneItem(item)">
                Order
              </v-btn> 
            </template>
          </CheckedList>
        </td>
      </tr>
    </v-simple-table>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList";
export default {
  name: "ShopDetails",
  components: {CheckedList},
  props: {
    shop: Object
  },
  data: () => ({
    idSelectedItemsStock: []
  }),
  computed: {
    checkedItemsStock() {
      let tab = []
      for(let i=0;i<this.shop.itemStock.length;i++) {
        if (this.idSelectedItemsStock.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    // d'après l'énoncé, chaque item apparaît sous la forme nom : prix po.
    // il n'est donc pas possible d'utiliser directement les champs d'un item dans CheckedList,
    // puisque les : et le po sont des données statiques externes aux tableaux d'items de la boutique.
    // C'est pourpqui les 2 fonctions suivantes recalculent un noveau tableau avec le texte qui va bien.
    itemsStock() {
      console.log(this.shop.itemStock.map(e => ({text: e.nom+' : '+e.prix+' po'}) ));
      return this.shop.itemStock.map(e => ({text: e.nom+' : '+e.prix+' po', nom: e.nom}) )
    },
    itemsCommande() {
      console.log(this.shop.itemCommande)
      return this.shop.itemCommande.map(e => {
        e.time = (Math.floor(Math.random() * 8000) + 2000)/1000
        return {text: e.nom+' : '+ e.time +' secondes', nom: e.nom, time: e.time}
      })
    }
  },
  methods: {
    toggleItemStock(index) {
      let id = this.idSelectedItemsStock.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedItemsStock.push(index)
      }
      else {
        // enleve index
        this.idSelectedItemsStock.splice(id,1)
      }
    },
    buyOneItem(itemName) {
      if (this.shop.itemStock.find(element => element.nom == itemName.nom).prix <= this.$store.getters.currentGoldPerso) {
        this.$store.dispatch("buyingItem",this.shop.itemStock.find(element => element.nom == itemName.nom))
        console.log('achat de ' + this.shop.itemStock.find(element => element.nom == itemName.nom).nom)
      } else {
        alert('Vous n\'avez pas assez d\'argent pour acheter cet objet.')
      }
    },
    buySelectedItems() {
      let sum = 0
      for (let i = 0; i < this.idSelectedItemsStock.length; i++) {
        sum += this.shop.itemStock[this.idSelectedItemsStock[i]].prix
      }
      if (sum <= this.$store.getters.currentGoldPerso) {
        for (let i =0; i < this.idSelectedItemsStock.length; i++) {
          this.$store.dispatch("buyingItem", this.shop.itemStock[this.idSelectedItemsStock[i]])
          console.log('achat de ' + this.shop.itemStock[this.idSelectedItemsStock[i]])
        }
      } else {
        alert('Vous n\'avez pas assez d\'argent pour acheter ces objets.')
      }
    },
    // Lorsqu'une boutique est choisie, on peut cliquer sur les boutons des items à commander.
    // Dans ce cas, un message d'alerte indique dans combien de secondes l'item sera disponible à la vente, ce temps étant tiré aléatoirement entre 2 et 10 secondes.
    // Cette opération ne devant pas bloquer le navigateur, il faut qu'elle soit implémentée sous la forme d'une action + mutation dans le store.
    orderOneItem(itemName) {
      let time = itemName.time
      if(confirm(`L'item sera disponible dans ${itemName.time} secondes. Voulez-vous continuer?`)){
        this.$store.dispatch('order', { time, item: this.shop.itemCommande.find(e => e.nom == itemName.nom) })
      }
    },
  },
  watch: {
    // Si on change de boutique, le tableau idSelectedItemStock ne va pas changer.
    // Il y a donc toujours des items sélectionnés quand on clique sur une nouvelle boutique.
    // Cela peut amener une erreur si leur indice n'existe pas. Il faut donc vider ce tableau,
    // mais comme c'est une variable locale, le seul moyen de le modifier "simplement" en cas
    // de changement de boutique, c'est d'observer un changement de la props shop grâce à un watcher.
    shop() {
      this.idSelectedItemsStock.splice(0)
    }
  }
}
</script>

<style scoped>

</style>