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
