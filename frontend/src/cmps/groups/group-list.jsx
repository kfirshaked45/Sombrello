import { updateBoard, loadBoards } from '../../store/board.actions';
import { GroupPreview } from './group-preview';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function GroupList({ board }) {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Item was dropped outside a valid droppable area
    }

    const { source, destination } = result;

    // Reorder the groups based on the drag and drop result
    const updatedGroups = Array.from(board.groups);
    const [removed] = updatedGroups.splice(source.index, 1);
    updatedGroups.splice(destination.index, 0, removed);

    // Create an updated board object with the reordered groups
    const updatedBoard = {
      ...board,
      groups: updatedGroups,
    };

    // Dispatch the UpdateBoard action to update the state in Redux
    dispatch(updateBoard(updatedBoard));
  };

  return (
    <div className="board-group-previews">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="group-list">
          {(provided) => (
            <ul className="group-list" {...provided.droppableProps} ref={provided.innerRef}>
              {board.groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <li className="group-list-item" {...provided.draggableProps} ref={provided.innerRef}>
                      <GroupPreview board={board} group={group} provided={provided} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
