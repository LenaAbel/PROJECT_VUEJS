<template>
  <v-app>
    <v-app-bar app color="#935840" dark rounded>
      <b-navbar-brand href="http://localhost:8080" class="ms" >
        <img src="https://cdn-icons-png.flaticon.com/512/2619/2619285.png"
             alt="LOGO" width="45" height="40" class="d-inline-block rounded align-text-top" style="zoom: 120%">
      </b-navbar-brand>
      <NavBar :titles="titles">
        <template #link-to="link">
          <v-btn style="margin: 10px" :color="link.link.color">{{link.link.text}} <svg-icon v-if="link.link.text === 'Personnages'" type="mdi" :path="path"></svg-icon><span v-else-if="link.link.text === 'Villes'" class="mdi mdi-home-city"></span>           </v-btn>
        </template>
      </NavBar>
      <b-nav-item disabled right>
        <span>RPG</span>
      </b-nav-item>
    </v-app-bar>
    <v-main>
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'
import NavBar from "@/components/NavBar";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';


export default {
  name: 'App',
  components: {NavBar, SvgIcon},
  data: () => ({
    titles: [ {text:'Personnages', color: '#39D3AB', path: '/persos'},
      {text:'Villes', color: '#D36439', path: '/towns'},
    ],
    currentIndex: -1,
    path: mdiAccount,
  }),
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs'])
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>
<style scoped>

@import '../src/css/main.css';
</style>