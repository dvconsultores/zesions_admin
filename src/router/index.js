import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/trans-history',
    name: 'trans-history',
    component: () => import('@/views/pages/history-transaction/history-transaction.vue'),
  },
  {
    path: '/pages/users-defix',
    name: 'users-defix',
    component: () => import('@/views/pages/users-defix/users-defix.vue'),
  },
  {
    path: '/pages/commissions',
    name: 'commissions',
    component: () => import('@/views/pages/commissions/commissions.vue'),
  },
  {
    path: '/pages/countries',
    name: 'countries',
    component: () => import('@/views/pages/countries.vue'),
  },
  {
    path: '/pages/kyc',
    name: 'kyc',
    component: () => import('@/views/pages/kyc.vue'),
  },
  {
    path: '/pages/fiat',
    name: 'fiat',
    component: () => import('@/views/pages/fiat.vue'),
  },
  {
    path: '/pages/tasa',
    name: 'tasa',
    component: () => import('@/views/pages/tasa.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    // meta: {
    //   layout: 'blank',
    // },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
