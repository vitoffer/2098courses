<script setup lang="ts">
import { onMounted, ref, toRefs, type Ref } from "vue"
import { useConfirm } from "primevue/useconfirm"
import ConfirmDialog from "primevue/confirmdialog"
import CourseCard from "@/components/CourseCard.vue"
import { useCourseListStore } from "@/stores/courseList"
import Dialog from "primevue/dialog"
import { useEditCourse } from "@/composables/editCourse"
import { useEditCourseDialogStore } from "@/stores/editCourseDialog"
import CourseEditDialog from "./CourseEditDialog.vue"
import CoursePreviewDialog from "./CoursePreviewDialog.vue"
import { useRoute } from "vue-router"

const { courseList, filteredCourseList } = toRefs(useCourseListStore())

const confirm = useConfirm()

const route = useRoute()

const selectedCourseId: Ref<string | null> = ref(null)

const { editingCourse } = useEditCourse(selectedCourseId)
const { isEditCourseDialogVisible } = toRefs(useEditCourseDialogStore())

const isCoursePreviewDialogVisible = ref(false)
const coursePreviewId = ref<null | string>(null)

onMounted(async () => {
	const fetchedCourseList = await getFetchedCourseList()
	courseList.value.push(...fetchedCourseList)
})

async function getFetchedCourseList() {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/courses`, {
		mode: "no-cors",
	})
	console.log(response)

	const data = await response.json()

	return data
}

function showEditCourseDialog(selectedId: string) {
	selectedCourseId.value = selectedId

	isEditCourseDialogVisible.value = true
}

function confirmDeletion(courseId: string) {
	console.log(courseId)

	confirm.require({
		message: "Вы уверены, что хотите удалить этот кружок?",
		header: "Подтверждение",
		icon: "pi pi-info-circle",
		rejectProps: {
			label: "Отменить",
		},
		acceptProps: {
			label: "Удалить",
		},
		accept: () => {
			courseList.value = courseList.value.filter(
				(course) => course.id !== courseId,
			)
		},
	})
}

function showCoursePreview(courseId: string) {
	isCoursePreviewDialogVisible.value = true
	coursePreviewId.value = courseId
}
</script>

<template>
	<ul class="courses-list">
		<ConfirmDialog />
		<Dialog
			v-if="route.fullPath.includes('admin')"
			append-to="#adminView"
			v-model:visible="isEditCourseDialogVisible"
			modal
			:header="selectedCourseId ? 'Редактирование кружка' : 'Добавление кружка'"
			@after-hide="selectedCourseId = null"
		>
			<CourseEditDialog v-model="editingCourse" />
		</Dialog>
		<Dialog
			v-model:visible="isCoursePreviewDialogVisible"
			modal
			:header="courseList.find((course) => course.id === coursePreviewId)?.name"
		>
			<CoursePreviewDialog
				:course="courseList.find((course) => course.id === coursePreviewId)"
			/>
		</Dialog>
		<li
			v-for="course in filteredCourseList"
			:key="course.id"
		>
			<CourseCard
				:course="course"
				@confirm-deletion="confirmDeletion"
				@show-edit-course-dialog="showEditCourseDialog"
				@show-course-preview="showCoursePreview"
			/>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.courses-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 16px;
	padding: 0 16px 16px;
}
</style>

<style lang="scss">
.p-confirmdialog {
	&-reject-button {
		background-color: var(--background-white) !important;
		border: solid 1px var(--border-light-gray) !important;

		&:hover {
			background-color: var(--border-light-gray) !important;
		}
	}

	&-accept-button {
		background-color: var(--red-primary) !important;
		border: none !important;

		&:hover {
			background-color: var(--red-secondary) !important;
		}

		.p-button-label {
			color: var(--text-white) !important;
		}
	}
}

.p-dialog {
	width: 80vw !important;

	@media (max-width: 767px) {
		width: 100% !important;
		margin: 0 32px !important;
	}

	@media (max-width: 480px) {
		width: 100% !important;
		margin: 0 12px !important;
	}

	&-content {
		display: flex;
		justify-content: center;
	}

	&-title {
		flex-grow: 1 !important;
		text-align: center !important;
		margin-left: 40px;
	}
}
</style>
