import { IItemRepository } from "./interface/itemRepository"
import { Item } from "./types"


const items: Item[] = [
    {
        name: "A",
        unitPriceInCent: 50,
        promotionalUnit: 3,
        promotionalPriceInCent: 130,
    },
    {
        name: "B",
        unitPriceInCent: 30,
        promotionalUnit: 2,
        promotionalPriceInCent: 45,
    },
    {
        name: "C",
        unitPriceInCent: 20,
        promotionalUnit: 1,
        promotionalPriceInCent: 0,
    },
    {
        name: "D",
        unitPriceInCent: 10,
        promotionalUnit: 1,
        promotionalPriceInCent: 0,
    },
]

class ItemRepository implements IItemRepository {
    isItemExist(item: string): boolean {
        return items.find((it) => it.name === item) !== undefined
    }

    getUnitPriceInCent(item: string): number {
        const itemInfo = items.find((it) => it.name === item)
        return itemInfo?.unitPriceInCent ?? 0
    }

    getPromotionalUnit(item: string): number {
        const itemInfo = items.find((it) => it.name === item)
        return itemInfo?.promotionalUnit ?? 0
    }

    getPromotionalPriceInCent(item: string): number {
        const itemInfo = items.find((it) => it.name === item)
        return itemInfo?.promotionalPriceInCent ?? 0
    }
}

export const itemRepository = new ItemRepository()
