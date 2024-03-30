export const calculateKmPrice = (itemType: string) => {
  return itemType === 'non-perishable' ? 1 : 1.5
}
