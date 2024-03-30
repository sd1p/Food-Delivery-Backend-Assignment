export const calculateKmPrice = (itemType: string) => {
  if (itemType !== 'non-perishable' && itemType !== 'perishable') {
    throw new Error('Invalid item type')
  }
  return itemType === 'non-perishable' ? 1 : 1.5
}
