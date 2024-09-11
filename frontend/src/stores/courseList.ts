import { getFilteredCourseList } from "@/modules/filters"
import type { ICourse } from "@/types"
import { defineStore } from 'pinia'
import { computed, reactive } from "vue"

export const useCourseListStore = defineStore('courseList', () => {
	const courseList = reactive<ICourse[]>([])

	const filteredCourseList = computed(() => getFilteredCourseList(courseList))

	return {courseList, filteredCourseList}
})
