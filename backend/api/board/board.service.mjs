import { dbService } from '../../services/db.service.mjs'
import { logger } from '../../services/logger.service.mjs'
import { utilService } from '../../services/util.service.mjs'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const boardService = {
  remove,
  query,
  getBoardById,
  add,
  update,
  addBoardMsg,
  removeBoardMsg,
}

// const PAGE_SIZE = 3

async function query() {
  try {
    const collection = await dbService.getCollection('boards')
    const boards = await collection.find().toArray()

    return boards
  } catch (err) {
    logger.error('cannot find boards', err)
    throw err
  }
}

async function getBoardById(boardId) {
  try {
    const collection = await dbService.getCollection('boards')
    const board = collection.findOne({ _id: ObjectId(boardId) })
    return board
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err)
    throw err
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('boards')
    await collection.deleteOne({ _id: ObjectId(boardId) })
    return boardId
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err)
    throw err
  }
}

async function add(board) {
  try {
    const collection = await dbService.getCollection('boards')
    await collection.insertOne(board)
    return board
  } catch (err) {
    logger.error('cannot insert board', err)
    throw err
  }
}

async function update(board) {
  try {
    let boardId = board._id
    let id = ObjectId(board._id)
    delete board._id
    const collection = await dbService.getCollection('boards')
    await collection.updateOne({ _id: id }, { $set: { ...board } })
    board._id = boardId
    return board
  } catch (err) {
    logger.error(`cannot update board ${boardId}`, err)
    throw err
  }
}

async function addBoardMsg(boardId, msg) {
  try {
    msg.id = utilService.makeId()
    const collection = await dbService.getCollection('boards')
    await collection.updateOne(
      { _id: ObjectId(boardId) },
      { $push: { msgs: msg } }
    )
    return msg
  } catch (err) {
    logger.error(`cannot add board msg ${boardId}`, err)
    throw err
  }
}

async function removeBoardMsg(boardId, msgId) {
  try {
    const collection = await dbService.getCollection('boards')
    await collection.updateOne(
      { _id: ObjectId(boardId) },
      { $pull: { msgs: { id: msgId } } }
    )
    return msgId
  } catch (err) {
    logger.error(`cannot add board msg ${boardId}`, err)
    throw err
  }
}
