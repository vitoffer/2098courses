import type { TFilterOption } from "@/types"
import type { Ref } from "vue"

export async function useFetchingFilterOptions(
	optionsRef: Ref<TFilterOption[]>,
	type: "focus" | "address" | "teacher"
) {
	const config = useRuntimeConfig()
	const response = await fetch(`${config.public.apiUrl}/${type}-filter-options`)
	const data = await response.json()
	// optionsRefPush(data)
	console.log(optionsRef)
	optionsRef.value.push(...data)
}
