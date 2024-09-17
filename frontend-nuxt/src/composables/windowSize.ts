import { ref, onMounted, onUnmounted } from "vue"

export function useWindowSize() {
	const width = ref(0)

	const updateWidth = () => {
		width.value = window.innerWidth
	}

	onMounted(() => {
		updateWidth() // Initialize width on mount
		window.addEventListener("resize", updateWidth) // Update width on resize
	})

	onUnmounted(() => {
		window.removeEventListener("resize", updateWidth) // Clean up event listener
	})

	return { width }
}
