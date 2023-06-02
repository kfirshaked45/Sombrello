import { showErrorMsg } from '../services/event-bus.service';
import { BoardHeader } from '../cmps/board/board-header';
import { GroupList } from '../cmps/groups/group-list';
import { boardService } from '../services/board.service.local';
import { loadBoards } from '../store/board.actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom'
import { Link, useNavigate, useParams } from 'react-router-dom';

export function BoardDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const boards = useSelector((state) => state.boardModule.boards);
  const board = boards.find((b) => b._id === boardId);

  useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);

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
