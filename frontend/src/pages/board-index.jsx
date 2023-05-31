import { useSelector } from 'react-redux';
import { BoardPreview } from '../cmps/board/board-preview';
import { useEffect, useState } from 'react';
import { boardService } from '../services/board.service.local';
import { loadBoards } from '../store/board.actions';

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  // const [board, setBoard] = useState();
  console.log(boards);
  useEffect(() => {
    boardService.createDemoBoard();
    loadBoards();
  }, []);
  // GET BOARDS use selector
  // For each board  - render BoardPreview which contains BoardDetails
  return (
    <div>
      <p>HEADER</p>
      <div>BOARD LIST</div>
      {/* <Link path=""></Link> */}
      <BoardPreview />
      <li>Board Previews</li>
    </div>
  );
}
