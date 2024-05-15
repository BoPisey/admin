import { createRouter, createWebHashHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout';

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
        name: 'CustomerList',
        component: () => import('@/views/customer/List.vue'),
      },
      {
        path: '/customer/create', // Corrected path
        name: 'CustomerCreate', // Unique name
        component: () => import('@/views/customer/Create.vue'),
      },
      {
        path: '/purchase', // Corrected typo in path
        name: 'PurchaseList', // Unique name
        component: () => import('@/views/purchase/List.vue'),
      },
      {
        path: '/purchase/create', // Corrected typo in path
        name: 'PurchaseCreate', // Unique name
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
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
