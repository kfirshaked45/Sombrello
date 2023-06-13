// socket.service.js
import io from 'socket.io-client'
import { userService } from './user.service'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  let socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedInUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit('set-user-socket', userId)
    },
    disconnect() {
      socket.disconnect()
    },
  }
  return socketService
}
