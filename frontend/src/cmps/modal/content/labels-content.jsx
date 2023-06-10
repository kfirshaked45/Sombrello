import { updateBoard } from '../../../store/board.actions';
import { ReactComponent as PenIcon } from '../../../assets/img/board/pen-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export function LabelsContent({ board, group, task, dispatch }) {
  
  const addLabel = (label) => {
    const updatedLabels = [...task.labels];
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
  };
  function isAlreadyLabeled(label, task) {
    return task.labels.find((l) => l.id === label.id);
  }

  return (
    <div className="labels-modal-container">
      <input type="text" placeholder="Search labels..." className="search-labels-input" />
      <p>Labels</p>
      <div className="action-labels-container">
        {board.labels &&
          board.labels.map((label) => (
            <div className="action-label-container">
              <div
                className="action-checkbox-input"
                onClick={() => {
                  addLabel(label);
                }}
              >
                {isAlreadyLabeled(label, task) && <FontAwesomeIcon icon={faCheck} className="label-check-icon" />}
              </div>
              {/* <input
                type="checkbox"
                onClick={() => {
                  addLabel(label);
                }}
                className="action-checkbox-input"
                checked={isAlreadyLabeled(label, task)}
              /> */}
              <div
                key={label.id}
                style={{ backgroundColor: label.color }}
                className="label-color-container"
                onClick={() => {
                  addLabel(label);
                }}
              >
                {label.title}
              </div>
              <button className="pen-btn general-btn-styling">
                <PenIcon />
              </button>
            </div>
          ))}
      </div>
      <button className="create-label">Create a new label</button>
    </div>
  );
}
