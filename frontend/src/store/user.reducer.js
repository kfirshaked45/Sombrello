import { userService } from '../services/user.service'

export const SET_USER = 'SET_USER'

const initialState = {
  user: userService.getLoggedInUser(),
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      state = { ...state, user: action.user }
      break

    default:
      return state
  }

  // For debug:
  window.boardState = state
  return state
}
