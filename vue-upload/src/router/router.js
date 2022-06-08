import VueRouter from 'vue-router'

export const routes = [
    {
      path: '/pic-upload',
      name: 'pic-upload',
      component: () => import('../views/pic-upload')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    }
]
const createRouter = () => new VueRouter({routes})

const router = createRouter()

export default router
