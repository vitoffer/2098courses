<script setup lang="ts">
import { ref } from "vue"
import SearchSection from "@/components/sections/SearchSection.vue"
import FiltersSection from "@/components/sections/FiltersSection.vue"
import CoursesSection from "@/components/sections/CoursesSection.vue"

const isFiltersSectionVisible = ref(window.innerWidth >= 768)
</script>

<template>
	<main class="container">
		<SearchSection
			:is-filters-section-visible="isFiltersSectionVisible"
			@toggle-filter-section-visibility="
				isFiltersSectionVisible = !isFiltersSectionVisible
			"
		/>
		<FiltersSection :is-filters-section-visible="isFiltersSectionVisible" />
		<CoursesSection />
	</main>
</template>

<style scoped lang="scss">
.container {
	max-width: 1440px;
	margin: 0 auto;
}
</style>
