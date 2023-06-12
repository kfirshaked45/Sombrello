// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  updateTask,
}
window.cs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
  return httpService.get(`boards/`, filterBy)
}

function getById(boardId) {
  return httpService.get(`boards/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`boards/${boardId}`)
}
async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await httpService.put(`boards/${board._id}`, board)
  } else {
    savedBoard = await httpService.post('boards', board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  const savedMsg = await httpService.post(`boards/${boardId}/msg`, { txt })
  return savedMsg
}

function getEmptyBoard() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

async function updateTask(taskToUpdate, boardId, groupId) {
  try {
    const board = await getById(boardId)
    const groupIdx = board.groups.findIndex((group) => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(
      (currTask) => currTask.id === taskToUpdate.id
    )
    // const updatedTask = { ...currTask, ...task }
    board.groups[groupIdx].tasks.splice(taskIdx, 1, taskToUpdate)
    return save(board)
  } catch (err) {
    console.log('could not update task', err)
  }
}
