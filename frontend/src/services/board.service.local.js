import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';

const STORAGE_KEY = 'board';

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
  createDemoBoard,
};
window.cs = boardService;

async function query(filterBy = { txt: '', price: 0 }) {
  var boards = await storageService.query(STORAGE_KEY);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i');
    boards = boards.filter((board) => regex.test(board.vendor) || regex.test(board.description));
  }
  if (filterBy.price) {
    boards = boards.filter((board) => board.price <= filterBy.price);
  }
  return boards;
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId);
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  var savedBoard;
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
  } else {
    // Later, owner is set by the backend
    board.owner = userService.getLoggedinUser();
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId);
  if (!board.msgs) board.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  board.msgs.push(msg);
  await storageService.put(STORAGE_KEY, board);

  return msg;
}

function getEmptyBoard() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  };
}

async function createDemoBoard() {
  var boards = await storageService.query(STORAGE_KEY);

  if (!boards || boards.length === 0) {
    const board = {
      _id: 'b101',
      title: 'Robot dev proj',
      isStarred: false,
      archivedAt: 1589983468418,
      createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      style: {
        backgroundImage: '',
      },
      labels: [
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
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: 'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl: 'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
        {
          _id: 'u103',
          fullname: 'Emma Johnson',
          imgUrl: 'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
        },
      ],
      groups: [
        {
          id: 'g101',
          title: 'Group 1',
          archivedAt: 1589983468418,
          tasks: [
            {
              id: 'c101',
              title: 'Replace logo',
              labels: ['l101', 'l102'],
              description: 'This task is here to remind me to replace the app logo'
            },
            {
              id: 'c102',
              title: 'Add Samples',
              labels: ['l101', 'l102'],
              description: 'This task is here to remind me to add samples'
            },
            {
              id: 'c103',
              title: 'Complete task 1',
              labels: ['l101'],
              description: 'This task is here to remind me to complete task 1'
            },
            {
              id: 'c110',
              title: 'Complete task 1',
              labels: ['l102'],
              description: 'This task is here to remind me to complete task 1'
            },

            {
              id: 'c112',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          id: 'g102',
          title: 'Group 2',
          tasks: [
            {
              id: 'c104',
              title: 'Complete task 2',
              status: 'in-progress',
            },
            {
              id: 'c105',
              title: 'Complete task 3',
              status: 'in-progress',
            },
            {
              id: 'c106',
              title: 'Complete task 4',
              status: 'in-progress',
            },
            {
              id: 'c111',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          id: 'g103',
          title: 'Group 3',
          tasks: [
            {
              id: 'c107',
              title: 'Complete task 5',
              status: 'done',
            },
            {
              id: 'c108',
              title: 'Complete task 6',
              status: 'done',
            },
            {
              id: 'c109',
              title: 'Complete task 7',
              status: 'done',
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
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
    };

    await storageService.post(STORAGE_KEY, board);
    // storageService.post(STORAGE_KEY, board);
  }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
