import { nextTick } from "vue"

export async function checkMultiSelectItems() {
	await nextTick()

	const pcFilterContainer = document.querySelector('[data-pc-name="pcfilter"]')

	if (pcFilterContainer) {
		pcFilterContainer.classList.add("base-input")
	}
}
