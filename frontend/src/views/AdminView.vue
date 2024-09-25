<script setup lang="ts">
import CoursesSection from "@/components/sections/CoursesSection.vue"
import SearchSection from "@/components/sections/SearchSection.vue"
</script>

<template>
	<main
		id="adminView"
		class="container"
	>
		<SearchSection />
		<CoursesSection />
	</main>
</template>

<style scoped>
.container {
	max-width: 1440px;
	margin: 0 auto;
}
</style>
