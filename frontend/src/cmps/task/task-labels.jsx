import React from 'react';

export function TaskLabels({ labels }) {
  return (
    <div className="task-labels">
      {labels?.map((label) => (
        <div key={label.id} className={`label ${label.id}`} style={{ backgroundColor: label.color }}>
          {label.title}
        </div>
      ))}
    </div>
  );
}
