<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <input type="checkbox"
             v-if="itemCheck"
             :checked="checked[indexRow]"
             @click="$emit('checked-changed',indexRow)">
      <slot name="item" :item="item" :indexRow="indexRow" v-for="(field, index) in fields" :key="index">
        {{item[field]}}
      </slot>
      <span v-if="itemButton && itemButton.show" color="blue"  @click="$emit('item-button-clicked',indexRow)"><slot name="item-button" :item="item" :indexRow="indexRow">{{itemButton.text}}</slot></span>
    </p>
    <span v-if="listButton && listButton.show" color="green" @click="$emit('list-button-clicked')"><slot name="list-button">{{listButton.text}}</slot></span>
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