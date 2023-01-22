<template>
  <div>
    <v-btn v-for="(but, index) in titles" :key="index" :color="but.color" @click="navigate(but.text)">
      {{but.text}}
    </v-btn>
  </div>
</template>

<script>
import router from '../router/index'

export default {
  name: "NavBar",
  props: { titles: Array },
  methods: {
    navigate(path) {
      router.push(`/${path}`)
    }
  }
}
</script>

<style scoped>

</style>