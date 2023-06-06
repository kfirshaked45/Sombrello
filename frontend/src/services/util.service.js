export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  isBackgroundDark,
  reorder,
  getModalPosition,
  dueDateFormat,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function isBackgroundDark(color) {
  if (!color) return true

  let r
  let g
  let b
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  if (hsp > 127.5) {
    return false
  } else {
    return true
  }
}

function reorder(array, index1, index2) {
  const [removed] = array.splice(index1, 1)
  array.splice(index2, 0, removed)
}

function getModalPosition(type, ref) {
  const rect = ref.current.getBoundingClientRect()
  const pos = { bottom: rect.bottom + 8, left: rect.left }
  if (window.innerWidth - rect.right < 150) pos.left -= 130
  if (window.innerHeight - rect.bottom < 450) pos.bottom -= 200
  // Position is different for the filter and account modals
  if (type === 'Filter' || type === 'Account') {
    pos.right = 5
    pos.bottom += 8
  }
  if (type === 'Location preview actions') {
    pos.bottom += 198
    pos.right += 5
  }
  return pos
}

function dueDateFormat(dueDate) {
  const date = new Date(dueDate);
  const options = { day: 'numeric', month: 'short' };
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}