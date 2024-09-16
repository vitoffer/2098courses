import { useCourseListStore } from "@/stores/courseList"
import type { ICourse } from "@/types"
import {
	computed,
	reactive,
	toRefs,
	toValue,
	type ComputedRef,
	type Ref,
} from "vue"

export function useEditCourse(selectedCourseId: Ref<string | null>) {
	const { courseList } = toRefs(useCourseListStore())

	const editingCourse: ComputedRef<ICourse> = computed(() => {
		return toValue(selectedCourseId)
			? reactive({
					...(courseList.value.find(
						(course) => course.id === toValue(selectedCourseId),
					) as ICourse),
				})
			: reactive({
					id: "new",
					name: "",
					focus: "",
					description: "",
					teacher: "",
					address: "",
					age: [],
					price: "Бесплатно",
					schedule: {},
					link: "",
				})
	})

	return { editingCourse }
}
