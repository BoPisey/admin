import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  { 
    path: '/', 
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue')
      },
 
      {
        path: '/customer',
        name: 'Customer',
        component: () => import('@/views/customer/List.vue'),
      },
      {
        path: '/puchase',
        name: 'Puchase',
        component: () => import('@/views/purchase/List.vue'),
      },
    ],
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: () => import('@/views/login.vue') 
},

];


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
