import { Request, Response } from 'express'
import {
  createOrgRequestSchema,
  createItemRequestSchema,
  createPricingRequestSchema,
} from '../validation/orgRequestValidation'
import prisma from '../db/prismaClient'
import { calculateKmPrice } from '../services/orgServices'

export async function createOrg(req: Request, res: Response): Promise<void> {
  try {
    const validatedBody = createOrgRequestSchema.parse(req.body)
    const { name } = validatedBody

    const org = await prisma.organization.create({ data: { name } })

    res.status(200).json({ message: 'Organization created successfully', org })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function createItem(req: Request, res: Response): Promise<void> {
  try {
    const validatedBody = createItemRequestSchema.parse(req.body)
    const { organizationId, type, description } = validatedBody

    const item = await prisma.item.create({
      data: { organizationId, type, description },
    })

    res.status(200).json({ message: 'Item created successfully', item })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export async function createPricing(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const validatedBody = createPricingRequestSchema.parse(req.body)

    const { organizationId, itemId, zone, baseDistanceInKm, fixPrice } =
      validatedBody

    const item = await prisma.item.findUnique({ where: { id: itemId } })

    if (!item) {
      res.status(404).json({ error: 'Item not found' })
      return
    }

    const kmPrice = calculateKmPrice(item.type)

    const pricing = await prisma.pricing.create({
      data: {
        organizationId,
        itemId,
        zone,
        baseDistanceInKm,
        kmPrice,
        fixPrice,
      },
    })

    res.status(200).json({ message: 'Pricing created successfully', pricing })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
