import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import ManualEntry from './components/ManualEntry.vue'
import FileEntry from './components/FileEntry.vue'
import JumblerComp from './components/JumblerComp.vue'

const routes = [
    {
        name: 'LandingPage',
        component: LandingPage,
        path: '/',
    },

    {
        name: 'ManualEntry',
        component: ManualEntry,
        path: '/manual'
    },

    {
        name: 'FileEntry',
        component: FileEntry,
        path: '/file'
    },

    {
        name: 'JumblerComp',
        component: JumblerComp,
        path: '/jumbler'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router