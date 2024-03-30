import request from 'supertest'
import app from '../../app'

describe('POST /api/delivery-price', () => {
  it('should calculate delivery price correctly', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      zone: 'central',
      totalDistance: 12,
      itemType: 'perishable',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ totalPrice: 20.5 })
  })

  // error handling
  it('should return 400 if organizationId is missing', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      zone: 'central',
      totalDistance: 12,
      itemType: 'perishable',
    })

    expect(response.status).toBe(400)
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['organizationId'],
        message: 'Required',
      },
    ])
  })
})
