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

  it('should return 400 if itemType is invalid', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      zone: 'central',
      totalDistance: 12,
      itemType: 'test-123',
    })

    expect(response.status).toBe(400)
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_enum_value',
        message:
          "Invalid enum value. Expected 'perishable' | 'non-perishable', received 'test-123'",
        options: ['perishable', 'non-perishable'],
        path: ['itemType'],
        received: 'test-123',
      },
    ])
  })

  it('should return 404 when no pricing is available for the given zone', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      zone: 'test-123',
      totalDistance: 12,
      itemType: 'perishable',
    })

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: 'Pricing not found' })
  })

  it('should return 400 if zone is missing', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      totalDistance: 12,
      itemType: 'perishable',
    })

    expect(response.status).toBe(400)
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['zone'],
        message: 'Required',
      },
    ])
  })

  it('should return 400 if totalDistance is missing', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      zone: 'central',
      itemType: 'perishable',
    })

    expect(response.status).toBe(400)
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'undefined',
        path: ['totalDistance'],
        message: 'Required',
      },
    ])
  })

  it('should return 400 if itemType is missing', async () => {
    const response = await request(app).post('/api/delivery-price').send({
      organizationId: 2,
      zone: 'central',
      totalDistance: 12,
    })

    expect(response.status).toBe(400)
    expect(JSON.parse(response.body.error)).toEqual([
      {
        code: 'invalid_type',
        expected: "'perishable' | 'non-perishable'",
        received: 'undefined',
        path: ['itemType'],
        message: 'Required',
      },
    ])
  })
})
