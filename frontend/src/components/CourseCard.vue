<script setup lang="ts">
import type { Course } from "@/types"

interface Props {
	course: Course
}

const props = defineProps<Props>()

const formattedSchedule = getFormattedSchedule()

function getFormattedSchedule() {
	const schedule = props.course.schedule
	const formattedScheduleArray: string[] = []

	Object.entries(schedule).forEach(([weekday, timeArray]) => {
		formattedScheduleArray.push(`${weekday}: ${timeArray.join(", ")}`)
	})

	return formattedScheduleArray.join(", ")
}
</script>

<template>
	<article class="course-card card">
		<h3 class="card__name">{{ course.name }}</h3>
		<p class="card__focus">{{ course.focus }}</p>
		<p class="card__description">{{ course.description }}</p>
		<hr class="card__divider" />
		<div class="card__group">
			<i class="pi pi-map-marker" />
			<span class="card__address">{{ course.address }}</span>
		</div>
		<div class="card__group">
			<i class="pi pi-user" />
			<span class="card__teacher">{{ course.teacher }}</span>
		</div>
		<div class="card__group">
			<i class="pi pi-star" />
			<span class="card__age">{{ course.age.join(", ") }}</span>
		</div>
		<div class="card__group">
			<i class="pi pi-calendar" />
			<span class="card__schedule">{{ formattedSchedule }}</span>
		</div>
		<div class="card__group">
			<i class="pi pi-tag" />
			<span class="card__price">{{ course.price }}</span>
		</div>
		<div class="card__group-buttons">
			<a
				:href="`courses/${course.id}`"
				class="button-course-detail button"
			>
				Подробнее
			</a>
			<a
				:href="course.link"
				target="_blank"
				class="button-course-signup button"
			>
				Подробнее
			</a>
		</div>
	</article>
</template>

<style scoped lang="scss">
.course-card {
	display: flex;
	flex-direction: column;
	gap: 4px;
	max-width: 320px;
	padding: 8px 12px 12px;
	border-radius: 10px;
	box-shadow: 0 0 8px 0 rgba(0 0 0 / 0.2);

	p,
	span {
		font-size: 0.875rem;
		line-height: 1.4;
	}

	span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card {
		&__name {
			font-size: clamp(1rem, 5vw, 1.25rem);
			line-height: 1;
			text-align: center;
			color: var(--blue-dark);
		}

		&__focus {
			text-align: center;
			text-decoration: underline;
			color: var(--text-black);
		}

		&__description {
			display: -webkit-box;
			-webkit-line-clamp: 5;
			line-clamp: 5;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		&__divider {
			margin-block: 8px;
			border-top: solid 1px var(--border-light-gray);
		}

		&__group {
			display: flex;
			align-items: center;
			gap: 8px;

			.pi {
				font-size: 0.875rem;
				color: var(--text-black);
			}

			&-buttons {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 24px;
				margin-top: 8px;

				.button {
					padding: 4px 8px;
					font-size: 0.875rem;
					line-height: 1.4;
					color: var(--text-white);
					border-radius: 10px;

					&-course-detail {
						background-color: var(--blue-primary);
					}

					&-course-signup {
						background-color: var(--green-primary);
					}
				}
			}
		}
	}
}
</style>
