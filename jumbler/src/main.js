import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '../public/index.css'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
