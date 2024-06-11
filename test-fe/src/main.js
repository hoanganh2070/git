import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from './presets/lara';
import ToastService from 'primevue/toastservice';

createApp(App).use(router).use(
    PrimeVue,
    {
        unstyled: true,
        pt: Lara
    }

).use(ToastService).mount('#app');
