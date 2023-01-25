import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import PersosView from "../views/PersosView.vue";
import streetView from "@/components/StreetView";
import shopView from "@/components/ShopView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/towns',
    name: 'towns',
    components: {
      central : TownsView
    },
    children : [
      {
        path : ':idtown',
        components: {
          streets: streetView
        },
        props: {
          streets: route => ({
            idTown: route.params.idtown
          })
        },
        children: [
          {
            path: '/streets/:idstreet',
            components: {
              shops: shopView
            },
            props: {
              shops: route => ({
                idTown: route.params.idtown,
                idStreet: route.params.idstreet
              })
            }
          }
        ]
      }
    ]

  },
  {
    path: '/persos',
    name: 'persos',
    components: {
      central : PersosView
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router