<script setup lang="ts">
import { toRefs } from "vue"
import MultiSelect from "primevue/multiselect"
import Select from "primevue/select"
import { checkMultiSelectItems } from "@/functions"
import { useFilterModelsStore } from "@/stores/filterModels"
import { useFilterOptionsStore } from "@/stores/filterOptions"

const {
	selectedFocuses: filterFocusesModel,
	selectedAddresses: filterAddressesModel,
	selectedTeachers: filterTeachersModel,
	selectedAge: filterAgeModel,
	selectedPrice: filterPriceModel,
	selectedWeekdays: filterWeekdaysModel,
	selectedTime: filterTimeModel,
} = toRefs(useFilterModelsStore())

const {
	focuses: filterFocusesOptions,
	addresses: filterAddressesOptions,
	teachers: filterTeachersOptions,
} = toRefs(useFilterOptionsStore())

const weekdaysOptions = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const priceOptions = ["Платно", "Бесплатно"]
</script>

<template>
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
				v-model.lazy.number="filterAgeModel"
			/>
		</li>
		<li>
			<Select
				show-clear
				class="filter-item__input"
				v-model="filterPriceModel"
				:options="priceOptions"
				placeholder="Цена"
			/>
		</li>
		<li>
			<MultiSelect
				class="filter-item__input"
				v-model="filterWeekdaysModel"
				:options="weekdaysOptions"
				placeholder="Дни недели"
				:max-selected-labels="3"
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
