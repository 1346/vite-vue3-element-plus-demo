import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/style/index.scss'

import router from './router'
import store from './store'
import './permission'

createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')
