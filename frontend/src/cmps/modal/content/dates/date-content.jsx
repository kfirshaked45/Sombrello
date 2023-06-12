import { updateBoard } from '../../../../store/board.actions';
import { DateRange } from 'react-date-range';
import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export function DateContent({ task, group, board, dispatch }) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleSave = () => {
    const updatedGroups = board.groups.map((currentGroup) => {
      if (currentGroup.id === group.id) {
        const updatedTasks = currentGroup.tasks.map((currentTask) => {
          if (currentTask.id === task.id) {
            return {
              ...currentTask,
              dates: {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
              },
            };
          }
          return currentTask;
        });

        return {
          ...currentGroup,
          tasks: updatedTasks,
        };
      }
      return currentGroup;
    });

    const updatedBoard = { ...board, groups: updatedGroups };
    dispatch(updateBoard(updatedBoard));
  };

  return (
    <div className="date-modal-container">
      <DateRange ranges={[dateRange]} onChange={handleSelect} className="date-range" />
      <div className="dates-btn-container">
        <button onClick={handleSave} className="save-date-btn general-btn-styling">
          Save
        </button>
        <button className="remove-date-btn general-btn-styling">Remove</button>
      </div>
    </div>
  );
}
