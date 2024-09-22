<script setup lang="ts">
import { useEditCourseDialogStore } from "@/stores/editCourseDialog"
import { useFilterModelsStore } from "@/stores/filterModels"
import { ref, toRefs } from "vue"
import { useRoute } from "vue-router"
import FileUpload, { type FileUploadUploaderEvent } from "primevue/fileupload"

defineProps<{
	isFiltersSectionVisible?: boolean
}>()

defineEmits(["toggleFilterSectionVisibility"])

const route = useRoute()

const { searchText: searchTextModel } = toRefs(useFilterModelsStore())

const { isEditCourseDialogVisible } = toRefs(useEditCourseDialogStore())

async function uploadTable(event: FileUploadUploaderEvent) {
	const fileUploadUrl = `${import.meta.env.VITE_BASE_API_URL}/admin/upload_table`

	console.log(event)

	const formData = new FormData()
	formData.append("table", event.files[0])

	const response = await fetch(fileUploadUrl, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
		},
		method: "POST",
		body: formData,
	})

	const { filename } = await response.json()

	pushTable(filename)
}

async function pushTable(tableName: string) {
	const tablePushUrl = `${import.meta.env.VITE_BASE_API_URL}/admin/add_data_to_base`

	const response = await fetch(tablePushUrl, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
		method: "POST",

		body: JSON.stringify({
			tables_names: [tableName],
		}),
	})

	const data = await response.json()

	console.log(data.Result)
}
</script>

<template>
	<section class="search">
		<button
			v-if="!route.fullPath.includes('admin')"
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
		<template v-if="route.fullPath.includes('admin')">
			<button
				class="add-course__button"
				@click="isEditCourseDialogVisible = true"
			>
				<i class="pi pi-plus-circle"></i>
			</button>
			<FileUpload
				mode="basic"
				name="table"
				accept=".docx,.doc"
				auto
				custom-upload
				@uploader="uploadTable"
				choose-label="Загрузить таблицу"
			/>
		</template>
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

		&::placeholder {
			color: var(--text-light-gray);
		}

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

.add-course__button {
	padding: 4px;
	line-height: 1;
	background-color: var(--green-primary);
	border-radius: 5px;

	.pi {
		font-size: 1.5rem;
		color: var(--text-white);
	}
}
</style>
