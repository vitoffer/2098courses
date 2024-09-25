<script setup lang="ts">
import { useFilterOptionsStore } from "@/stores/filterOptions"
import type { ICourse } from "@/types"
import AutoComplete, {
	type AutoCompleteCompleteEvent,
} from "primevue/autocomplete"
import Select from "primevue/select"
import Textarea from "primevue/textarea"
import { ref, toRefs } from "vue"

const courseModel = defineModel<ICourse>()

const {
	orientations: filterOrientationsOptions,
	addresses: filterAddressesOptions,
	teachers: filterTeachersOptions,
} = toRefs(useFilterOptionsStore())

const scheduleModel = ref(courseModel.value.schedule)

function saveCourse() {
	const body = {
		course: {
			is_paid: courseModel.value?.isPaid,
			address: courseModel.value?.address || "",
			teacher: courseModel.value?.teacher || "",
			for_ages: courseModel.value?.forAges || "",
			name: courseModel.value?.name || "",
			description: courseModel.value?.description || "",
			orientation: courseModel.value?.orientation || "",
			url: courseModel.value?.url || null,
		},
		schedule: scheduleModel.value,
	}

	if (courseModel.value.id === -1) {
		addCourse(body)
		return
	}

	editCourse(body)
}

async function addCourse(body) {
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

async function editCourse(body) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_API_URL}/admin/change_course/${courseModel.value.id}`,
		{
			method: "PATCH",
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

const orientationItems = ref([])
const addressItems = ref([])
const teacherItems = ref([])

const searchOrientation = (event: AutoCompleteCompleteEvent) => {
	setTimeout(() => {
		if (event.query.trim().length === 0) {
			orientationItems.value = filterOrientationsOptions.value
		} else {
			orientationItems.value = filterOrientationsOptions.value.filter(
				(orientation) => {
					if (orientation)
						return (orientation as string)
							.toLowerCase()
							.includes(event.query.toLowerCase())
				},
			)
		}
	}, 250)
}

const searchAddress = (event: AutoCompleteCompleteEvent) => {
	setTimeout(() => {
		if (event.query.trim().length === 0) {
			addressItems.value = filterAddressesOptions.value
		} else {
			addressItems.value = filterAddressesOptions.value.filter((address) => {
				if (address)
					return (address as string)
						.toLowerCase()
						.includes(event.query.toLowerCase())
			})
		}
	}, 250)
}

const searchTeacher = (event: AutoCompleteCompleteEvent) => {
	setTimeout(() => {
		if (event.query.trim().length === 0) {
			teacherItems.value = filterTeachersOptions.value
		} else {
			teacherItems.value = filterTeachersOptions.value.filter((teacher) => {
				if (teacher)
					return (teacher as string)
						.toLowerCase()
						.includes(event.query.toLowerCase())
			})
		}
	}, 250)
}
</script>

<template>
	<section class="dialog">
		<input
			v-model="courseModel!.name"
			type="text"
			class="base-input"
			placeholder="Название"
		/>
		<AutoComplete
			v-model="courseModel.orientation"
			placeholder="Направленность"
			:suggestions="orientationItems"
			pt:pc-input="base-input"
			dropdown
			@complete="searchOrientation"
		/>
		<Textarea
			v-model="courseModel!.description"
			placeholder="Описание"
			fluid
			auto-resize
			rows="10"
			class="base-input"
		/>
		<AutoComplete
			v-model="courseModel.address"
			placeholder="Адрес"
			:suggestions="addressItems"
			pt:pc-input="base-input"
			dropdown
			@complete="searchAddress"
		/>
		<AutoComplete
			v-model="courseModel!.teacher"
			placeholder="Преподаватель"
			:suggestions="teacherItems"
			pt:pc-input="base-input"
			dropdown
			@complete="searchTeacher"
		/>
		<input
			v-model="courseModel.forAges"
			type="text"
			class="base-input input-schedule"
			placeholder='Класс в формате "10,11" или "10-11"'
		/>
		<input
			v-model="scheduleModel.monday"
			type="text"
			class="base-input"
			placeholder="Время в понедельник"
		/>
		<input
			v-model="scheduleModel.tuesday"
			type="text"
			class="base-input"
			placeholder="Время во вторник"
		/>
		<input
			v-model="scheduleModel.wednesday"
			type="text"
			class="base-input"
			placeholder="Время в среду"
		/>
		<input
			v-model="scheduleModel.thursday"
			type="text"
			class="base-input"
			placeholder="Время в четверг"
		/>
		<input
			v-model="scheduleModel.friday"
			type="text"
			class="base-input"
			placeholder="Время в пятницу"
		/>
		<input
			v-model="scheduleModel.saturday"
			type="text"
			class="base-input"
			placeholder="Время в субботу"
		/>

		<Select
			v-model="courseModel!.isPaid"
			:options="[
				{ name: 'Бесплатно', value: false },
				{ name: 'Платно', value: true },
			]"
			option-label="name"
			option-value="value"
		/>
		<input
			v-model="courseModel!.url"
			type="text"
			class="base-input"
			placeholder="Ссылка на mos.ru"
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
	color: var(--text-black) !important;
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
