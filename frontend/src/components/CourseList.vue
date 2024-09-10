<script setup lang="ts">
import CourseCard from "@/components/CourseCard.vue"
import type { ICourse } from "@/types"

const props = defineProps<{
	filteredCourseList: ICourse[]
}>()
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
