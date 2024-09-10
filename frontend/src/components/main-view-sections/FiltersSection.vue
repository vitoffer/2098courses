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
}
</style>

<style scoped lang="scss">
.filter {
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
