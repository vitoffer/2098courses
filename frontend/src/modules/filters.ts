import { useFilterModelsStore } from "@/stores/filterModels"
import type {
	ICourse,
	TFilterOrientation,
	TFilterAddress,
	TFilterTeacher,
	TFilterAge,
	TFilterIsPaid,
	TFilterTime,
	TFilterWeekday,
} from "@/types"
import { toRefs } from "vue"

export function getFilteredCourseList(courseList: ICourse[]) {
	const {
		searchText,
		selectedOrientations,
		selectedAddresses,
		selectedTeachers,
		selectedAges,
		selectedIsPaid,
		selectedWeekdays,
		selectedTime,
	} = toRefs(useFilterModelsStore())

	return courseList.filter(
		(course) =>
			isCourseFitSearchText(course, searchText.value) &&
			isCourseFitOrientation(course, selectedOrientations.value) &&
			isCourseFitAddress(course, selectedAddresses.value) &&
			isCourseFitTeacher(course, selectedTeachers.value) &&
			isCourseFitAge(course, selectedAges.value) &&
			isCourseFitPrice(course, selectedIsPaid.value) &&
			isCourseFitDateTime(course, selectedWeekdays.value, selectedTime.value),
	)
}

function isCourseFitSearchText(course: ICourse, searchText: string) {
	return course.name.toLowerCase().includes(searchText.toLowerCase())
}

function isCourseFitOrientation(
	course: ICourse,
	orientations: TFilterOrientation[],
) {
	if (orientations.length === 0) {
		return true
	}
	return orientations.some((orientation) => orientation === course.orientation)
}

function isCourseFitAddress(course: ICourse, addresses: TFilterAddress[]) {
	if (addresses.length === 0) {
		return true
	}
	return addresses.some((address) => address === course.address)
}

function isCourseFitTeacher(course: ICourse, teachers: TFilterTeacher[]) {
	if (teachers.length === 0) {
		return true
	}
	return teachers.some((teacher) => teacher === course.teacher)
}

function isCourseFitAge(course: ICourse, ages: TFilterAge[]) {
	if (ages.length === 0) {
		return true
	}
	return ages.some((age) => {
		if (age === null) return

		return course.forAges.includes(String(age))
	})
}

function isCourseFitPrice(course: ICourse, isPaid: TFilterIsPaid) {
	if (isPaid === null) {
		return true
	}
	return course.isPaid === isPaid
}

function isCourseFitDateTime(
	course: ICourse,
	weekdays: TFilterWeekday[],
	time: TFilterTime,
) {
	if (weekdays.length === 0 && !time) {
		return true
	}
	if (weekdays.length === 0) {
		return isCourseFitTime(course, time as string)
	}
	if (!time) {
		return isCourseFitWeekday(course, weekdays)
	}
	return isCourseFitTime(course, time) && isCourseFitWeekday(course, weekdays)
}

export function isCourseFitTime(course: ICourse, time: string) {
	return Object.values(course.schedule).some((fullTimeString) => {
		if (!fullTimeString || typeof fullTimeString == "number") return

		return fullTimeString.includes(time)
	})
}

export function isCourseFitWeekday(
	course: ICourse,
	weekdays: TFilterWeekday[],
) {
	return Object.keys(course.schedule).some((courseWeekday) => {
		if (!course.schedule[courseWeekday]) return false

		return weekdays.some((selectedWeekday) => courseWeekday === selectedWeekday)
	})
}
