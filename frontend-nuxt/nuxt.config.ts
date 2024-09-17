// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura"

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiUrl: process.env.BASE_API_URL,
		},
	},
	srcDir: "src/",
	modules: ["@pinia/nuxt", "@primevue/nuxt-module"],
	primevue: {
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: ".my-app-dark",
				},
			},
		},
		composables: {
			include: ["useConfirm"],
		},
	},
	css: ["primeicons/primeicons.css", "@/assets/styles/main.css"],
})
