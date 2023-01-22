import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import ShopDetails from '../components/ShopDetails.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    component: TownsView
  },
  {
    path: '/persos',
    name: 'persos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PersosView.vue')
  },
  {
    path: '/town/:id',
    name: 'town',
    component: TownsView,
    props: (route) => ({
      id: parseInt(route.params.id)
    })
  },
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
