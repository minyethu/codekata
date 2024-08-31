import { IItemRepository } from "./interface/itemRepository";
import { IPriceRules } from "./interface/priceRules";

class PriceRules implements IPriceRules {
    readonly itemRepository: IItemRepository

    constructor(itemSerivice: IItemRepository) {
        this.itemRepository = itemSerivice;
    }


    calculate(item: string, units: number): number {
        const unitPrice = this.itemRepository.getUnitPriceInCent(item)
        const promotionalPrice = this.itemRepository.getPromotionalPriceInCent(item)
        const promotionalUnit = this.itemRepository.getPromotionalUnit(item) > 0 ? this.itemRepository.getPromotionalUnit(item) : 1
        let totalPromotionPrice = 0
        if(promotionalPrice > 0 && promotionalUnit > 1) {
            totalPromotionPrice = promotionalPrice * Math.floor(units/promotionalUnit)
        }
        const total =  totalPromotionPrice + units%promotionalUnit * unitPrice
        return total
    }
}

export default PriceRules;




