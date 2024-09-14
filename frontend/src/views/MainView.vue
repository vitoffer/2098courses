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

.search {
	&-wrapper {
		display: flex;
		justify-content: center;
		gap: 8px;
		padding: 0 16px;
	}

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

	&__button {
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

	&__list {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px 16px;
	}

	&-item__input {
		width: 250px;
		transition-duration: 0.2s;
	}
}

$inactive-border: solid 1px var(--border-light-gray);
$active-border: solid 1px var(--blue-primary) !important;

:deep(.p-multiselect),
:deep(.p-select) {
	border: $inactive-border;

	&.p-focus {
		border: $active-border;
	}
}

:deep(.p-inputmask) {
	border: $inactive-border;

	&:focus {
		border: $active-border;
	}
}

:deep(.p-multiselect-label),
:deep(.p-select-label),
:deep(.p-inputmask) {
	padding: 4px 16px;
	font-size: 0.875rem;
	line-height: 1.4;
	color: var(--text-light-gray);
}

.courses-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 16px;
	padding: 0 16px;
}
</style>

<style lang="scss">
.p-select-overlay {
	.p-select-option.p-select-option-selected {
		background-color: var(--blue-primary) !important;

		.p-select-option-label {
			color: var(--text-white) !important;
		}

		&.p-focus {
			background-color: var(--blue-secondary) !important;
		}
	}
}

.p-multiselect {
	&-overlay {
		max-width: 100%;

		.p-checkbox-checked .p-checkbox-box {
			background-color: var(--blue-primary) !important;
			border: none !important;

			.p-checkbox-icon * {
				color: var(--text-white) !important;
			}
		}
	}

	&-header {
		padding-inline: 8px !important;
	}

	&-option > span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
