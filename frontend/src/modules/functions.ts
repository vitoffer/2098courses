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

	Object.entries(schedule ?? {}).forEach(([weekday, timeArray]) => {
		formattedScheduleArray.push(
			`${weekday as TWeekday}: ${(timeArray as string[]).join(", ")}`,
		)
	})

	return formattedScheduleArray.join(", ")
}
