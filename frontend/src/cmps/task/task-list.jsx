import { TaskPreview } from './task-preview';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export function TaskList({ boardId, groupId, tasks }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li className="task-list-item" key={task.id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
          <TaskPreview boardId={boardId} groupId={groupId} task={task} />
          {hoveredIndex === index && <FontAwesomeIcon icon={faPen} />}
        </li>
      ))}
    </ul>
  );
}
