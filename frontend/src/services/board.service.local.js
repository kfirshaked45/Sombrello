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
  console.log(boards)
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
    boards = [
      {
        _id: 'b101',
        title: 'Sombrello project',
        style: {
          background:
            'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80',
          backgroundColor: '#030504',
          thumbnail:
            'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80&w=400',
        },
        isStarred: false,
        members: [
          {
            _id: 'u101',
            fullname: 'Kfir Shaked',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
          },
          {
            _id: 'u102',
            fullname: 'Ofek Rashti',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
          },
          {
            _id: 'u103',
            fullname: 'Omer Hassin',
            imgUrl:
              'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
          },
        ],
        groups: [
          {
            title: 'Backlog-Server',
            id: 'g101',
            archivedAt: 1589983468418,
            tasks: [
              {
                title: 'Create backend services',
                id: 't101',
                members: [
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [],
                isDone: false,
                comments: [{ txt: 'great job!', by: 'u103', at: Date.now() }],
              },
              {
                title: 'Routing Directory',
                id: 't102',
                members: [
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953579/trello/routing-directory_i7iskr.jpg',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: 'Socket Implementation',
                id: 't103',
                members: [],
                style: { coverColor: '#ef7564' },
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l105',
                    title: 'Label 5',
                    color: '#9f8fef',
                    //purple
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Database Implementation',
                id: 't104',
                members: [],
                style: { coverColor: '#ef7564' },
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'data model approval',
                id: 't105',
                members: [
                  {
                    _id: 'u102',
                    fullname: 'Ofek Rashti',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: 1672608000000,
                labels: [],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Create a server with express',
                id: 't106',
                members: [],
                style: {},
                desc: '',
                dueDate: 1672608000000,
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953580/trello/asset_6_ey9fby.jpg',
                ],
                isDone: false,
                comments: [],
              },
            ],
            style: {},
          },
          {
            title: 'Backlog-client',
            id: 'g102',
            tasks: [
              {
                title: 'Planning the components tree',
                id: 't201',
                members: [
                  {
                    _id: 'u101',
                    fullname: 'Kfir Shaked',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                  },
                  {
                    _id: 'u102',
                    fullname: 'Ofek Rashti',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                  },
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: 1706668800000,
                labels: [
                  {
                    id: 'l101',
                    title: 'Label 1',
                    color: '#4bce97',
                    //green
                  },
                  {
                    id: 'l102',
                    title: 'Label 2',
                    color: '#e2b203',
                    //yellow
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [
                  { txt: 'add labels', by: 'u101', at: Date.now() - 200000 },
                  { txt: 'done that', by: 'u103', at: Date.now() },
                ],
              },
              {
                title: 'Add TaskDetails',
                id: 't202',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l101',
                    title: 'Label 1',
                    color: '#4bce97',
                    //green
                  },
                  {
                    id: 'l102',
                    title: 'Label 2',
                    color: '#e2b203',
                    //yellow
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Adding npm libraries',
                id: 't203',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l101',
                    title: 'Label 1',
                    color: '#4bce97',
                    //green
                  },
                  {
                    id: 'l102',
                    title: 'Label 2',
                    color: '#e2b203',
                    //yellow
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                  {
                    id: 'l106',
                    title: 'Label 6',
                    color: '#579dff',
                    //blue
                  },
                ],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953581/trello/asset_7_wmthnj.png',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: 'Build basin template',
                id: 't204',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l103',
                    title: 'Label 3',
                    color: '#faa53d',
                    //orange
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'implement Sass',
                id: 't205',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953581/trello/asset_8_qxvvvi.jpg',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: '-',
                id: 't206',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953581/trello/asset_9_ho1voy.jpg',
                ],
                isDone: false,
                comments: [],
              },
            ],
            style: {},
          },
          {
            title: 'In development',
            id: 'g103',
            tasks: [
              {
                title: 'Sanity test for new component',
                id: 't301',
                members: [
                  {
                    _id: 'u102',
                    fullname: 'Ofek Rashti',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                  },
                ],
                style: { coverColor: '#4bce97' },
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l102',
                    title: 'Label 2',
                    color: '#e2b203',
                    //yellow
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'functional testing for app header',
                id: 't302',
                members: [],
                style: { coverColor: '#e2b203' },
                desc: 'we need to add descriptions',
                dueDate: 1685760000000,
                labels: [
                  {
                    id: 'l102',
                    title: 'Label 2',
                    color: '#e2b203',
                    //yellow
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Connecting to PWA',
                id: 't303',
                members: [],
                style: {},
                desc: '',
                dueDate: 1685760000000,
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953581/trello/asset_10_mxuike.jpg',
                ],
                isDone: false,
                comments: [],
              },
            ],
            style: {},
          },
          {
            title: 'Done',
            id: 'g104',
            tasks: [
              {
                title: 'CSS variables',
                id: 't401',
                members: [
                  {
                    _id: 'u101',
                    fullname: 'Kfir Shaked',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                  },
                ],
                style: { coverColor: '#579dff' },
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l101',
                    title: 'Label 1',
                    color: '#4bce97',
                    //green
                  },
                  {
                    id: 'l103',
                    title: 'Label 3',
                    color: '#faa53d',
                    //orange
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [
                  { txt: 'add description', by: 'u101', at: Date.now() },
                ],
              },
              {
                title: 'making functions and mixins',
                id: 't402',
                members: [
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'CSS directory',
                id: '403',
                members: [],
                style: {},
                desc: '',
                dueDate: 1693440000000,
                labels: [],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Checking bugs',
                id: '404',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953571/trello/asset_12_akveuk.jpg',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: 'Creating node js server',
                id: '405',
                members: [
                  {
                    _id: 'u101',
                    fullname: 'Kfir Shaked',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                  },
                  {
                    _id: 'u102',
                    fullname: 'Ofek Rashti',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                  },
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                  {
                    id: 'l106',
                    title: 'Label 6',
                    color: '#579dff',
                    //blue
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [
                  { txt: 'add due date!', by: 'u102', at: Date.now() },
                ],
              },
              {
                title: '',
                id: '406',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953581/trello/asset_7_wmthnj.png',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: 'Enter UserName',
                id: '407',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953571/trello/asset_11_xjhkai.jpg',
                ],
                isDone: false,
                comments: [],
              },
            ],
            style: {},
          },
          {
            title: 'QA',
            id: 'g105',
            tasks: [
              {
                title:
                  'Meeting with head manager for planning the code progress',
                id: 't501',
                members: [],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l103',
                    title: 'Label 3',
                    color: '#faa53d',
                    //orange
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'End day code review with all members',
                id: 't502',
                members: [
                  {
                    _id: 'u101',
                    fullname: 'Kfir Shaked',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                  },
                  {
                    _id: 'u102',
                    fullname: 'Ofek Rashti',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                  },
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: { coverColor: '#579dff' },
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l103',
                    title: 'Label 3',
                    color: '#faa53d',
                    //orange
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
              {
                title: 'Advices from head manager',
                id: 't503',
                members: [],
                style: { coverColor: '#579dff' },
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l103',
                    title: 'Label 3',
                    color: '#faa53d',
                    //orange
                  },
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                ],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953571/trello/asset_13_q3o5uw.jpg',
                ],
                isDone: false,
                comments: [],
              },
              {
                title: 'test this code snippet',
                id: 't504',
                members: [
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: { coverColor: '#faa53d' },
                desc: '',
                dueDate: 1691049600000,
                labels: [
                  {
                    id: 'l105',
                    title: 'Label 5',
                    color: '#9f8fef',
                    //purple
                  },
                ],
                attachments: [],
                isDone: false,
                comments: [],
              },
            ],
            style: {},
          },
          {
            title: 'Ready for production',
            id: 'g106',
            tasks: [
              {
                title: 'Creating data base with mongo',
                id: 't601',
                members: [
                  {
                    _id: 'u101',
                    fullname: 'Kfir Shaked',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                  },
                  {
                    _id: 'u103',
                    fullname: 'Omer Hassin',
                    imgUrl:
                      'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                  },
                ],
                style: {},
                desc: '',
                dueDate: '',
                labels: [
                  {
                    id: 'l104',
                    title: 'Label 4',
                    color: '#f87462',
                    //red
                  },
                  {
                    id: 'l106',
                    title: 'Label 6',
                    color: '#579dff',
                    //blue
                  },
                ],
                attachments: [
                  'https://res.cloudinary.com/djrnw05sb/image/upload/v1685953571/trello/asset_14_jdfund.jpg',
                ],
                isDone: false,
                comments: [],
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
            id: 'l101',
            title: 'Label 1',
            color: '#4bce97',
            //green
          },
          {
            id: 'l102',
            title: 'Label 2',
            color: '#e2b203',
            //yellow
          },
          {
            id: 'l103',
            title: 'Label 3',
            color: '#faa53d',
            //orange
          },
          {
            id: 'l104',
            title: 'Label 4',
            color: '#f87462',
            //red
          },
          {
            id: 'l105',
            title: 'Label 5',
            color: '#9f8fef',
            //purple
          },
          {
            id: 'l106',
            title: 'Label 6',
            color: '#579dff',
            //blue
          },
        ],
      },

      {
        _id: 'b103',
        title: 'Design project',
        style: {
          background:
            'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
          backgroundColor: '#edaabc',
          thumbnail:
            'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
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
      },

      {
        _id: 'b102',
        title: 'Design project',
        style: {
          background:
            'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          backgroundColor: '#eef3ef',
          thumbnail:
            'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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
      },
    ]

    for (const board of boards) {
      await storageService.post(STORAGE_KEY, board)
    }
    // await storageService.post(STORAGE_KEY, board1)
    // await storageService.post(STORAGE_KEY, board2)
    // await storageService.post(STORAGE_KEY, board3)
  }
}

// async function createDemoBoard() {
//   var boards = await storageService.query(STORAGE_KEY)

//   if (!boards || boards.length === 0) {
//     const board1 = {
//       _id: 'b101',
//       title: 'Robot dev proj',
//       style: {
//         background:
//           'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80',
//         backgroundColor: '#030504',
//         thumbnail:
//           'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80&w=400',
//       },
//       isStarred: false,
//       members: [
//         {
//           _id: 'u101',
//           fullname: 'Tal Tarablus',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
//         },
//         {
//           _id: 'u102',
//           fullname: 'John Smith',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
//         },
//         {
//           _id: 'u103',
//           fullname: 'Emma Johnson',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
//         },
//       ],
//       groups: [
//         {
//           title: 'Group 1',
//           id: 'g101',
//           archivedAt: 1589983468418,
//           tasks: [
//             {
//               title: 'Replace logo',
//               id: 'c101',
//               style: {},
//               labels: [
//                 {
//                   id: 'l101',
//                   title: 'Done',
//                   color: '#ef7564',
//                 },
//                 {
//                   id: 'l102',
//                   title: 'Progress',
//                   color: '#61bd33',
//                 },
//               ],
//             },
//             {
//               title: 'Add Samples',
//               id: 'c102',
//               style: {},
//               labels: [
//                 {
//                   id: 'l102',
//                   title: 'Progress',
//                   color: '#61bd33',
//                 },
//               ],
//             },
//             {
//               title: 'Complete task 1',
//               id: 'c103',
//               style: {},
//               labels: [
//                 {
//                   id: 'l102',
//                   title: 'Progress',
//                   color: '#61bd33',
//                 },
//               ],
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 2',
//           id: 'g102',
//           tasks: [
//             {
//               title: 'Complete task 2',
//               id: 'c104',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Complete task 3',
//               id: 'c105',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Complete task 4',
//               id: 'c106',
//               status: 'in-progress',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 3',
//           id: 'g103',
//           tasks: [
//             {
//               title: 'Complete task 5',
//               id: 'c107',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Complete task 6',
//               id: 'c108',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Complete task 7',
//               id: 'c109',
//               status: 'done',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//       ],
//       activities: [
//         {
//           id: 'a101',
//           txt: 'Changed Color',
//           createdAt: 154514,
//           byMember: {
//             fullname: 'Abi Abambi',
//             username: 'Abi Abambi',
//             imgUrl: 'http://some-img',
//             _id: 'u101',
//           },
//           task: {
//             id: 'c101',
//             title: 'Replace Logo',
//           },
//         },
//       ],
//       labels: [
//         {
//           class: 'light-red-opacity',
//           title: '',
//           color: 'light-red',
//           id: 'sCCYjO',
//         },
//         {
//           id: 'l101',
//           title: 'Done',
//           color: '#61bd4f',
//         },
//         {
//           id: 'l102',
//           title: 'Progress',
//           color: '#61bd33',
//         },
//       ],
//     }
//     const board3 = {
//       _id: 'b103',
//       title: 'Design project',
//       style: {
//         background:
//           'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
//         backgroundColor: '#edaabc',
//         thumbnail:
//           'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
//       },
//       isStarred: false,
//       members: [
//         {
//           _id: 'u101',
//           fullname: 'Tal Tarablus',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
//         },
//         {
//           _id: 'u102',
//           fullname: 'John Smith',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
//         },
//       ],
//       groups: [
//         {
//           title: 'Group 1',
//           id: 'g101',
//           archivedAt: 1589983468418,
//           tasks: [
//             {
//               title: 'Design logo',
//               id: 'c101',
//               style: {},
//             },
//             {
//               title: 'Create mockups',
//               id: 'c102',
//               style: {},
//             },
//             {
//               title: 'Finalize design',
//               id: 'c103',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 2',
//           id: 'g102',
//           tasks: [
//             {
//               title: 'Implement changes',
//               id: 'c104',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Review feedback',
//               id: 'c105',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Refine design',
//               id: 'c106',
//               status: 'in-progress',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 3',
//           id: 'g103',
//           tasks: [
//             {
//               title: 'Get client approval',
//               id: 'c107',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Prepare assets',
//               id: 'c108',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Deliver final files',
//               id: 'c109',
//               status: 'done',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//       ],
//       activities: [
//         {
//           id: 'a101',
//           txt: 'Changed Color',
//           createdAt: 154514,
//           byMember: {
//             fullname: 'Abi Abambi',
//             username: 'Abi Abambi',
//             imgUrl: 'http://some-img',
//             _id: 'u101',
//           },
//           task: {
//             id: 'c101',
//             title: 'Design Logo',
//           },
//         },
//       ],
//       labels: [
//         {
//           class: 'light-red-opacity',
//           title: '',
//           color: 'light-red',
//           id: 'sCCYjO',
//         },
//         {
//           id: 'l101',
//           title: 'Done',
//           color: '#61bd4f',
//         },
//         {
//           id: 'l102',
//           title: 'Progress',
//           color: '#61bd33',
//         },
//       ],
//     }

//     const board2 = {
//       _id: 'b102',
//       title: 'Design project',
//       style: {
//         background:
//           'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//         backgroundColor: '#eef3ef',
//         thumbnail:
//           'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//       },
//       isStarred: false,
//       members: [
//         {
//           _id: 'u101',
//           fullname: 'Tal Tarablus',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
//         },
//         {
//           _id: 'u102',
//           fullname: 'John Smith',
//           imgUrl:
//             'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
//         },
//       ],
//       groups: [
//         {
//           title: 'Group 1',
//           id: 'g101',
//           archivedAt: 1589983468418,
//           tasks: [
//             {
//               title: 'Design logo',
//               id: 'c101',
//               title: 'Replace logo',
//             },
//             {
//               title: 'Create mockups',
//               id: 'c102',
//               style: {},
//               labels: ['l101', 'l102'],
//               description: 'This task is here to remind me to add samples',
//             },
//             {
//               title: 'Finalize design',
//               id: 'c103',
//               title: 'Complete task 1',
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 2',
//           id: 'g102',
//           tasks: [
//             {
//               title: 'Implement changes',
//               id: 'c104',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Review feedback',
//               id: 'c105',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               title: 'Refine design',
//               id: 'c106',
//               status: 'in-progress',
//               style: {},
//             },
//             {
//               id: 'c111',
//               title: 'Complete task 1',
//             },
//           ],
//           style: {},
//         },
//         {
//           title: 'Group 3',
//           id: 'g103',
//           tasks: [
//             {
//               title: 'Get client approval',
//               id: 'c107',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Prepare assets',
//               id: 'c108',
//               status: 'done',
//               style: {},
//             },
//             {
//               title: 'Deliver final files',
//               id: 'c109',
//               status: 'done',
//               style: {},
//             },
//           ],
//           style: {},
//         },
//       ],
//       activities: [
//         {
//           id: 'a101',
//           txt: 'Changed Color',
//           createdAt: 154514,
//           byMember: {
//             fullname: 'Abi Abambi',
//             username: 'Abi Abambi',
//             imgUrl: 'http://some-img',
//             _id: 'u101',
//           },
//           task: {
//             id: 'c101',
//             title: 'Design Logo',
//           },
//         },
//       ],
//       labels: [
//         {
//           class: 'light-red-opacity',
//           title: '',
//           color: 'light-red',
//           id: 'sCCYjO',
//         },
//         {
//           id: 'l101',
//           title: 'Done',
//           color: '#61bd4f',
//         },
//         {
//           id: 'l102',
//           title: 'Progress',
//           color: '#61bd33',
//         },
//       ],
//     }

//     await storageService.post(STORAGE_KEY, board1)
//     await storageService.post(STORAGE_KEY, board2)
//     await storageService.post(STORAGE_KEY, board3)
//     // storageService.post(STORAGE_KEY, board);
//   }
// }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
