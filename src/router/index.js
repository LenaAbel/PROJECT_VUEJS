import Vue from 'vue'
import VueRouter from 'vue-router'
import TownsView from '../views/TownsView.vue'
import PersosView from "../views/PersosView.vue";
import StreetsView from "@/components/StreetView";
import shopView from "@/components/ShopView";
import SlotEdit from "@/components/SlotEdit.vue";


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
        name: 'streets',
        components: {
          streets: StreetsView
        },
        props: {
          streets: route => ({ idTown: route.params.idtown}
          )
        },
        children: [
          {
            path: 'streets/:idstreet',
            name: 'shops',
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
    },
    children : [
      {
        path: 'slot/:name',
        name: 'slot',
        components: { slot: SlotEdit},
        props: {
            slot: route => ({ slotName: route.params.name})
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router