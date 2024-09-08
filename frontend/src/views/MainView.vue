<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import MultiSelect from "primevue/multiselect"
import Select from "primevue/select"
import InputMask from "primevue/inputmask"

const isFilterSectionShown = ref(window.innerWidth >= 768)

const searchTextModel = ref()

const filterFocusesModel = ref()
const filterFocusesOptionsFetchUrl = `${import.meta.env.VITE_BASE_API_URL}/filters`
const filterFocusesOptions = ref()

const filterAddressesModel = ref()
const filterAddressesOptionsFetchUrl = `${import.meta.env.VITE_BASE_API_URL}/addresses`
const filterAddressesOptions = ref()

const filterTeachersModel = ref()
const filterTeachersOptionsFetchUrl = `${import.meta.env.VITE_BASE_API_URL}/teachers`
const filterTeachersOptions = ref()

const filterAgeModel = ref()

const filterPriceModel = ref()
const filterPriceOptions = ["Платно", "Бесплатно"]

const filterWeekdaysModel = ref()
const filterWeekdaysOptions = [
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
	"Воскресенье",
]

const filterTimeModel = ref()

onMounted(async () => {
	const responseFocuses = await fetch(filterFocusesOptionsFetchUrl)
	filterFocusesOptions.value = await responseFocuses.json()

	const responseAddresses = await fetch(filterAddressesOptionsFetchUrl)
	filterAddressesOptions.value = await responseAddresses.json()

	const responseTeachers = await fetch(filterTeachersOptionsFetchUrl)
	filterTeachersOptions.value = await responseTeachers.json()
})

async function checkMultiSelectItems() {
	await nextTick()

	const pcFilterContainer = document.querySelector('[data-pc-name="pcfilter"]')

	if (pcFilterContainer) {
		pcFilterContainer.classList.add("base-input")
	}
}
</script>

<template>
	<main class="container">
		<section class="search-wrapper">
			<button
				class="filter__button"
				@click="isFilterSectionShown = !isFilterSectionShown"
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
		<section
			class="filter"
			:style="{
				display: isFilterSectionShown ? 'block' : 'none',
			}"
		>
			<p class="filter__title">Фильтры:</p>
			<ul class="filter__list filter-list">
				<li class="filter-list__item filter-item">
					<MultiSelect
						class="filter-item__input"
						v-model="filterFocusesModel"
						:options="filterFocusesOptions"
						option-label="name"
						placeholder="Направленность"
						filter
						:max-selected-labels="2"
						selectedItemsLabel="Выбрано {0} элементов"
						@focus="checkMultiSelectItems"
					/>
				</li>
				<li>
					<MultiSelect
						class="filter-item__input"
						v-model="filterAddressesModel"
						:options="filterAddressesOptions"
						option-label="name"
						placeholder="Адрес"
						filter
						:max-selected-labels="2"
						selectedItemsLabel="Выбрано {0} элементов"
						@focus="checkMultiSelectItems"
					/>
				</li>
				<li>
					<MultiSelect
						class="filter-item__input"
						v-model="filterTeachersModel"
						:options="filterTeachersOptions"
						option-label="name"
						placeholder="Преподаватель"
						filter
						:max-selected-labels="1"
						selectedItemsLabel="Выбрано {0} элементов"
						@focus="checkMultiSelectItems"
					/>
				</li>
				<li>
					<input
						type="text"
						placeholder="Возраст (введите числом)"
						size="22"
						class="filter-item__input base-input"
						v-model="filterAgeModel"
					/>
				</li>
				<li>
					<Select
						show-clear
						class="filter-item__input"
						v-model="filterPriceModel"
						:options="filterPriceOptions"
						placeholder="Цена"
					/>
				</li>
				<li>
					<MultiSelect
						class="filter-item__input"
						v-model="filterWeekdaysModel"
						:options="filterWeekdaysOptions"
						placeholder="Дни недели"
						:max-selected-labels="3"
						selected-items-label="Выбрано {0} элементов"
					/>
				</li>
				<li>
					<InputMask
						class="filter-item__input"
						v-model="filterTimeModel"
						mask="99:99"
						placeholder="Время"
					/>
				</li>
			</ul>
		</section>
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
		margin-block: 8px;
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
		width: fit-content;
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

.filter-item__input {
	transition-duration: 0.2s;
}

.filter-item__input {
	width: 250px;
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
