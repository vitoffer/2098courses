<script setup lang="ts">
import { useRoute } from "vue-router"
import type { ICourse } from "@/types"
import { getFormattedSchedule } from "@/modules/functions"

interface Props {
	course: ICourse
}

const props = defineProps<Props>()

defineEmits(["confirmDeletion", "showEditCourseDialog", "showCoursePreview"])

const route = useRoute()

const formattedSchedule = getFormattedSchedule(props.course.schedule)
</script>

<template>
	<article
		class="course-card card"
		:style="{
			paddingBottom:
				route.fullPath.includes('admin') && !course.link
					? '32px !important'
					: '',
		}"
	>
		<h3 class="card__name">{{ course.name }}</h3>
		<p
			v-if="course.orientation"
			class="card__focus"
		>
			{{ course.orientation }} направленность
		</p>
		<p
			v-if="course.description"
			class="card__description"
		>
			{{ course.description }}
		</p>
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
			<span class="card__age">{{ course.forAges }} класс</span>
		</div>
		<div class="card__group">
			<i class="pi pi-calendar" />
			<span class="card__schedule">
				{{ formattedSchedule }}
			</span>
		</div>
		<div class="card__group card__group--price">
			<i class="pi pi-tag" />
			<span class="card__price">
				{{ course.isPaid ? "Платно" : "Бесплатно" }}
			</span>
		</div>
		<a
			v-if="course.link && route.fullPath.includes('admin')"
			:href="course.link"
			class="card__group card__group--link"
		>
			<i class="pi pi-at" />
			<span class="card__link">{{ course.link.slice(8) }}</span>
		</a>
		<div
			v-if="!route.fullPath.includes('admin')"
			class="card__group card__group--user-buttons"
		>
			<button
				class="button--course-detail button"
				@click="$emit('showCoursePreview', course.id)"
			>
				Подробнее
			</button>
			<a
				v-if="course.link"
				:href="course.link"
				target="_blank"
				class="button--course-signup button"
			>
				Записаться
			</a>
		</div>
		<div
			v-else
			class="card__group card__group--admin-buttons"
		>
			<button
				class="button button--edit"
				@click="$emit('showEditCourseDialog', course.id)"
			>
				<i class="pi pi-pencil"></i>
			</button>
			<button
				class="button button--delete"
				@click="$emit('confirmDeletion', course.id)"
			>
				<i class="pi pi-times"></i>
			</button>
		</div>
	</article>
</template>

<style scoped lang="scss">
.course-card {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4px;
	max-width: 320px;
	padding: 12px 12px 12px;
	border-radius: 10px;
	box-shadow: 0 0 8px 0 rgba(0 0 0 / 0.2);

	@media (max-width: 380px) {
		max-width: 270px;
	}

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

			&--link {
				*,
				.pi::before {
					color: var(--link-color);
				}

				.pi {
					margin-top: 2px;
				}

				.card__link {
					text-decoration: underline;
				}
			}

			&--price,
			&--link {
				margin-right: 96px;
			}

			&--user-buttons {
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

					&--course-detail {
						background-color: var(--blue-primary);
					}

					&--course-signup {
						background-color: var(--green-primary);
					}
				}
			}

			&--admin-buttons {
				position: absolute;
				bottom: 12px;
				right: 16px;
				display: flex;
				gap: 12px;

				.button {
					padding: 6px;
					line-height: 1;
					border-radius: 5px;

					.pi {
						font-size: 1.25rem;

						&::before {
							color: var(--text-white);
						}
					}

					&--delete {
						background-color: var(--red-primary);

						&:hover {
							background-color: var(--red-secondary);
						}
					}

					&--edit {
						background-color: var(--blue-primary);

						&:hover {
							background-color: var(--blue-secondary);
						}
					}
				}
			}
		}
	}
}
</style>
