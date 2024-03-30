import { z } from 'zod'

export const createOrgRequestSchema = z.object({
  name: z.string(),
})

export const createItemRequestSchema = z.object({
  organizationId: z.number(),
  type: z.enum(['perishable', 'non-perishable']),
  description: z.string(),
})

export const createPricingRequestSchema = z.object({
  organizationId: z.number(),
  itemId: z.number(),
  zone: z.string(),
  baseDistanceInKm: z.number(),
  fixPrice: z.number(),
})
