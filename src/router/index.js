import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import ShopDetails from '../components/ShopDetails.vue'
import StreetsView from '../components/StreetsView.vue'
import PersosView from '../views/PersosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    component: TownsView,
    children: [
      {
        path: ':idtown',
<<<<<<< Updated upstream
        component: StreetsView,
        name: 'streets',
        props : true
=======
        components: {streets: StreetsView},
        name: 'streets',
        props: {
          streets: route => ({ idTown: route.params.idtown })
        },
>>>>>>> Stashed changes
      },
    ]
  },
  {
    path: '/persos',
    name: 'persos',
    component: PersosView
  },
  /*{
    path: '/towns/:idtown',
    name: 'town',
    component: TownsView,
    children: [
      {
        path: ':id',
        component: StreetsView,
        name: 'Streets',
        props : true
      },
    ]
  },*/
  {
    path: '/town/:townId/street/:streetId',
    name: 'street',
    component: TownsView
  },
  {
    path: '/town/:townId/street/:streetId/shop/:shopId',
    name: 'shop',
    component: ShopDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
