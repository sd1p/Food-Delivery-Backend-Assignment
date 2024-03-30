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
        url: 'http://localhost:4000',
        description: 'Development server',
      },
      {
        url: process.env.PROD_API_URL,
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

module.exports = options
