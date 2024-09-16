<script setup lang="ts">
import FilterList from "@/components/FilterList.vue"

defineProps<{
	isFiltersSectionVisible: boolean
}>()
</script>

<template>
	<section
		class="filter"
		:style="{
			display: isFiltersSectionVisible ? 'block' : 'none',
		}"
	>
		<p class="filter__title">Фильтры:</p>
		<FilterList />
	</section>
</template>

<style scoped lang="scss">
.filter {
	margin-block: 8px 12px;
	padding: 0 16px;

	@media (max-width: 767px) {
		display: flex;
		flex-direction: column;
		margin-top: 8px;
		padding-block: 8px;
		background-color: var(--border-light-gray);
	}

	&__title {
		margin-bottom: 8px;
		font-size: 0.875rem;
		line-height: 1.4;
		text-align: center;
		color: var(--text-black);

		@media (max-width: 767px) {
			margin: 0;
		}
	}

	&-item__input {
		width: 250px;
		transition-duration: 0.2s;
	}
}
</style>
