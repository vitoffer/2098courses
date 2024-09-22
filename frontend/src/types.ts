export interface ICourse {
	id: string
	isPaid: boolean
	address: string
	teacher: string
	forAges: string
	name: string
	schedule: ISchedule
	orientation: string
	description: string
	link?: string
}

export interface ISchedule {
	monday?: string[]
	tuesday?: string[]
	wednesday?: string[]
	thursday?: string[]
	friday?: string[]
	saturday?: string[]
}

export type TWeekday = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб"

export type TFilterSearch = string | null
export type TFilterOrientation = string | null
export type TFilterAddress = string | null
export type TFilterTeacher = string | null
export type TFilterAge = number | null
export type TFilterIsPaid = boolean | null
export type TFilterWeekday =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
export type TFilterTime = string | null
