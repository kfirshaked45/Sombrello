import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../../services/util.service';
import { updateBoard } from '../../store/board.actions';

export function TaskAdd({ board, group }) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const [task, setTask] = useState('');

  function handleChange(ev) {
    setTask(ev.target.value);
  }

  function handleSubmit() {
    if (!task) return;
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedGroup = {
          ...g,
          tasks: [...g.tasks, { id: utilService.makeId(), title: task }],
        };
        return updatedGroup;
      }
      return g;
    });
    const updatedBoard = { ...board, groups: updatedGroups };
    setIsEditable(false);
    setTask('');
    dispatch(updateBoard(updatedBoard));
  }
  function handleCancel() {
    setIsEditable(false);
    setTask('');
  }
  return (
    <div>
      {isEditable && (
        <div className="card-composer">
          <div className="card-composer-textarea-container">
            <textarea
              onChange={handleChange}
              value={task}
              placeholder="Enter a title for this card..."
              className="card-composer-textarea"
            ></textarea>
          </div>
          <div className="card-composer-buttons">
            <button onClick={handleSubmit} className="card-composer-add-btn">
              Add Card
            </button>
            <button onClick={handleCancel}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        </div>
      )}
      {!isEditable && (
        <div style={{ display: 'flex' }}>
          <button
            className="open-card-composer-btn"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="open-card-plus" />
            Add a card
          </button>
        </div>
      )}
    </div>
  );
}
