import { useSelector } from 'react-redux';
import { BoardPreview } from '../cmps/board/board-preview';
import { useEffect, useState } from 'react';
import { boardService } from '../services/board.service.local';
import { loadBoards } from '../store/board.actions';
import { Link } from 'react-router-dom';
export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  // const [board, setBoard] = useState();
  console.log(boards);
  useEffect(() => {
    boardService.createDemoBoard();
    loadBoards();
  }, []);
  //     async function onRemoveBoard(boardId) {
  //         try {
  //             await removeBoard(boardId)
  //             showSuccessMsg('Board removed')
  //         } catch (err) {
  //             showErrorMsg('Cannot remove board')
  //         }
  //     }

  //     async function onAddBoard() {
  //         const board = boardService.getEmptyBoard()
  //         board.vendor = prompt('Vendor?')
  //         try {
  //             const savedBoard = await addBoard(board)
  //             showSuccessMsg(`Board added (id: ${savedBoard._id})`)
  //         } catch (err) {
  //             showErrorMsg('Cannot add board')
  //         }
  //     }

  //     async function onUpdateBoard(board) {
  //         const price = +prompt('New price?')
  //         const boardToSave = { ...board, price }
  //         try {
  //             const savedBoard = await updateBoard(boardToSave)
  //             showSuccessMsg(`Board updated, new price: ${savedBoard.price}`)
  //         } catch (err) {
  //             showErrorMsg('Cannot update board')
  //         }
  //     }
  // GET BOARDS use selector
  // For each board  - render BoardPreview which contains BoardDetails
  return (
    <div className="board-index">
      <p>HEADER</p>
      <div>BOARD LIST</div>
      {/* <Link path=""></Link> */}

      <ul className="boards-list">
        {boards.map((board) => (
          <li className="board-preview" key={board._id}>
            <Link to={board._id}>
              <BoardPreview board={board} />
            </Link>
          </li>
        ))}
      </ul>

      <li>Board Previews</li>
    </div>
  );
}
