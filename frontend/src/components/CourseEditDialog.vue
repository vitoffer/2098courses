<script setup lang="ts">
import { useFilterOptionsStore } from "@/stores/filterOptions"
import type { ICourse } from "@/types"
import AutoComplete from "primevue/autocomplete"
import MultiSelect from "primevue/multiselect"
import Select from "primevue/select"
import Textarea from "primevue/textarea"
import { ref, toRefs } from "vue"

const courseModel = defineModel<ICourse>()

const {
	focuses: filterFocusesOptions,
	addresses: filterAddressesOptions,
	teachers: filterTeachersOptions,
} = toRefs(useFilterOptionsStore())

const scheduleModel = ref("")
</script>

<template>
	<section class="dialog">
		<input
			type="text"
			class="base-input"
			placeholder="Название"
			v-model="courseModel!.name"
		/>
		<Select
			placeholder="Направленность"
			v-model="courseModel!.focus"
			:options="filterFocusesOptions"
			option-label="name"
		/>
		<Textarea
			placeholder="Описание"
			v-model="courseModel!.description"
			fluid
			auto-resize
			rows="10"
			class="base-input"
		/>
		<AutoComplete
			placeholder="Адрес"
			:suggestions="filterAddressesOptions"
			v-model="courseModel!.address"
			pt:pc-input="base-input"
		/>
		<AutoComplete
			placeholder="Преподаватель"
			:suggestions="filterTeachersOptions"
			v-model="courseModel!.teacher"
			pt:pc-input="base-input"
		/>
		<MultiSelect
			placeholder="Возраст"
			:options="Array.from({ length: 97 }, (_, i) => i + 3)"
			v-model="courseModel!.age"
		/>
		<input
			type="text"
			class="base-input input-schedule"
			placeholder='Расписание в формате "Пн: 17:30-18:30, 18:30-19:30; Вт: 19:30-20:00"'
			v-model="scheduleModel"
		/>
		<Select
			:options="['Бесплатно', 'Платно']"
			v-model="courseModel!.price"
		/>
		<input
			type="text"
			class="base-input"
			placeholder="Ссылка на mos.ru"
			v-model="courseModel!.link"
		/>
	</section>
</template>

<style scoped lang="scss">
.dialog {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 16px 32px;
	width: 80vw;
	max-width: 900px;
}

:deep(.p-inputtext) {
	width: 100% !important;
}
</style>

<style lang="scss">
.p-dialog-content {
	padding: 0 !important;
}
</style>
