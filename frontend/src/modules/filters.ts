import { useFilterModelsStore } from "@/stores/filterModels"
import type {
	ICourse,
	IFilterAddress,
	IFilterFocus,
	IFilterTeacher,
	TFilterAge,
	TFilterPrice,
	TFilterTime,
	TWeekday,
} from "@/types"
import { toRefs } from "vue"

export function getFilteredCourseList(courseList: ICourse[]) {
	const {
		searchText,
		selectedFocuses,
		selectedAddresses,
		selectedTeachers,
		selectedAge,
		selectedPrice,
		selectedWeekdays,
		selectedTime,
	} = toRefs(useFilterModelsStore())

	return courseList.filter(
		(course) =>
			isCourseFitSearchText(course, searchText.value) &&
			isCourseFitFocus(course, selectedFocuses.value) &&
			isCourseFitAddress(course, selectedAddresses.value) &&
			isCourseFitTeacher(course, selectedTeachers.value) &&
			isCourseFitAge(course, selectedAge.value) &&
			isCourseFitPrice(course, selectedPrice.value) &&
			isCourseFitDateTime(course, selectedWeekdays.value, selectedTime.value),
	)
}

function isCourseFitSearchText(course: ICourse, searchText: string) {
	return course.name.toLowerCase().includes(searchText.toLowerCase())
}

function isCourseFitFocus(course: ICourse, focuses: IFilterFocus[]) {
	if (focuses.length === 0) {
		return true
	}
	return focuses.some((focus) => focus.name === course.focus)
}

function isCourseFitAddress(course: ICourse, addresses: IFilterAddress[]) {
	if (addresses.length === 0) {
		return true
	}
	return addresses.some((address) => address.name === course.address)
}

function isCourseFitTeacher(course: ICourse, teachers: IFilterTeacher[]) {
	if (teachers.length === 0) {
		return true
	}
	return teachers.some((teacher) => teacher.name === course.teacher)
}

function isCourseFitAge(course: ICourse, age: TFilterAge) {
	if (!age) {
		return true
	}
	return course.age.includes(age)
}

function isCourseFitPrice(course: ICourse, price: TFilterPrice) {
	if (!price) {
		return true
	}
	return course.price === price
}

function isCourseFitDateTime(
	course: ICourse,
	weekdays: TWeekday[],
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
	return Object.values(course.schedule).some((fullTimeStringArray) => {
		return fullTimeStringArray.some((fullTimeString) =>
			fullTimeString.includes(time),
		)
	})
}

export function isCourseFitWeekday(course: ICourse, weekdays: TWeekday[]) {
	return Object.keys(course.schedule).some((courseWeekday) =>
		weekdays.some((selectedWeekday) => courseWeekday === selectedWeekday),
	)
}
