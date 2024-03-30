import request from 'supertest'
import app from '../../app'

describe('POST /api/org', () => {
  it('should create an organization and return success message', async () => {
    const response = await request(app).post('/api/org').send({ name: 'test' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Organization created successfully')
    expect(response.body.org.name).toBe('test')
  })
})

describe('POST /api/org/item', () => {
  it('should create an item and return success message', async () => {
    const response = await request(app).post('/api/org/item').send({
      organizationId: 2,
      type: 'non-perishable',
      description: 'Soda',
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Item created successfully')
    expect(response.body.item.organizationId).toBe(2)
    expect(response.body.item.type).toBe('non-perishable')
    expect(response.body.item.description).toBe('Soda')
  })
})

describe('POST /api/org/pricing', () => {
  it('should create a pricing and return success message', async () => {
    const response = await request(app).post('/api/org/pricing').send({
      organizationId: 2,
      itemId: 2,
      zone: 'central',
      baseDistanceInKm: 5,
      fixPrice: 10,
    })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Pricing created successfully')
    expect(response.body.pricing.organizationId).toBe(2)
    expect(response.body.pricing.itemId).toBe(2)
    expect(response.body.pricing.zone).toBe('central')
    expect(response.body.pricing.baseDistanceInKm).toBe(5)
    expect(response.body.pricing.kmPrice).toBe(1)
    expect(response.body.pricing.fixPrice).toBe(10)
  })
})
