import React from 'react';

export function TaskLabels({ labels, board }) {
  // Find the corresponding labels from board.labels based on the label IDs in the current task
  const taskLabels = labels ? labels.map((label) => board.labels.find((l) => l.id === label.id)) : [];

  return (
    <div className="task-labels">
      {taskLabels.map((label) => (
        <div key={label.id} className={`label ${label.id}`} style={{ backgroundColor: label.color }}>
          {label.title}
        </div>
      ))}
    </div>
  );
}
