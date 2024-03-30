import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import {
  errorHandler,
  routeNotFound,
  requestLogger,
} from './middlewares/errorMiddleware'
import deliveryPriceRoutes from './routes/deliveryRoutes'
import orgRoutes from './routes/orgRoutes'

// loading environment variables
dotenv.config()

// creating express app
const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(requestLogger)

// swagger api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// routes
app.use('/api', deliveryPriceRoutes)
app.use('/api', orgRoutes)

// error handling middlewares
app.use(routeNotFound)
app.use(errorHandler)

// starting the server
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
