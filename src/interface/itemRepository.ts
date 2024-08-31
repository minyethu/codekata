export interface IItemRepository {
    getUnitPriceInCent: (item: string) => number
    getPromotionalUnit: (item: string) => number
    getPromotionalPriceInCent: (item: string) => number
}