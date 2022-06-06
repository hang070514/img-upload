import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/'
    },
    {
        path: '/pic-upload',
        name: 'pic-upload',
        component: () => import('../views/pic-upload.vue')
    }
]
const createRouter = () => new VueRouter({routes: routes})
const router = createRouter

export default router
