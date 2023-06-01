import { updateBoard } from '../../store/board.actions';
import { GroupPreview } from './group-preview';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function GroupList({ board }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardModule.boards);
  const groups = boards.find((b) => b._id === board._id)?.groups || [];
  console.log(boards, groups, 'HERE');

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Item was dropped outside a valid droppable area
    }

    const { source, destination } = result;

    // Reorder the groups based on the drag and drop result
    const updatedGroups = Array.from(groups);
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
              {groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
                  {(provided) => (
                    <li className="group-list-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {/* <Link to={group._id}> */}
                      <GroupPreview boardId={board._id} group={group} />
                      {/* </Link> */}
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
