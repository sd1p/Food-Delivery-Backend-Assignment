import { Request, Response } from 'express'
import { deliveryRequestSchema } from '../validation/deliveryRequestValidation'
import prisma from '../db/prismaClient'
import { deliveryPriceCalculator } from '../services/deliveryServices'

export async function getDeliveryPrice(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const validatedBody = deliveryRequestSchema.parse(req.body)

    const { organizationId, zone, totalDistance, itemType } = validatedBody

    const pricing = await prisma.pricing.findFirst({
      where: { organizationId, zone },
    })

    if (!pricing) {
      res.status(404).json({ error: 'Pricing not found' })
      return
    }

    const { baseDistanceInKm, fixPrice } = pricing

    const totalPrice = deliveryPriceCalculator(
      totalDistance,
      itemType,
      baseDistanceInKm,
      fixPrice
    )

    res.status(200).json({ totalPrice })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
