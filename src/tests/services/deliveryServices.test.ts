import { deliveryPriceCalculator } from '../../services/deliveryServices'

describe('testing deliveryPriceCalculator', () => {
  it('should return fixed price for non-perishable items within base distance', () => {
    const result = deliveryPriceCalculator(5, 'non-perishable', 10, 20)
    expect(result).toBe(20)
  })

  it('should calculate price for non-perishable items beyond base distance', () => {
    const result = deliveryPriceCalculator(15, 'non-perishable', 10, 20)
    expect(result).toBe(25)
  })

  it('should calculate price for perishable items beyond base distance', () => {
    const result = deliveryPriceCalculator(15, 'perishable', 10, 20)
    expect(result).toBe(27.5)
  })
})
