import express from 'express'
import {
  createItem,
  createOrg,
  createPricing,
} from '../controllers/orgController'

const orgRoute = express.Router()

orgRoute.route('/org').post(createOrg)
orgRoute.route('/org/item').post(createItem)
orgRoute.route('/org/pricing').post(createPricing)

export default orgRoute
