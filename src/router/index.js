import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AuthService from '../../src/services/AuthService'; // Import your authentication service

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
// Navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const authService = new AuthService(); // Instantiate your authentication service
  const isAuthenticated = authService.isAuthenticated();

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    // If route does not require authentication, proceed
    next();
  }
});

export default router
