<script setup lang="ts">
import { useFilterModelsStore } from "@/stores/filterModels"
import { toRefs } from "vue"

const props = defineProps<{
	isFiltersSectionVisible: boolean
}>()

defineEmits(["toggleFilterSectionVisibility"])

const { searchText: searchTextModel } = toRefs(useFilterModelsStore())
</script>

<template>
	<section class="search">
		<button
			class="filter__button"
			@click="$emit('toggleFilterSectionVisibility')"
		>
			<i class="pi pi-filter"></i>
		</button>
		<input
			type="text"
			placeholder="Поиск по названию"
			class="search-bar base-input"
			v-model="searchTextModel"
		/>
	</section>
</template>

<style scoped lang="scss">
.search {
	display: flex;
	justify-content: center;
	gap: 8px;
	margin-bottom: 16px;
	padding: 0 16px;

	&-bar {
		display: block;
		width: 600px;
		margin: 0 auto;

		@media (max-width: 767px) {
			width: 80vw;
			margin: 0;
		}

		@media (max-width: 480px) {
			width: 90vw;
			padding-inline: 8px;
		}
	}
}

.search-bar::placeholder {
	color: var(--text-light-gray);
}

.filter__button {
	display: none;

	padding: 8px;
	line-height: 0;
	background-color: var(--blue-primary);
	border-radius: 10px;

	.pi-filter {
		font-size: 1rem;
		color: var(--text-white);
	}

	@media (max-width: 767px) {
		display: block;
	}
}
</style>
