import { TaskPreview } from './task-preview';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';
import { Link } from 'react-router-dom';

export function TaskList({ board, group }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // const handleDragEnd = (result) => {
  //   console.log(result, 'DESTINATIONDOFIHNSDFGOINHI');
  //   if (!result.destination) {
  //     return; // Item was dropped outside a valid droppable area
  //   }
  //   const sourceGroup = group;
  //   const destinationGroup = board.groups.find((g) => g.id === result.destination.droppableId);
  //   console.log(sourceGroup, destinationGroup, 'GROUPS');
  //   const updatedGroup = { ...group };
  //   const updatedTasks = updatedGroup.tasks;
  //   const [removed] = updatedTasks.splice(result.source.index, 1);
  //   updatedTasks.splice(result.destination.index, 0, removed);
  //   updatedGroup.tasks = updatedTasks;

  //   const updatedGroups = board.groups.map((g) => {
  //     if (g.id === group.id) {
  //       return updatedGroup;
  //     }
  //     return g;
  //   });

  //   const updatedBoard = {
  //     ...board,
  //     groups: updatedGroups,
  //   };

  //   dispatch(updateBoard(updatedBoard));
  // };

  return (
    <Droppable droppableId={`${group.id}`} type="TASK">
      {(provided) => (
        <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
          {group.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <Link to={`${group.id}/${task.id}`}>
                  <li
                    className="task-list-item"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TaskPreview groupId={group.id} task={task} />
                    {hoveredIndex === index && <FontAwesomeIcon icon={faPen} />}
                  </li>
                </Link>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
