import type { ICourse } from "@/types"
import { defineStore } from 'pinia'
import { reactive } from "vue"

export const useCourseListStore = defineStore('courseList', () => {
	const courseList = reactive<ICourse[]>([])

	return {courseList}
})
