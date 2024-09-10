import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IFilterAddress, IFilterFocus, IFilterTeacher, TFilterAge, TFilterPrice, TFilterTime,  TWeekday } from "@/types"

export const useFilterModelsStore = defineStore('filterModels', () => {

	const models = reactive<{
		searchText: string
		selectedFocuses: IFilterFocus[]
		selectedAddresses: IFilterAddress[]
		selectedTeachers: IFilterTeacher[]
		selectedAge: TFilterAge
		selectedPrice: TFilterPrice
		selectedWeekdays: TWeekday[]
		selectedTime: TFilterTime
	}>({
		searchText: '',
		selectedFocuses: [],
		selectedAddresses: [],
		selectedTeachers: [],
		selectedAge: null,
		selectedPrice: null,
		selectedWeekdays: [],
		selectedTime: null,
	})

  return models
})
