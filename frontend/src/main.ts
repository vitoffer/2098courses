import 'primeicons/primeicons.css'
import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import Aura from '@primevue/themes/aura';

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
				darkModeSelector: '.my-app-dark',
		}
	}
})

app.use(ConfirmationService);

app.mount('#app')
