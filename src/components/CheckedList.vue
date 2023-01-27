<template>
  <div style="margin: 10px">
    <p v-for="(item, indexRow) in data" :key="indexRow" class="d-flex">
      <input type="checkbox" v-if="itemCheck" :checked="checked[indexRow]" @click="$emit('checked-changed', indexRow)">
      <slot style="margin: 15px" name="item" :item="item" :index="indexRow"></slot>
      <span>
        <slot style="margin: 15px" name="item-button" :item="item" :index="indexRow"></slot>
      </span>
    </p>
    <span>
      <slot style="margin: 15px" name="list-button"></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "CheckedList",
  props: {
    data: Array, // les données sources
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Boolean, // l'objet pour les boutons d'items
    listButton: Boolean, // l'objet pour le bouton de liste
  },
  data : () => {
    return {
    }
  }
}
</script>