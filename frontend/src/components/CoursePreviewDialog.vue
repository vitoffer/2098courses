<script setup lang="ts">
import { getFormattedSchedule } from "@/modules/functions"
import type { ICourse } from "@/types"
import { computed } from "vue"

const props = defineProps<{
	course?: ICourse
}>()

const formattedSchedule = computed(() =>
	getFormattedSchedule(props.course!.schedule),
)
</script>

<template>
	<section class="dialog">
		<p
			class="focus"
			v-if="course?.orientation"
		>
			{{ course?.orientation }} направленность
		</p>
		<p v-if="course?.description">{{ course?.description }}</p>
		<p>{{ course?.address }}</p>
		<p>{{ course?.teacher }}</p>
		<p>{{ course?.forAges }} класс</p>
		<p>
			{{ formattedSchedule }}
		</p>
		<p>{{ course?.isPaid ? "Платно" : "Бесплатно" }}</p>
		<a
			v-if="course?.link"
			:href="course?.link"
			target="_blank"
			class="button--course-signup button"
		>
			Записаться
		</a>
	</section>
</template>

<style scoped lang="scss">
.dialog {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}

.focus {
	text-decoration: underline;
}

.button {
	padding: 4px 8px;
	font-size: 0.875rem;
	line-height: 1.4;
	color: var(--text-white);
	border-radius: 10px;

	&--course-signup {
		background-color: var(--green-primary);
	}
}
</style>
