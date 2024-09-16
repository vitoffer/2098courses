import { getFilteredCourseList } from "@/modules/filters"
import type { ICourse } from "@/types"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCourseListStore = defineStore("courseList", () => {
	const courseList = ref<ICourse[]>([])

	const filteredCourseList = computed(() =>
		getFilteredCourseList(courseList.value),
	)

	return { courseList, filteredCourseList }
})
