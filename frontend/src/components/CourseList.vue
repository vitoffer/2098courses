<script setup lang="ts">
import { onMounted, ref, toRefs, watchEffect, type Ref } from "vue"
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
import type { ICourse, ISchedule } from "@/types"

const { courseList, filteredCourseList } = toRefs(useCourseListStore())

const confirm = useConfirm()

const route = useRoute()

const selectedCourseId: Ref<number | null> = ref(null)

const { editingCourse } = useEditCourse(selectedCourseId)

const { isEditCourseDialogVisible } = toRefs(useEditCourseDialogStore())

const isCoursePreviewDialogVisible = ref(false)
const coursePreviewId = ref<null | number>(null)

onMounted(async () => {
	const fetchedCourseList = await getFetchedCourseList()
	courseList.value.push(...fetchedCourseList)
})

async function getFetchedCourseList() {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/courses`)

	const data = await response.json()

	interface ITempCourse {
		id: string
		is_paid: boolean
		address: string
		teacher: string
		for_ages: string
		name: string
		schedule: ISchedule
		orientation: string
		description: string
		link?: string
	}

	const camelizedData: ICourse[] = data.map((item: ITempCourse) => {
		return Object.keys(item).reduce((acc, key) => {
			const camelizedKey = key.replace(/_([a-z])/g, (match, group) =>
				group.toUpperCase(),
			)
			acc[camelizedKey] = item[key]
			return acc
		}, {})
	})

	return camelizedData
}

function showEditCourseDialog(selectedId: number) {
	selectedCourseId.value = selectedId

	isEditCourseDialogVisible.value = true
}

function confirmDeletion(courseId: number) {
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
		accept: () => deleteCourse(courseId),
	})
}

async function deleteCourse(courseId) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/admin/delete_course/${courseId}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			},
		},
	)

	const data = await response.json()

	console.log(data.Result)
}

function showCoursePreview(courseId: number) {
	isCoursePreviewDialogVisible.value = true
	coursePreviewId.value = courseId
}
</script>

<template>
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
	<ul class="courses-list">
		<li
			class="courses-list__item"
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
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(4, min(100%, 320px));
	gap: 16px;
	padding: 0 16px 16px;

	&__item {
		display: flex;
		align-items: stretch;
	}
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
	width: max-content !important;
	max-width: 80vw !important;

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
