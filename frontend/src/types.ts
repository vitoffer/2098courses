export interface Course {
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

export type Weekday = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'
