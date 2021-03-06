import { createRouter, createWebHashHistory } from "vue-router";

const home = () => import('../views/Home.vue')
const login = () => import('../views/Login.vue')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router