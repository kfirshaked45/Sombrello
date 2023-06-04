import { boardService } from '../services/board.service.local'

// Action Creators:
export function getActionAddBoard(board) {
  return {
    type: 'ADD_BOARD',
    board,
  }
}

export function getActionUpdateBoard(board) {
  return {
    type: 'UPDATE_BOARD',
    board,
  }
}

export function loadBoards() {
  console.log('LOADINGGGGGG');
  return async (dispatch) => {
    try {
      const boards = await boardService.query()
      dispatch({
        type: 'SET_BOARDS',
        boards: [...boards],
      })
    } catch (err) {
      console.log('Cannot load boards', err)
    }
  }
}

export function addBoard(board) {
  return async (dispatch) => {
    try {
      const savedBoard = await boardService.save(board)
      dispatch(getActionAddBoard({ ...savedBoard }))
    } catch (err) {
      console.log(`cannot add board:`, err)
    }
  }
}

export function getBoard(boardId) {
  return async (dispatch) => {
    try {
      const board = await boardService.getById(boardId)
      dispatch({ type: 'SET_BOARD', board: { ...board } })
    } catch (err) {
      console.log(`cannot add board:`, err)
    }
  }
}

export function updateBoard(board) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    dispatch(getActionUpdateBoard({ ...board }))

    try {
      await boardService.save(board)
    } catch (err) {
      dispatch(getActionUpdateBoard(prevBoard))
      console.log('Cannot update board', err)
    }
  }
}
