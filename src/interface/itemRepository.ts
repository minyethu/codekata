export interface IItemRepository {
    isItemExist:(item: string) => boolean
    getUnitPriceInCent: (item: string) => number
    getPromotionalUnit: (item: string) => number
    getPromotionalPriceInCent: (item: string) => number
}