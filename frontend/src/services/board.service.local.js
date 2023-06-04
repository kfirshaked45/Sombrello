import { storageService } from './async-storage.service.js'
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
  createDemoBoard,
}
window.cs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter(
      (board) => regex.test(board.vendor) || regex.test(board.description)
    )
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price)
  }
  return boards
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board)
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
  }
  return savedBoard
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId)
  if (!board.msgs) board.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  board.msgs.push(msg)
  await storageService.put(STORAGE_KEY, board)

  return msg
}

function getEmptyBoard() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

async function createDemoBoard() {
  var boards = await storageService.query(STORAGE_KEY)

  if (!boards || boards.length === 0) {
    const board1 = {
      _id: 'b101',
      title: 'Robot dev proj',
      style: {
        background:
          'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80',
        backgroundColor: '#f3f3f3',
        thumbnail:
          'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80&w=400',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
        {
          _id: 'u103',
          fullname: 'Emma Johnson',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
        },
      ],
      groups: [
        {
          title: 'Group 1',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Replace logo',
              id: 'c101',
              style: {},
            },
            {
              title: 'Add Samples',
              id: 'c102',
              style: {},
            },
            {
              title: 'Complete task 1',
              id: 'c103',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 2',
          id: 'g102',
          tasks: [
            {
              title: 'Complete task 2',
              id: 'c104',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Complete task 3',
              id: 'c105',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Complete task 4',
              id: 'c106',
              status: 'in-progress',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 3',
          id: 'g103',
          tasks: [
            {
              title: 'Complete task 5',
              id: 'c107',
              status: 'done',
              style: {},
            },
            {
              title: 'Complete task 6',
              id: 'c108',
              status: 'done',
              style: {},
            },
            {
              title: 'Complete task 7',
              id: 'c109',
              status: 'done',
              style: {},
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
      labels: [
        {
          class: 'light-red-opacity',
          title: '',
          color: 'light-red',
          id: 'sCCYjO',
        },
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
    }
    const board3 = {
      _id: 'b103',
      title: 'Design project',
      style: {
        background:
          'https://images.unsplash.com/photo-1495127280742-47f59274e2db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU3NTUyNDZ8&ixlib=rb-4.0.3&q=80&w=400',
        backgroundColor: '#f3f3f3',
        thumbnail:
          'https://images.unsplash.com/photo-1495127280742-47f59274e2db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODU3NTUyNDZ8&ixlib=rb-4.0.3&q=80&w=400',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
      ],
      groups: [
        {
          title: 'Group 1',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Design logo',
              id: 'c101',
              style: {},
            },
            {
              title: 'Create mockups',
              id: 'c102',
              style: {},
            },
            {
              title: 'Finalize design',
              id: 'c103',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 2',
          id: 'g102',
          tasks: [
            {
              title: 'Implement changes',
              id: 'c104',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Review feedback',
              id: 'c105',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Refine design',
              id: 'c106',
              status: 'in-progress',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 3',
          id: 'g103',
          tasks: [
            {
              title: 'Get client approval',
              id: 'c107',
              status: 'done',
              style: {},
            },
            {
              title: 'Prepare assets',
              id: 'c108',
              status: 'done',
              style: {},
            },
            {
              title: 'Deliver final files',
              id: 'c109',
              status: 'done',
              style: {},
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Design Logo',
          },
        },
      ],
      labels: [
        {
          class: 'light-red-opacity',
          title: '',
          color: 'light-red',
          id: 'sCCYjO',
        },
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
    }

    const board2 = {
      _id: 'b102',
      title: 'Design project',
      style: {
        background:
          'https://images.unsplash.com/photo-1671955100937-6c551efa6e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQyMjMxMjU&ixlib=rb-4.0.3&q=80&w=400',
        backgroundColor: '#f3f3f3',
        thumbnail:
          'https://images.unsplash.com/photo-1671955100937-6c551efa6e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzQyMjMxMjU&ixlib=rb-4.0.3&q=80&w=400',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
      ],
      groups: [
        {
          title: 'Group 1',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Design logo',
              id: 'c101',
              title: 'Replace logo',
            },
            {
              title: 'Create mockups',
              id: 'c102',
              style: {},
              labels: ['l101', 'l102'],
              description: 'This task is here to remind me to add samples',
            },
            {
              title: 'Finalize design',
              id: 'c103',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          title: 'Group 2',
          id: 'g102',
          tasks: [
            {
              title: 'Implement changes',
              id: 'c104',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Review feedback',
              id: 'c105',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Refine design',
              id: 'c106',
              status: 'in-progress',
              style: {},
            },
            {
              id: 'c111',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          title: 'Group 3',
          id: 'g103',
          tasks: [
            {
              title: 'Get client approval',
              id: 'c107',
              status: 'done',
              style: {},
            },
            {
              title: 'Prepare assets',
              id: 'c108',
              status: 'done',
              style: {},
            },
            {
              title: 'Deliver final files',
              id: 'c109',
              status: 'done',
              style: {},
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Design Logo',
          },
        },
      ],
      labels: [
        {
          class: 'light-red-opacity',
          title: '',
          color: 'light-red',
          id: 'sCCYjO',
        },
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
    }

    await storageService.post(STORAGE_KEY, board1)
    await storageService.post(STORAGE_KEY, board2)
    await storageService.post(STORAGE_KEY, board3)
    // storageService.post(STORAGE_KEY, board);
  }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
