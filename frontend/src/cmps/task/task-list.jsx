import { TaskPreview } from './task-preview';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';

export function TaskList({ board, groupId, tasks }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();


  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Item was dropped outside a valid droppable area
    }

    const updatedGroups = board.groups.map((group) => {
      if (group.id === groupId) {
        const updatedTasks = Array.from(group.tasks);
        const [removed] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, removed);
        return { ...group, tasks: updatedTasks };
      }
      return group;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    dispatch(updateBoard(updatedBoard));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <li
                    className="task-list-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TaskPreview groupId={groupId} task={task} />
                    {hoveredIndex === index && <FontAwesomeIcon icon={faPen} />}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
