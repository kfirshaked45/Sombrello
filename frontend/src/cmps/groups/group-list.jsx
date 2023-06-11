import { updateBoard } from '../../store/board.actions';
import { GroupPreview } from './group-preview';
import { useEffect } from 'react';
import { ReactComponent as Plus } from '../../assets/img/task/plus-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { utilService } from '../../services/util.service';

export function GroupList({ board, loggedInUser }) {
  const dispatch = useDispatch();

  function handleDragEnd(result) {
    if (!result.destination) {
      return; // Item was dropped outside a valid droppable area
    }
    if (result.type === 'GROUP') {
      handleDragGroup(result);
    }
    if (result.type === 'TASK') {
      handleDragTask(result);
    }
  }

  function createActivity(text) {
    return {
      id: utilService.makeId(),
      text,
      createdAt: Date.now(),
      byMember: loggedInUser,
    };
  }

  function handleDragTask(result) {
    const sourceGroupId = result.source.droppableId;
    const destinationGroupId = result.destination.droppableId;
    const sourceGroup = { ...toGroup(sourceGroupId) };

    if (sourceGroupId !== destinationGroupId) {
      const destinationGroup = { ...toGroup(destinationGroupId) };

      handleMoveDifferentTaskList(sourceGroup, destinationGroup, result.source.index, result.destination.index);
      return;
    }
    handleMoveSameTaskList(sourceGroup, result.source.index, result.destination.index);
  }

  const handleDragGroup = (result) => {
    const { source, destination } = result;

    // Check if board.groups is an array
    if (!Array.isArray(board.groups)) {
      return; // Handle the error or return early
    }

    // Reorder the groups based on the drag and drop result
    const updatedGroups = [...board.groups];
    utilService.reorder(updatedGroups, source.index, destination.index);

    // Create an updated board object with the reordered groups
    const activity = createActivity(`Dragged group ${source.droppableId} to position ${destination.index}`);
    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    };

    // Dispatch the UpdateBoard action to update the state in Redux
    dispatch(updateBoard(updatedBoard));
  };

  const toGroup = (groupId) => {
    const group = board.groups.find((group) => group.id === groupId);
    return group;
  };

  function handleMoveSameTaskList(group, sourceIndex, destinationIndex) {
    utilService.reorder(group.tasks, sourceIndex, destinationIndex);
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        return group;
      }
      return g;
    });

    const activity = createActivity(`Moved task within group ${group.id} from position ${sourceIndex} to ${destinationIndex}`);

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    };

    dispatch(updateBoard(updatedBoard));
  }

  function handleMoveDifferentTaskList(sourceGroup, destinationGroup, sourceIndex, destinationIndex) {
    const [removed] = sourceGroup.tasks.splice(sourceIndex, 1);
    destinationGroup.tasks.splice(destinationIndex, 0, removed);

    const activity = createActivity(
      `Moved task from group ${sourceGroup.id} to group ${destinationGroup.id} at position ${destinationIndex}`
    );

    const updatedGroups = board.groups.map((g) => {
      if (g.id === sourceGroup.id) {
        return sourceGroup;
      }
      if (g.id === destinationGroup.id) {
        return destinationGroup;
      }
      return g;
    });

    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    };

    dispatch(updateBoard(updatedBoard));
  }

  function addGroup() {
    const newGroup = {
      id: utilService.makeId(),
      title: 'New List',
      tasks: [],
      style: {},
    };

    const activity = createActivity('Added a new group');

    const updatedGroups = board.groups ? [...board.groups, newGroup] : [newGroup];
    const updatedBoard = {
      ...board,
      groups: updatedGroups,
      activities: [...board.activities, activity],
    };

    dispatch(updateBoard(updatedBoard));
  }

  return (
    <div className="board-group-previews">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="group-list" direction="horizontal" type="GROUP">
          {(provided) => (
            <ul className="group-list-container" {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(board.groups) &&
                board.groups.map((group, index) => (
                  <Draggable key={group.id} draggableId={group.id} index={index}>
                    {(provided) => (
                      <li className="group-list-item" {...provided.draggableProps} ref={provided.innerRef}>
                        <GroupPreview board={board} group={group} provided={provided} createActivity={createActivity} />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button className="add-list-btn" onClick={addGroup}>
        <span className="add-list-btn-span">
          <Plus /> Add another list
        </span>
      </button>
    </div>
  );
}
