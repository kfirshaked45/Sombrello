import { updateBoard } from '../../../store/board.actions';
import { ReactComponent as PenIcon } from '../../../assets/img/board/pen-icon.svg';

export function LabelsContent({ board, group, task, dispatch }) {
  const addLabel = (label) => {
    if (!task.labels) {
      task.labels = [label];
    } else {
      const alreadyLabeledIndex = task.labels.findIndex((l) => l.id === label.id);
      if (alreadyLabeledIndex !== -1) {
        task.labels.splice(alreadyLabeledIndex, 1);
      } else {
        task.labels.push(label);
      }
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              labels: task.labels || [],
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

  return (
    <div className="labels-modal-container">
      <input type="text" placeholder="Search members" className="search-labels-input" />
      <p>Labels</p>
      <div className="action-labels-container">
        {board.labels.map((label) => (
          <div className="action-label-container">
            <input
              type="checkbox"
              onClick={() => {
                addLabel(label);
              }}
              className="action-checkbox-input"
            />
            <div key={label.id} style={{ backgroundColor: label.color }} className="label-color-container">
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
