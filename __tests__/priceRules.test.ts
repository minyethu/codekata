import { describe, expect, it } from '@jest/globals';
import { mockItemRepository } from '../src/__mocks__/itemRepository';
import PriceRules from '../src/priceRules';

// Item   Unit      Special
//        Price     Price
//   --------------------------
//     A     50       3 for 130
//     B     30       2 for 45
//     C     20
//     D     15


describe("PriceRule test", () => {
  const mockPriceRule = new PriceRules(mockItemRepository)

  it('should return 50 if there is only one unit of A', () => {
    const value = mockPriceRule.calculate("A", 1)
    expect(value).toBe(50);
  });


  it('should return 100 if there are two units of A', () => {
    const value = mockPriceRule.calculate("A", 2)
    expect(value).toBe(100);
  });

  it('should return 130 if there are three units of A', () => {
    const value = mockPriceRule.calculate("A", 3)
    expect(value).toBe(130);
  });


  it('should return 230 if there are five units of A', () => {
    const value = mockPriceRule.calculate("A", 5)
    expect(value).toBe(230);
  });

  it('should return 260 if there are six units of A', () => {
    const value = mockPriceRule.calculate("A", 6)
    expect(value).toBe(260);
  });

  it('should return 45 if there are two units of B', () => {
    const value = mockPriceRule.calculate("B", 2)
    expect(value).toBe(45);
  });
  
})
