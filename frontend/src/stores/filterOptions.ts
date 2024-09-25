import { defineStore } from "pinia"
import { reactive } from "vue"

export const useFilterOptionsStore = defineStore("filterOptions", () => {
	const orientationOptions = reactive([])
	const addressOptions = reactive([])
	const teacherOptions = reactive([])

	fetchOptions(orientationOptions, "orientation")
	fetchOptions(addressOptions, "addresses")
	fetchOptions(teacherOptions, "teachers")

	async function fetchOptions(
		optionsArray,
		type: "orientation" | "addresses" | "teachers",
	) {
		const response = await fetch(
			`${import.meta.env.VITE_BASE_API_URL}/courses/${type}/`,
		)
		const data = await response.json()
		optionsArray.push(...data.filter((option) => option))
	}

	return {
		orientations: orientationOptions,
		addresses: addressOptions,
		teachers: teacherOptions,
	}
})
