import { calculateKmPrice } from '../../services/orgServices'

describe('calculateKmPrice', () => {
  it('should return 1 for non-perishable items', () => {
    const result = calculateKmPrice('non-perishable')
    expect(result).toBe(1)
  })

  it('should return 1.5 for perishable items', () => {
    const result = calculateKmPrice('perishable')
    expect(result).toBe(1.5)
  })

  it('should throw an error for any other item type', () => {
    expect(() => calculateKmPrice('other')).toThrow('Invalid item type')
  })
})
