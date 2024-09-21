import {
	createRouter,
	createWebHistory,
	type NavigationGuardNext,
} from "vue-router"
import MainView from "@/views/MainView.vue"
import LoginView from "@/views/LoginView.vue"
import AdminView from "@/views/AdminView.vue"

async function guard(next: NavigationGuardNext) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/admin/get_tables`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.authToken ?? ""}`,
			},
		},
	)
	if (response.status !== 401) {
		next()
		return
	}
	// router.push({
	// 	name: "login",
	// })
	next({ name: "login" })
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "main",
			component: MainView,
		},
		{
			path: "/admin",
			name: "admin",
			component: AdminView,
			async beforeEnter(to, from, next) {
				await guard(next)
			},
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
	],
})

export default router
