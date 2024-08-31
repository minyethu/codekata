import { IPriceRules } from "./interface/priceRules";

class Checkout {
    private priceRules: IPriceRules
    private _total: number = 0
    //To store the count of each item
    private itemCounts = new Map<string, number>()
    //To store the combined total price of each item
    private itemTotalCost = new Map<string, number>()

    public get total() {
        return this._total;
    }


    constructor(priceRule: IPriceRules) {
        this.priceRules = priceRule
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
        if(this.itemCounts.has(item)) {
            const currentCount = this.itemCounts.get(item)
            if(currentCount === 1) {
                this.itemCounts.delete(item)
            } else {
                this.itemCounts.set(item, currentCount! - 1)
            }
        } else {
            console.error("Error: The item does not exist!")
        }
    }

    public clearAll() {
        this._total = 0;
        this.itemCounts.clear()
        this.itemTotalCost.clear()
    }

    public scan(item: string) {
        if(this.itemCounts.has(item)) {
            const currentCount = this.itemCounts.get(item)
            this.itemCounts.set(item, currentCount! + 1)
        } else {
            this.itemCounts.set(item, 1)
        }
        this.calculateTotal(item, this.itemCounts.get(item)!)
    }


}

export default Checkout
