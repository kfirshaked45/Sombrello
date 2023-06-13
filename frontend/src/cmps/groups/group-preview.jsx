import { TaskList } from '../board/task-list';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../store/board.actions';
import { TaskAdd } from '../board/task-add-form';
import { ActionModal } from '../modal/action-modal.jsx';
import { TaskAddButton } from '../board/task-add-button';

export function GroupPreview({ board, group, provided, createActivity, isAllToggled, handleToggleAllTasks }) {
  const [title, setTitle] = useState(group.title);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [modalValue, setModalValue] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  function handleAddCard() {
    setIsEditable(true);
  }

  function handleCancel() {
    setIsEditable(false);
  }
  const textAreaInput = useRef(null);
  const dispatch = useDispatch();

  function handleChange(ev) {
    setTitle(ev.target.value);
  }

  function handleHeaderClick() {
    setIsTitleEditable(true);
    textAreaInput.current.focus();
    textAreaInput.current.select();
  }

  function handleExitKeys(ev) {
    if (ev.key === 'Escape' || ev.key === 'Enter') {
      textAreaInput.current.blur();
    }
  }

  function handleBlur() {
    setIsTitleEditable(false);
    if (title !== group.title) {
      const updatedGroup = { ...group, title: title };
      const updatedGroups = board.groups.map((g) => {
        if (g.id === group.id) {
          return updatedGroup;
        }
        return g;
      });

      const activity = createActivity(`Changed group title to ${title}`);
      const updatedBoard = { ...board, groups: updatedGroups, activities: [...board.activities, activity] };

      dispatch(updateBoard(updatedBoard));
      // Dispatch the CreateActivity action to add the activity to the board
    }
  }

  const openEditModal = (action, ev) => {
    ev.stopPropagation();
    setModalValue(action);
  };

  const closeEditModal = () => {
    setModalValue(null);
  };

  return (
    <div className="group-preview-container">
      <div className="group-list-header" onClick={handleHeaderClick} {...provided.dragHandleProps}>
        <textarea
          value={title}
          className="list-header-name"
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ pointerEvents: isTitleEditable ? 'auto' : 'none' }}
          ref={textAreaInput}
          onKeyDown={handleExitKeys}
        ></textarea>

        <button
          className="list-header-extras-menu"
          onClick={(ev) => {
            openEditModal('Group', ev);
          }}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
      <TaskList
        board={board}
        group={group}
        tasks={group.tasks}
        isEditable={isEditable}
        handleCancel={handleCancel}
        createActivity={createActivity}
        isAllToggled={isAllToggled}
        handleToggleAllTasks={handleToggleAllTasks}
      />
      {!isEditable && <TaskAddButton onAddCard={handleAddCard} />}
      {modalValue && <ActionModal action={modalValue} onClose={closeEditModal} board={board} group={group} triggerRef={textAreaInput} />}
    </div>
  );
}
