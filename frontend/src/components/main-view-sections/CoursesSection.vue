<script setup lang="ts">
import CourseList from "@/components/CourseList.vue"
import { ref } from "vue"

const filteredCourseList = ref([])
</script>

<template>
	<section class="courses">
		<CourseList :filtered-course-list="filteredCourseList" />
	</section>
</template>

<style scoped></style>
