import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { createServer } from 'http' // Updated import
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app) // Create server using 'createServer'

// Express App Config
app.use(cookieParser())
app.use(express.json({ limit: '200mb' }))

// CORS configuration
const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173',
  ],
  credentials: true,
}
app.use(cors(corsOptions))

import { authRoutes } from './api/auth/auth.routes.mjs'
import { boardRoutes } from './api/board/board.routes.mjs'
import { setupSocketAPI } from './services/socket.service.mjs'
import { setupAsyncLocalStorage } from './middlewares/setupAls.middleware.mjs'
import { logger } from './services/logger.service.mjs'

// Socket.io setup
const io = new Server(server, {
  cors: corsOptions,
})

setupSocketAPI(server)

// Routes
app.all('*', setupAsyncLocalStorage)
app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
  app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
  })
}

const port = process.env.PORT || 3030
server.listen(port, () => {
  logger.info('Server is running on port: ' + port)
})
