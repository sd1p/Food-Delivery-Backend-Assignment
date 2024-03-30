import { z } from 'zod'

export const deliveryRequestSchema = z.object({
  organizationId: z.number(),
  zone: z.string(),
  totalDistance: z.number(),
  itemType: z.enum(['perishable', 'non-perishable']),
})
