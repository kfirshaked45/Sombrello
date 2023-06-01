import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { boardService } from '../../services/board.service.local';

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams();
  const [board, setBoard] = useState();
  console.log(board);
  const location = useLocation();
  const { task } = location.state || {}; // Provide a default value for task if it is null
  useEffect(() => {
    loadBoard();
  }, []);
  async function loadBoard() {
    const savedBoard = await boardService.getById(boardId);
    setBoard(savedBoard);
  }

  return (
    <div>
      <h1>Task Details</h1>
      {task && (
        <div>
          <h1>{task.id}</h1>
          <p>Task ID: {taskId}</p>
          <p>Group ID: {groupId}</p>
          <p>Board ID: {boardId}</p>
        </div>
      )}
    </div>
  );
}
