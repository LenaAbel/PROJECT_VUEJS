<template>
  <div>
    <v-btn v-for="(but, index) in titles" :key="index" :color="but.color" @click="navigate(but.path)">
      {{but.text}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array},
  methods: {
    navigate(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>