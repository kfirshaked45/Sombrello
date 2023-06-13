import { logger } from './logger.service.mjs'
import { Server } from 'socket.io'

let gIo = null

export function setupSocketAPI(http) {
  gIo = new Server(http, { cors: { origin: '*' } })
  gIo.on('connection', (socket) => {
    logger.info(`New connected socket [id: ${socket.id}]`)
    socket.on('disconnect', () => {
      logger.info(`Socket disconnected [id: ${socket.id}]`)
    })
    socket.on('join-board', (boardId) => {
      if (socket.myBoardId === boardId) return
      if (socket.myBoardId) {
        socket.leave(socket.myBoardId)
        logger.info(
          `Socket is leaving board ${socket.myBoardId} [id: ${socket.id}]`
        )
      }
      socket.join(boardId)
      socket.myBoardId = boardId
      logger.info(
        `Socket is now on board ${socket.myBoardId} [id: ${socket.id}]`
      )
    })
    socket.on('set-user-socket', (userId) => {
      logger.info(
        `Setting socket.userId = ${userId} for socket [id: ${socket.id}]`
      )
      socket.userId = userId
    })
    socket.on('update-board', (board) => {
      logger.info(`Setting update board for socket [id: ${socket.id}]`)
      broadcast({
        type: 'update-board',
        data: board,
        room: socket.myBoardId,
        userId: socket.userId, // Add this line to include the userId
      })
    })
  })
}

// If possible, send to all sockets BUT not the current socket
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, userId }) {
  userId = userId?.toString()
  logger.info(`Broadcasting event: ${type}`)
  const excludedSocket = await _getUserSocket(userId)

  if (room && excludedSocket) {
    logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
    excludedSocket.broadcast.to(room).emit(type, data)
  } else if (excludedSocket) {
    logger.info(`Broadcast to all excluding user: ${userId}`)
    excludedSocket.broadcast.emit(type, data)
  } else if (room) {
    logger.info(`Emit to room: ${room}`)
    gIo.to(room).emit(type, data)
  } else {
    logger.info(`Emit to all`)
    gIo.emit(type, data)
  }
}

function emitTo({ type, data, label }) {
  if (label) gIo.to('watching:' + label.toString()).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
  userId = userId.toString()
  const socket = await _getUserSocket(userId)

  if (socket) {
    logger.info(
      `Emitting event: ${type} to user: ${userId} socket [id: ${socket.id}]`
    )
    socket.emit(type, data)
  } else {
    logger.info(`No active socket for user: ${userId}`)
  }
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s) => s.userId === userId)
  return socket
}

async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

export default {
  // set up the sockets service and define the API
  setupSocketAPI,
  // emit to everyone / everyone in a specific room (label)
  emitTo,
  // emit to a specific user (if currently active in system)
  emitToUser,
  // Send to all sockets BUT not the current socket - if found
  // (otherwise broadcast to a room / to all)
  broadcast,
}
