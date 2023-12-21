import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/pages/transactions',
    name: 'transactions',
    component: () => import('@/views/pages/transactions/Transactions.vue'),
  },
  {
    path: '/pages/users-sezions',
    name: 'users-sezions',
    component: () => import('@/views/pages/users-sezions/UsersSezions.vue'),
  },
  {
    path: '/pages/commissions',
    name: 'commissions',
    component: () => import('@/views/pages/commissions/Commissions.vue'),
  },
  {
    path: '/pages/countries',
    name: 'countries',
    component: () => import('@/views/pages/Countries.vue'),
  },
  {
    path: '/pages/kyc',
    name: 'kyc',
    component: () => import('@/views/pages/KYC.vue'),
  },
  {
    path: '/pages/fiat',
    name: 'fiat',
    component: () => import('@/views/pages/Fiat.vue'),
  },
  {
    path: '/pages/tasa',
    name: 'tasa',
    component: () => import('@/views/pages/Tasa.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
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
