<script setup lang="ts">
import { toRefs, watchEffect } from "vue"
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

// watchEffect(() => {
// 	console.log(filterOrientationsModel.value)
// 	console.log(filterAddressesModel.value)
// 	console.log(filterTeachersModel.value)
// 	console.log(filterAgesModel.value)
// 	console.log(filterIsPaidModel.value)
// 	console.log(filterWeekdaysModel.value)
// 	console.log(filterTimeModel.value)
// })
</script>

<template>
	<ul class="filter__list filter-list">
		<li class="filter-list__item filter-item">
			<MultiSelect
				class="filter-item__input"
				v-model="filterOrientationsModel"
				:options="filterOrientationsOptions"
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
				placeholder="Преподаватель"
				filter
				:max-selected-labels="1"
				selectedItemsLabel="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<MultiSelect
				class="filter-item__input"
				v-model="filterAgesModel"
				:options="ageOptions"
				placeholder="Класс"
				:max-selected-labels="11"
				selectedItemsLabel="Выбрано {0} элементов"
				@focus="checkMultiSelectItems"
			/>
		</li>
		<li>
			<Select
				show-clear
				class="filter-item__input"
				v-model="filterIsPaidModel"
				:options="isPaidOptions"
				option-label="displayValue"
				option-value="programValue"
				placeholder="Цена"
			/>
		</li>
		<li>
			<MultiSelect
				class="filter-item__input"
				v-model="filterWeekdaysModel"
				:options="weekdaysOptions"
				option-label="displayValue"
				option-value="programValue"
				placeholder="Дни недели"
				selected-items-label="Выбрано {0} элементов"
			/>
		</li>
		<li>
			<input
				type="text"
				placeholder="Время в формате AA:AA"
				class="filter-item__input base-input"
				v-model.lazy="filterTimeModel"
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
