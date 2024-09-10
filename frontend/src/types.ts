export interface ICourse {
	id: string
	name: string
	focus: string
	description: string
	address: string
	teacher: string
	age: number[]
	schedule: {
		Пн?: string[]
		Вт?: string[]
		Ср?: string[]
		Чт?: string[]
		Пт?: string[]
		Сб?: string[]
		Вс?: string[]
	}
	price: string
	link: string
}

export type TWeekday = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'

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
export type TFilterPrice = 'Платно' | 'Бесплатно' | null
export type TFilterTime = string | null
