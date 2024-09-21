import type { ICourse, ISchedule, TWeekday } from "@/types"
import { nextTick } from "vue"

export async function checkMultiSelectItems() {
	await nextTick()

	const pcFilterContainer = document.querySelector('[data-pc-name="pcfilter"]')

	if (pcFilterContainer) {
		pcFilterContainer.classList.add("base-input")
	}
}

export function getFormattedSchedule(schedule: ISchedule) {
	const formattedScheduleArray: string[] = []

	const weekdayAlign = {
		monday: "Пн",
		tuesday: "Вт",
		wednesday: "Ср",
		thursday: "Чт",
		friday: "Пт",
		saturday: "Сб",
	}

	Object.entries(schedule ?? {}).forEach(([key, value]) => {
		if (key === "id") return
		formattedScheduleArray.push(`${weekdayAlign[key] as TWeekday}: ${value}`)
	})

	return formattedScheduleArray.join(", ")
}
