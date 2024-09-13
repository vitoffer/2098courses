import { createRouter, createWebHistory } from "vue-router"
import MainView from "@/views/MainView.vue"
import LoginView from "@/views/LoginView.vue"
import AdminView from "@/views/AdminView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
		{
			path: '/admin',
			name: 'admin',
			component: AdminView,
		},
		{
			path: '/admin/login',
			name: 'login',
			component: LoginView,
		}
  ]
})

export default router
