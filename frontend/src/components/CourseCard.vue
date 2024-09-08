<script setup lang="ts">
interface Props {
	course: {
		name: string
		focus: string
		description: string
		address: string
		teacher: string
		age: number[]
		schedule: {
			Пн?: string
			Вт?: string
			Ср?: string
			Чт?: string
			Пт?: string
			Сб?: string
			Вс?: string
		}
		price: string
	}
}

const props = defineProps<Props>()
</script>

<template>
	<article>
		<h3>{{ course.name }}</h3>
		<p>{{ course.focus }}</p>
		<p>{{ course.description }}</p>
		<hr
			:style="{
				borderTop: 'solid 1px var(--border-light-gray)',
			}"
		/>
		<p>{{ course.address }}</p>
		<p>{{ course.teacher }}</p>
		<p>{{ course.age }}</p>
		<p>{{ course.schedule }}</p>
		<p>{{ course.price }}</p>
	</article>
</template>

<style scoped></style>
