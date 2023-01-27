<template>
  <v-app>
    <v-app-bar app color="primary" dark rounded>
      <NavBar :titles="titles">
        <template #link-to="link">
          <v-btn :color="link.link.color">{{link.link.text}} <svg-icon v-if="link.link.text === 'Personnages'" type="mdi" :path="path"></svg-icon> <span v-else-if="link.link.text === 'Villes'" class="mdi mdi-home-city"></span>           </v-btn>
        </template>
      </NavBar>
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
    titles: [ {text:'Personnages', color: 'blue', path: '/persos'},
      {text:'Villes', color: 'red', path: '/towns'},
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