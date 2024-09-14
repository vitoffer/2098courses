<script setup lang="ts">
import CourseCard from "@/components/CourseCard.vue"
import { useCourseListStore } from "@/stores/courseList"
import ConfirmDialog from "primevue/confirmdialog"
import { useConfirm } from "primevue/useconfirm"
import { onMounted, toRefs } from "vue"

const { courseList, filteredCourseList } = toRefs(useCourseListStore())

const confirm = useConfirm()

onMounted(async () => {
	const fetchedCourseList = await getFetchedCourseList()
	courseList.value.push(...fetchedCourseList)
})

async function getFetchedCourseList() {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/courses`)
	const data = await response.json()

	return data
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
</script>

<template>
	<ul class="courses-list">
		<ConfirmDialog />
		<li
			v-for="course in filteredCourseList"
			:key="course.id"
		>
			<CourseCard
				:course="course"
				@confirm-deletion="confirmDeletion"
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
</style>
