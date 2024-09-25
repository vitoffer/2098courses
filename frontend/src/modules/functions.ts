import type { ISchedule, TWeekday } from "@/types"
import { nextTick } from "vue"

export async function checkMultiSelectItems() {
	await nextTick()

	const pcFilterContainer = document.querySelector('[data-pc-name="pcfilter"]')

	if (pcFilterContainer) {
		pcFilterContainer.classList.add("base-input")
	}
}

export function getFormattedSchedule(schedule: ISchedule) {
	const weekdayAlign = {
		monday: "Пн",
		tuesday: "Вт",
		wednesday: "Ср",
		thursday: "Чт",
		friday: "Пт",
		saturday: "Сб",
	}

	const weekdayOrder = Object.keys(weekdayAlign).sort((a, b) => {
		const order = [
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		]
		return order.indexOf(a) - order.indexOf(b)
	})

	const formattedScheduleArray: string[] = []

	weekdayOrder.forEach((key) => {
		if (schedule[key]) {
			formattedScheduleArray.push(
				`${weekdayAlign[key] as TWeekday}: ${schedule[key]}`,
			)
		}
	})

	return formattedScheduleArray.join(", ")
}
