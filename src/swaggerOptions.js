const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

module.exports = options
