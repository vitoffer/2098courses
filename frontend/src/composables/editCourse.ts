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

export function useEditCourse(selectedCourseId: Ref<number | null>) {
	const { courseList } = toRefs(useCourseListStore())

	const editingCourse: ComputedRef<ICourse> = computed(() => {
		return toValue(selectedCourseId)
			? reactive({
					...(courseList.value.find(
						(course) => course.id === toValue(selectedCourseId),
					) as ICourse),
				})
			: reactive({
					id: -1,
					name: "",
					orientation: "",
					description: "",
					teacher: "",
					address: "",
					forAges: "",
					isPaid: false,
					schedule: {
						monday: "",
						tuesday: "",
						wednesday: "",
						thursday: "",
						friday: "",
						saturday: "",
					},
					link: "",
				})
	})

	return { editingCourse }
}
