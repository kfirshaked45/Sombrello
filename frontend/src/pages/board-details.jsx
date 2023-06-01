import { showErrorMsg } from '../services/event-bus.service';
import { BoardHeader } from '../cmps/board/board-header';
import { GroupList } from '../cmps/groups/group-list';
import { boardService } from '../services/board.service.local';
import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom'
import { Link, useNavigate, useParams } from 'react-router-dom';

export function BoardDetails() {
  // need top header for board
  const [board, setBoard] = useState(null);

  const { boardId } = useParams();

  const navigate = useNavigate();

  // map all the groups(notes) into the div
  useEffect(() => {
    loadBoard();
  }, []);
  async function loadBoard() {
    try {
      const board = await boardService.getById(boardId);
      setBoard(board);
    } catch (err) {
      console.log('Error loading board:', err);
      showErrorMsg('Cannot load board');
      navigate('/boards');
    }
  }
  if (!board) return <div>Loading...</div>;
  return (
    <div className="board-details">
      <BoardHeader board={board} />
      <div>
        <GroupList board={board} />
      </div>
    </div>
  );
}
