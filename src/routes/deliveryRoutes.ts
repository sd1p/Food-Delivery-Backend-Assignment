import express from 'express'
import { getDeliveryPrice } from '../controllers/deliveryController'

const deliveryPriceRoute = express.Router()

deliveryPriceRoute.route('/delivery-price').post(getDeliveryPrice)

export default deliveryPriceRoute
