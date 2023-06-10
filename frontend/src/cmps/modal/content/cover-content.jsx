import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../store/board.actions';

export function CoverContent({ board, task, group }) {
  const colors = ['#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2'];
  const dispatch = useDispatch();
  function changeCoverColor(color) {
    const updatedTask = { ...task, style: { ...task.style, coverColor: color } };
    const updatedBoard = { ...board };

    // Update the task in the updated board data with the new coverColor
    updatedBoard.groups.forEach((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return updatedTask;
          }
          return t;
        });
        g.tasks = updatedTasks;
      }
    });

    dispatch(updateBoard(updatedBoard));
  }
  return (
    <div className=" pop-over-content">
      Colors
      <div className="cover-colors-container">
        {colors.map((color) => (
          <button className="cover-color-div" style={{ backgroundColor: color }} onClick={() => changeCoverColor(color)}></button>
        ))}
      </div>
    </div>
  );
}
