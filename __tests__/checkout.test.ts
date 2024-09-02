import { afterEach, describe, expect, it } from '@jest/globals';
import { mockItemRepository } from '../src/__mocks__/itemRepository';
import Checkout from '../src/checkout';
import PriceRules from '../src/priceRules';

// Item   Unit      Special
//        Price     Price
//   --------------------------
//     A     50       3 for 130
//     B     30       2 for 45
//     C     20
//     D     15


describe("Checkout test", () => {
  const mockPriceRule = new PriceRules(mockItemRepository)
  const checkout = new Checkout(mockPriceRule, mockItemRepository)

  afterEach(() => {
    checkout.clearAll()
  })

  it('should return total of 100 if A is scanned only twice', () => {
    const items = ["A", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(100);
  });

  it('should return total of special price 130 if A is scanned 3 times', () => {
    const items = ["A", "A", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(130);
  });

  it('should return total price of 260 if A is scanned 6 times', () => {
    const items = ["A", "A", "A", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(180);
  });

  it('should return total price of 180 if A is scanned 4 times', () => {
    const items = ["A", "A", "A", "A", "A", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(260);
  });

  it('should return total of 160 if A->A->B->A is scanned in the order', () => {
    const items = ["A", "A", "B", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(160);
  });

  it('should return total of 170 if A->B->A->B->A is scanned in the order', () => {
    const items = ["A", "B", "A", "B", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(175);
  });

  it('should return total of 190 if D->A->B->A->B->A is scanned in the order', () => {
    const items = ["D", "A", "B", "A", "B", "A"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(190);
  });

  it('should return total of 190 if A->A->A->B->B->D is scanned in the order', () => {
    const items = ["A", "A", "A", "B", "B", "D"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(190);
  });

  it('should return total 0 if invalid items are being scanned', () => {
    const items = ["A@", "A1", "A3", "B4", "B3", "DD"]
    items.forEach(item => {
      checkout.scan(item)
    })
    expect(checkout.total).toBe(0);
  });


  
})
