<script setup lang="ts">
const { width } = useWindowSize()
const isFiltersSectionVisible = computed(() => width.value >= 768)
</script>

<template>
	<main class="container">
		<SectionsSearchSection
			:is-filters-section-visible="isFiltersSectionVisible"
			@toggle-filter-section-visibility="
				isFiltersSectionVisible = !isFiltersSectionVisible
			"
		/>
		<SectionsFiltersSection
			:is-filters-section-visible="isFiltersSectionVisible"
		/>
		<SectionsCoursesSection />
	</main>
</template>

<style scoped lang="scss">
.container {
	max-width: 1440px;
	margin: 0 auto;
}
</style>
