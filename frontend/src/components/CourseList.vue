<script setup lang="ts">
import CourseCard from "@/components/CourseCard.vue"
import { useCourseListStore } from "@/stores/courseList"
import { onMounted, toRefs } from "vue"

const { courseList, filteredCourseList } = toRefs(useCourseListStore())

onMounted(async () => {
	const fetchedCourseList = await getFetchedCourseList()
	courseList.value.push(...fetchedCourseList)
})

async function getFetchedCourseList() {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/courses`)
	const data = await response.json()

	return data
}
</script>

<template>
	<ul class="courses-list">
		<li
			v-for="course in filteredCourseList"
			:key="course.id"
		>
			<CourseCard :course="course" />
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
