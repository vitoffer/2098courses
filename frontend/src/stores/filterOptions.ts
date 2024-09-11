import type { TFilterOptions } from "@/types"
import { defineStore } from 'pinia'
import { reactive } from "vue"

export const useFilterOptionsStore = defineStore('filterModels', () => {
	const focusOptions = reactive<TFilterOptions[]>([])
	const addressOptions = reactive<TFilterOptions[]>([])
	const teacherOptions = reactive<TFilterOptions[]>([])

	return {focuses: focusOptions, addresses:addressOptions, teachers: teacherOptions}
})
