import { httpService } from './http.service.js';
import { utilService } from './util.service.js';

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  addBoardMsg,
};
window.cs = boardService;

async function query(filterBy = { txt: '' }) {
  return httpService.get('board', filterBy);
}
function getById(boardId) {
  return httpService.get(`board/${boardId}`);
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`);
}
async function save(board) {
  var savedBoard;
  if (board._id) {
    savedBoard = await httpService.put(`board/${board._id}`, board);
  } else {
    savedBoard = await httpService.post('board', board);
  }
  return savedBoard;
}

async function addBoardMsg(boardId, txt) {
  const savedMsg = await httpService.post(`board/${boardId}/msg`, { txt });
  return savedMsg;
}

function getEmptyBoard() {
  return {};
}
