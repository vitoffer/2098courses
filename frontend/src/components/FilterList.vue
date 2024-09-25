<script setup lang="ts">
import { toRefs } from "vue"
import MultiSelect from "primevue/multiselect"
import Select from "primevue/select"
import { checkMultiSelectItems } from "@/modules/functions"
import { useFilterModelsStore } from "@/stores/filterModels"
import { useFilterOptionsStore } from "@/stores/filterOptions"

const {
	selectedOrientations: filterOrientationsModel,
	selectedAddresses: filterAddressesModel,
	selectedTeachers: filterTeachersModel,
	selectedAges: filterAgesModel,
	selectedIsPaid: filterIsPaidModel,
	selectedWeekdays: filterWeekdaysModel,
	selectedTime: filterTimeModel,
} = toRefs(useFilterModelsStore())

const {
	orientations: filterOrientationsOptions,
	addresses: filterAddressesOptions,
	teachers: filterTeachersOptions,
} = toRefs(useFilterOptionsStore())

const weekdaysOptions = [
	{ programValue: "monday", displayValue: "Пн" },
	{ programValue: "tuesday", displayValue: "Вт" },
	{ programValue: "wednesday", displayValue: "Ср" },
	{ programValue: "thursday", displayValue: "Чт" },
	{ programValue: "friday", displayValue: "Пт" },
	{ programValue: "saturday", displayValue: "Сб" },
]
const ageOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const isPaidOptions = [
	{ programValue: true, displayValue: "Платно" },
	{ programValue: false, displayValue: "Бесплатно" },
]
</script>

<template>
	<ul class="filter__list filter-list">
		<li class="filter-list__item filter-item">
			<MultiSelect
				v-model="filterOrientationsModel"
				class="filter-item__input"
				:options="filterOrientationsOptions"
				placeholder="Направленность"
				filter
				:max-selected-labels="2"
				selected-items-label="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<MultiSelect
				v-model="filterAddressesModel"
				class="filter-item__input"
				:options="filterAddressesOptions"
				placeholder="Адрес"
				filter
				:max-selected-labels="2"
				selected-items-label="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<MultiSelect
				v-model="filterTeachersModel"
				class="filter-item__input"
				:options="filterTeachersOptions"
				placeholder="Преподаватель"
				filter
				:max-selected-labels="1"
				selected-items-label="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<MultiSelect
				v-model="filterAgesModel"
				class="filter-item__input"
				:options="ageOptions"
				placeholder="Класс"
				:max-selected-labels="11"
				selected-items-label="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<Select
				v-model="filterIsPaidModel"
				show-clear
				class="filter-item__input"
				:options="isPaidOptions"
				option-label="displayValue"
				option-value="programValue"
				placeholder="Цена"
			/>
		</li>
		<li>
			<MultiSelect
				v-model="filterWeekdaysModel"
				class="filter-item__input"
				:options="weekdaysOptions"
				option-label="displayValue"
				option-value="programValue"
				placeholder="Дни недели"
				selected-items-label="Выбрано {0} элементов"
			/>
		</li>
		<li>
			<input
				v-model.lazy="filterTimeModel"
				type="text"
				placeholder="Время в формате AA:AA"
				class="filter-item__input base-input"
			/>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.filter {
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
</style>
