<template>
  <div>
    <span v-for="(but, index) in titles" :key="index" :color="but.color" @click="goTo(index)">
      <slot name="link-to" :link="but"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array},
  methods: {
    navigate(path) {
      this.$router.push(path)
    },
    goTo(index) {
      this.$emit('menu-clicked', index);
      this.navigate(this.titles[index].path);
    }
  }
}
</script>

<style scoped>

</style>