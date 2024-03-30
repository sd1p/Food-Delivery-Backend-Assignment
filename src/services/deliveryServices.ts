// business logic for delivery price calculation
export const deliveryPriceCalculator = (
  totalDistance: number,
  itemType: string,
  baseDistanceInKm: number,
  fixPrice: number
): number => {
  const kmPrice = itemType === 'non-perishable' ? 1 : 1.5
  if (totalDistance <= baseDistanceInKm) {
    return fixPrice
  }

  return fixPrice + (totalDistance - baseDistanceInKm) * kmPrice
}
