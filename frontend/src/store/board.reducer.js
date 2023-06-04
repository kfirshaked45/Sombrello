export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UNDO_REMOVE_BOARD = 'UNDO_REMOVE_BOARD'
export const SET_BOARD = 'SET_BOARD'

const initialState = {
  boards: [],
  board: null,
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      state = { ...state, boards: action.boards }
      break

    case 'SET_BOARD':
      state = { ...state, board: action.board }
      break

    case 'ADD_BOARD':
      state = { ...state, boards: [...state.boards, action.board] }
      break

    case 'UPDATE_BOARD':
      state = { ...state, board: action.board }
      break

    default:
      return state
  }
  // For debug:
  window.boardState = state
  return state
}
