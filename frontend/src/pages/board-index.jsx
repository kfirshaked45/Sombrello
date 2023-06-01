import { useSelector } from 'react-redux';
import { BoardPreview } from '../cmps/board/board-preview';
import { useEffect, useState } from 'react';
import { boardService } from '../services/board.service.local';
import { loadBoards } from '../store/board.actions';
import { Link } from 'react-router-dom';
export function BoardIndex({ handleBoardClick }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards);
  useEffect(() => {
    boardService.createDemoBoard();
    loadBoards();
  }, []);

  return (
    <div className="board-index">
      {/* <Link path=""></Link> */}

      <ul className="boards-list">
        {boards.map((board) => (
          <li className="board-preview" key={board._id} onClick={() => handleBoardClick(board._id)}>
            <Link to={`/board/${board._id}`}>
              <BoardPreview board={board} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
