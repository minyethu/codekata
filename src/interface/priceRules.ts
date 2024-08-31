import { IItemRepository } from "./itemRepository"

export interface IPriceRules {
    readonly itemRepository: IItemRepository
    calculate: (item: string, units: number) => number
}
