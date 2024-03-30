import type { Request, Response, NextFunction } from 'express'

// middleware for logging requests
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

// middleware for handling not found routes
export const routeNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// middleware for handling errors
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
