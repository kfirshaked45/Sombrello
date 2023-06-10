import { boardService } from '../services/board.service.js';
import { userService } from '../services/user.service.js';
import { store } from './store.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD } from './board.reducer.js';

// Action Creators:
export function getActionRemoveBoard(boardId) {
  return {
    type: REMOVE_BOARD,
    boardId,
  };
}

export function setBoards(boards) {
  return {
    type: SET_BOARDS,
    boards,
  };
}

export function getActionAddBoard(board) {
  return {
    type: ADD_BOARD,
    board,
  };
}
export function getActionUpdateBoard(board) {
  return {
    type: UPDATE_BOARD,
    board,
  };
}

export function loadBoards() {
  return async (dispatch) => {
    try {
      const boards = await boardService.query();
      console.log('Boards from DB:', boards);
      dispatch(setBoards(boards));
    } catch (err) {
      console.log('Cannot load boards', err);
      throw err;
    }
  };
}

export function removeBoard(boardId) {
  return async (dispatch) => {
    try {
      await boardService.remove(boardId);
      store.dispatch(getActionRemoveBoard(boardId));

      dispatch({ type: 'BOARD_REMOVED', payload: boardId });
    } catch (err) {
      console.log('Error removing board:', err);
    }
  };
}

export async function addBoard(board) {
  try {
    const savedBoard = await boardService.save(board);
    console.log('Added Board', savedBoard);
    store.dispatch(getActionAddBoard(savedBoard));
    return savedBoard;
  } catch (err) {
    console.log('Cannot add board', err);
    throw err;
  }
}

export async function updateBoard(board) {
  try {
    const savedBoard = await boardService.save(board);
    console.log('Updated Board:', savedBoard);
    store.dispatch(getActionUpdateBoard(savedBoard));
    return savedBoard;
  } catch (err) {
    console.log('Cannot save board', err);
    throw err;
  }
}

// export function updateBoard(board) {
//   return boardService
//     .save(board)
//     .then((savedBoard) => {
//       console.log('Updated Board:', savedBoard);
//       store.dispatch(getActionUpdateBoard(savedBoard));
//       return savedBoard;
//     })
//     .catch((err) => {
//       console.log('Cannot save board', err);
//       throw err;
//     });
// }

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveBoardOptimistic(boardId) {
//   store.dispatch({
//     type: REMOVE_BOARD,
//     boardId,
//   });
//   showSuccessMsg('Board removed');

//   boardService
//     .remove(boardId)
//     .then(() => {
//       console.log('Server Reported - Deleted Succesfully');
//     })
//     .catch((err) => {
//       showErrorMsg('Cannot remove board');
//       console.log('Cannot load boards', err);
//       store.dispatch({
//         type: UNDO_REMOVE_BOARD,
//       });
//     });
// }
export async function onRemoveBoardOptimistic(boardId) {
  try {
    store.dispatch({
      type: REMOVE_BOARD,
      boardId,
    });
    showSuccessMsg('Board removed');

    await boardService.remove(boardId);
    console.log('Server Reported - Deleted Successfully');
  } catch (err) {
    showErrorMsg('Cannot remove board');
    console.log('Cannot load boards', err);
    store.dispatch({
      type: UNDO_REMOVE_BOARD,
    });
  }
}
