import type { TFilterOption } from "@/types"
import type { Ref } from "vue"

export async function useFetchingFilterOptions(optionsRef: Ref<TFilterOption[]>, type: 'focus' | 'address' | 'teacher') {
	const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/${type}-filter-options`)
	const data = await response.json()
	// optionsRefPush(data)
	console.log(optionsRef)
	optionsRef.value.push(...data)
}
