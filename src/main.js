import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/config.css'
import '@/assets/css/base.css'
import '@/assets/iconfont/iconfont.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { vue3ScrollSeamless } from "vue3-scroll-seamless";

createApp(App).use(store).use(router).use(ElementPlus).component('vue3ScrollSeamless', vue3ScrollSeamless).mount('#app')
