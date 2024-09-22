<script setup lang="ts">
import { useFilterOptionsStore } from "@/stores/filterOptions"
import type { ICourse } from "@/types"
import AutoComplete from "primevue/autocomplete"
import MultiSelect from "primevue/multiselect"
import Select from "primevue/select"
import Textarea from "primevue/textarea"
import { ref, toRefs, watchEffect } from "vue"

const courseModel = defineModel<ICourse>()

const {
	orientations: filterOrientationsOptions,
	addresses: filterAddressesOptions,
	teachers: filterTeachersOptions,
} = toRefs(useFilterOptionsStore())

const weekdaysOrder = {
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6,
}

const scheduleModel = ref(
	Object.keys(courseModel.value.schedule)
		.filter((key) => key !== "id")
		.sort((a, b) => weekdaysOrder[a] - weekdaysOrder[b])
		.map((key) => {
			const weekday = {
				monday: "Пн",
				tuesday: "Вт",
				wednesday: "Ср",
				thursday: "Чт",
				friday: "Пт",
				saturday: "Сб",
			}[key]
			return `${weekday}: ${courseModel.value.schedule[key]}`
		})
		.join("; "),
)

function scheduleModelToObject() {
	return scheduleModel.value.split(";").reduce((acc, part) => {
		const [day, time] = part.trim().split(":")
		const weekday = {
			Пн: "monday",
			Вт: "tuesday",
			Ср: "wednesday",
			Чт: "thursday",
			Пт: "friday",
			Сб: "saturday",
		}[day.trim()]
		acc[weekday] = time.trim()
		return acc
	}, {})
}

function saveCourse() {
	if (courseModel.value.id === -1) {
		addCourse()
		return
	}
	editCourse()
}

async function addCourse() {
	const body = {
		course: {
			is_paid: courseModel.value?.isPaid,
			address: courseModel.value?.address,
			teacher: courseModel.value?.teacher,
			for_ages: courseModel.value?.forAges,
			name: courseModel.value?.name,
			description: courseModel.value?.description,
			orientation: courseModel.value?.orientation,
		},
		schedule: scheduleModelToObject(),
	}

	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/admin/add_course`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("authToken")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
	)

	const data = await response.json()

	console.log(data.Result)
}

async function editCourse() {}
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
			v-model="courseModel!.orientation"
			:options="filterOrientationsOptions"
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
			v-model="courseModel.address"
			pt:pc-input="base-input"
		/>
		<AutoComplete
			placeholder="Преподаватель"
			:suggestions="filterTeachersOptions"
			v-model="courseModel!.teacher"
			pt:pc-input="base-input"
		/>
		<input
			type="text"
			class="base-input input-schedule"
			placeholder='Класс в формате "10,11" или "10-11"'
			v-model="courseModel.forAges"
		/>
		<input
			type="text"
			class="base-input input-schedule"
			placeholder='Расписание в формате "Пн: 17:30-18:30; Вт: 19:30-20:00"'
			v-model="scheduleModel"
		/>
		<Select
			:options="[
				{ name: 'Бесплатно', value: false },
				{ name: 'Платно', value: true },
			]"
			v-model="courseModel!.isPaid"
			option-label="name"
			option-value="value"
		/>
		<input
			type="text"
			class="base-input"
			placeholder="Ссылка на mos.ru"
			v-model="courseModel!.link"
		/>
		<div class="buttons">
			<button
				class="button button--green"
				@click="saveCourse"
			>
				Сохранить
			</button>
		</div>
	</section>
</template>

<style scoped lang="scss">
:deep(.p-inputtext) {
	width: 100% !important;
}

:deep(.p-select-label) {
	color: var(--text-black) !important;
}

.buttons {
	display: flex;
	gap: 16px;
	align-self: center;
}

.button {
	align-self: center;
	padding: 4px 8px;
	font-size: 0.875rem;
	line-height: 1.4;
	color: var(--text-white);
	border-radius: 10px;

	&--blue {
		background-color: var(--blue-primary);
	}

	&--green {
		background-color: var(--green-primary);
	}
}
</style>

<style lang="scss">
.p-dialog-content {
	padding: 0 !important;
}

.dialog {
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 16px 16px 32px;
	width: 80vw;
	max-width: 900px;
}
</style>
