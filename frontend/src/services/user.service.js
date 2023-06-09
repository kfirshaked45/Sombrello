import { httpService } from './http.service'
import { utilService } from './util.service'
import userImg from '../assets/img/user-img.jpg'

export const userService = {
  getUsers,
  login,
  logout,
  signup,
  getLoggedInUser,
  removeUserFromTasks,
}

const GUEST_IMG_URL = userImg
const STORAGE_KEY_LOGGEDIN = 'loggedInUser'
const BASE_URL = `user/`

async function login(credentials, isGoogleAuth) {
  try {
    let user
    if (isGoogleAuth)
      user = await httpService.post('google-auth/login', credentials)
    else user = await httpService.post('auth/login', credentials)

    if (user) sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
  } catch (err) {
    console.log('Cannot login:', err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post('auth/logout')
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  } catch (err) {
    console.log(`Cannot logout:`, err)
  }
}

async function signup(credentials, isGoogleAuth) {
  try {
    let user
    if (isGoogleAuth) {
      user = await httpService.post('google-auth/signup', credentials)
    } else {
      credentials.imgUrl = GUEST_IMG_URL
      user = await httpService.post('auth/signup', credentials)
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))

    return user
  } catch (err) {
    console.log('Cannot signup', err)
    throw err
  }
}

function getLoggedInUser() {
  return (
    JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) || {
      fullname: 'Guest',
      username: 'Guest',
      imgUrl: GUEST_IMG_URL,
      _id: utilService.makeId(),
    }
  )
}

async function getUsers() {
  try {
    return await httpService.get(BASE_URL)
  } catch (err) {
    console.log('Cannot get users ', err)
  }
}

function removeUserFromTasks(groups, userId) {
  groups.forEach(
    (group) =>
      (group.tasks = group.tasks.map((task) =>
        task.memberIds
          ? {
              ...task,
              memberIds: task.memberIds.filter(
                (memberId) => memberId !== userId
              ),
            }
          : task
      ))
  )
  return groups
}
