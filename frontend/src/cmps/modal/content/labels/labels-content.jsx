import { updateBoard } from '../../../../store/board.actions';
import { ReactComponent as PenIcon } from '../../../../assets/img/board/pen-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { ActionModal } from '../../action-modal';

export function LabelsContent({ board, group, task, dispatch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState();
  const [labelId, setLabelId] = useState();
  const actionButtonRef = useRef();
  console.log(board.labels);

  function addLabel(label) {
    const updatedLabels = [...(task.labels || [])];

    const alreadyLabeledIndex = updatedLabels.findIndex((l) => l.id === label.id);

    if (alreadyLabeledIndex !== -1) {
      updatedLabels.splice(alreadyLabeledIndex, 1);
    } else {
      updatedLabels.push({ ...label });
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              labels: updatedLabels,
            };
          }
          return t;
        });

        return {
          ...g,
          tasks: updatedTasks,
        };
      }
      return g;
    });

    const updatedBoard = { ...board, groups: updatedGroups };
    dispatch(updateBoard(updatedBoard));
  }

  function handleClick(action, labelId) {
    setSelectedAction(action);
    setLabelId(labelId);
  }

  function isAlreadyLabeled(label, task) {
    return task.labels && task.labels.find((l) => l.id === label.id);
  }

  const filteredLabels = Array.isArray(board.labels)
    ? board.labels.filter((label) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const lowerCaseTitle = label.title ? label.title.toLowerCase() : '';
        const lowerCaseColor = label.color ? label.color.toLowerCase() : '';

        return lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseColor.includes(lowerCaseQuery);
      })
    : [];

  function closeActionModal() {
    setSelectedAction(null);
  }

  return (
    <div>
      <div className="labels-modal-container">
        <input
          type="text"
          placeholder="Search labels..."
          className="search-labels-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p>Labels</p>
        <div className="action-labels-container">
          {filteredLabels.map((label) => (
            <div className="action-label-container" key={label.id}>
              <div
                className="action-checkbox-input"
                onClick={() => {
                  addLabel(label);
                }}
              >
                {isAlreadyLabeled(label, task) && <FontAwesomeIcon icon={faCheck} className="label-check-icon" />}
              </div>
              <div
                style={{ backgroundColor: label.color }}
                className="label-color-container"
                onClick={() => {
                  addLabel(label);
                }}
              >
                {label.title}
              </div>
              <button className="pen-btn general-btn-styling" ref={actionButtonRef} onClick={() => handleClick('Edit Label', label.id)}>
                <PenIcon />
              </button>
            </div>
          ))}
        </div>
        <button className="create-label" onClick={() => handleClick('Create Label')}>
          Create a new label
        </button>
      </div>

      {selectedAction && (
        <ActionModal
          action={selectedAction}
          onClose={closeActionModal}
          board={board}
          task={task}
          group={group}
          triggerRef={actionButtonRef}
          labelId={labelId}
        />
      )}
    </div>
  );
}
