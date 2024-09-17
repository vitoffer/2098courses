import { defineStore } from "pinia"
import { ref } from "vue"

export const useEditCourseDialogStore = defineStore("editCourseDialog", () => {
	const isEditCourseDialogVisible = ref(false)

	return { isEditCourseDialogVisible }
})
