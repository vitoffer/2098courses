import { reactive } from "vue"
import { defineStore } from "pinia"

export const useFilterModelsStore = defineStore("filterModels", () => {
	const models = reactive<{
		searchText
		selectedOrientations
		selectedAddresses
		selectedTeachers
		selectedAges
		selectedIsPaid
		selectedWeekdays
		selectedTime
	}>({
		searchText: "",
		selectedOrientations: [],
		selectedAddresses: [],
		selectedTeachers: [],
		selectedAges: [],
		selectedIsPaid: null,
		selectedWeekdays: [],
		selectedTime: null,
	})

	return models
})
