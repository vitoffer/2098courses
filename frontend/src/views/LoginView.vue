<script setup lang="ts">
import { ref } from "vue"

const username = ref<string>()
const password = ref<string>()

async function tryLogin() {
	const formData = new FormData()
	formData.append("username", username.value!)
	formData.append("password", password.value!)

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/auth/token`,
		{
			method: "POST",
			body: formData,
		},
	)

	const data = await response.json()

	if (data.access_token) {
		localStorage.setItem("authToken", data.access_token)
		window.location.href = "/admin"
		return
	}
}
</script>

<template>
	<form
		@submit.prevent="tryLogin"
		id="loginForm"
		class="form"
	>
		<input
			class="base-input"
			type="text"
			placeholder="Логин"
			v-model="username"
			autocomplete="username"
		/>
		<input
			class="base-input"
			type="password"
			placeholder="Пароль"
			v-model="password"
			autocomplete="current-password"
		/>
		<button
			class="button"
			type="submit"
		>
			ОК
		</button>
	</form>
</template>

<style scoped lang="scss">
.base-input {
	width: 100%;
}

.form {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	width: 400px;
	margin: 0 auto;
}

.button {
	display: inline-block;
	width: max-content;
	padding: 4px 8px;
	border-radius: 5px;
	border: solid 1px var(--border-light-gray);
}
</style>
