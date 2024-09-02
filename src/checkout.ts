import { IItemRepository } from "./interface/itemRepository";
import { IPriceRules } from "./interface/priceRules";

class Checkout {
    private priceRules: IPriceRules
    private itemRepo: IItemRepository
    private _total: number = 0
    //To store the count of each item
    private items = new Map<string, number>()
    //To store the combined total price of each item
    private itemTotalCost = new Map<string, number>()

    public get total() {
        return this._total;
    }


    constructor(priceRule: IPriceRules, itemRepo: IItemRepository) {
        this.priceRules = priceRule
        this.itemRepo = itemRepo
    }

    //This method will calculate combined total of all items and also, total of the give item
    private calculateTotal(item: string, units: number) {
        const newTotal = this.priceRules.calculate(item, units)
        const currentTotal = this.itemTotalCost.get(item) || 0
        //Remove the current total of the item from the combined total before adding back the new total. For example, the combined total is 150 and 
        //the item contributes 60 in total currently, we remove that 60 first.
        this._total -= currentTotal
        this._total +=  newTotal
        this.itemTotalCost.set(item, newTotal)
    }

    //Method to remove an item by one unit
    public remove(item: string) {
        if(this.items.has(item)) {
            const currentCount = this.items.get(item)
            if(currentCount === 1) {
                this.items.delete(item)
            } else {
                this.items.set(item, currentCount! - 1)
            }
        } else {
            console.error("Error: The item does not exist!")
        }
    }

    public clearAll() {
        this._total = 0;
        this.items.clear()
        this.itemTotalCost.clear()
    }

    public scan(item: string) {
        if(!this.itemRepo.isItemExist(item)) {
            console.error("The item does not exist")
            return;
        }

        if(this.items.has(item)) {
            const currentCount = this.items.get(item)
            this.items.set(item, currentCount! + 1)
        } else {
            this.items.set(item, 1)
        }
        this.calculateTotal(item, this.items.get(item)!)
    }


}

export default Checkout
