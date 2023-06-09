import { userService } from '../services/user.service'

export function signup(credentials, isGoogleAuth) {
  return async (dispatch) => {
    try {
      const signedUser = await userService.signup(credentials, isGoogleAuth)
      dispatch({ type: 'SET_USER', user: signedUser })
    } catch (err) {
      console.log(`Cannot signup`, err)
      throw err
    }
  }
}

export function login(credentials, isGoogleAuth) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials, isGoogleAuth)
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('Cannot login', err)
      throw err
    }
  }
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout()
      dispatch({ type: 'SET_USER', user: null })
    } catch (err) {
      console.log('Cannot login', err)
    }
  }
}
