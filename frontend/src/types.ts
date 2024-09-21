export interface ICourse {
	id: string
	isPaid: boolean
	address: string
	teacher: string
	forAges: string
	// forAges: number[]
	name: string
	monday: string
	tuesday: string
	wednesday: string
	thursday: string
	friday: string
	saturday: string
	// schedule: ISchedule
	focus?: string
	description?: string
	link?: string
}

export type TWeekday = "Пн" | "Вт" | "Ср" | "Чт" | "Пт" | "Сб" | "Вс"

export interface IFilterFocus {
	name: string
}
export interface IFilterAddress {
	name: string
}
export interface IFilterTeacher {
	name: string
}
export type TFilterAge = number | null
export type TFilterPrice = "Платно" | "Бесплатно" | null
export type TFilterTime = string | null

export type TFilterOption =
	| {
			name: string
	  }
	| string

export interface ISchedule {
	Пн?: string[]
	Вт?: string[]
	Ср?: string[]
	Чт?: string[]
	Пт?: string[]
	Сб?: string[]
	Вс?: string[]
}
