import type { TFilterOption } from "@/types"
import { defineStore } from "pinia"
import { reactive, type Reactive } from "vue"

export const useFilterOptionsStore = defineStore("filterOptions", () => {
	const config = useRuntimeConfig()

	const focusOptions = reactive<TFilterOption[]>([])
	const addressOptions = reactive<TFilterOption[]>([])
	const teacherOptions = reactive<TFilterOption[]>([])

	fetchOptions(focusOptions, "focus")
	fetchOptions(addressOptions, "address")
	fetchOptions(teacherOptions, "teacher")

	async function fetchOptions(
		optionsArray: Reactive<TFilterOption[]>,
		type: "focus" | "address" | "teacher"
	) {
		const response = await fetch(
			`${config.public.apiUrl}/${type}-filter-options`
		)
		const data = await response.json()
		optionsArray.push(...data)
	}

	return {
		focuses: focusOptions,
		addresses: addressOptions,
		teachers: teacherOptions,
	}
})
