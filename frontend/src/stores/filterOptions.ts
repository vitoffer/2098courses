import { defineStore } from 'pinia'

export const useFilterOptionsStore = defineStore('filterModels', () => {
	return {focuses: [], addresses: [], teachers: []}
})
