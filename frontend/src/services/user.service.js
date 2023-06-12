import { httpService } from './http.service'
import { utilService } from './util.service'
import userImg from '../assets/img/user-img.jpg'
import omerImg from '../assets/img/omer-img.jpg'
import ofekImg from '../assets/img/user-img1.jpg'
import kfirImg from '../assets/img/kfirImg.jpg'

const fixedMembers = [
  {
    _id: 'u101',
    fullname: 'Kfir Shaked',
    userName: 'Kfir',
    password: 'Kfir123',
    imgUrl: kfirImg,
  },
  {
    _id: 'u102',
    fullname: 'Ofek Rashti',
    userName: 'Ofek',
    password: 'ofekr2261',
    imgUrl: ofekImg,
  },
  {
    _id: 'u103',
    fullname: 'Omer Hassin',
    userName: 'Omer',
    password: 'omer123',
    imgUrl: omerImg,
  },
]

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
    if (isGoogleAuth) {
      user = await httpService.post('google-auth/login', credentials)
    } else {
      const fixedMember = fixedMembers.find(
        (member) =>
          member.userName === credentials.username &&
          member.password === credentials.password
      )
      if (!fixedMember) {
        throw new Error('Invalid credentials')
      }
      user = {
        _id: fixedMember._id,
        fullname: fixedMember.fullname,
        username: fixedMember.userName,
        imgUrl: fixedMember.imgUrl,
      }
    }

    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
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
      const fixedMember = fixedMembers.find(
        (member) => member.fullname === credentials.fullname
      )
      if (fixedMember) {
        credentials.imgUrl = fixedMember.imgUrl
      } else {
        credentials.imgUrl = GUEST_IMG_URL
      }
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
  const loggedInUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))

  if (loggedInUser) {
    const fixedMember = fixedMembers.find(
      (member) => member._id === loggedInUser._id
    )
    if (fixedMember) {
      return {
        ...loggedInUser,
        imgUrl: fixedMember.imgUrl,
      }
    }
  }

  return {
    fullname: 'Guest',
    username: 'Guest',
    imgUrl: GUEST_IMG_URL,
    _id: utilService.makeId(),
  }
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
