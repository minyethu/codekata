// Item   Unit      Special
//        Price     Price
//   --------------------------
//     A     50       3 for 130
//     B     30       2 for 45
//     C     20
//     D     15

import { IItemRepository } from "../interface/itemRepository"


class MockItemRepository implements IItemRepository {
    isItemExist(item: string) {
        switch(item){
            case "A":
            case "B":
            case "C":
            case "D":   
                return true
            default:
                return false
        }
    }

    getUnitPriceInCent(item: string) {
        switch(item){
            case "A":
                return 50
            case "B":
                return 30
            case "C":
                return 20
            case "D":
                return 15
            default:
                return 1
        }
    };

    getPromotionalUnit(item: string) {
        switch(item){
            case "A":
                return 3
            case "B":
                return 2
            case "C":
                return 0
            case "D":
                return 0
            default:
                return 0
        }
    };
    getPromotionalPriceInCent(item: string) {
        switch(item){
            case "A":
                return 130
            case "B":
                return 45
            case "C":
                return 0
            case "D":
                return 0
            default:
                return 0
        }
    };

}

export const mockItemRepository = new MockItemRepository()