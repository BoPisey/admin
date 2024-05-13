import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import AuthService from '../../src/services/AuthService';

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/login',
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
        path: '/customer/create',
        name: 'Create',
        component: () => import('@/views/customer/Create.vue'),
      },
      {
        path: '/puchase',
        name: 'Puchase',
        component: () => import('@/views/purchase/List.vue'),
      },
      {
        path: '/puchase/create',
        name: 'Create',
        component: () => import('@/views/purchase/Create.vue'),
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