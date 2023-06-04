import React, { useState, useRef } from 'react';
import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { ReactComponent as PenIcon } from '../../assets/img/board/pen-icon.svg';
import { useDispatch } from 'react-redux';
import { Calendar, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ImgUploader } from '../img-uploader';
import { updateBoard } from '../../store/board.actions';

function MemberContent({ board, task, group }) {
  const dispatch = useDispatch();
  const addMember = (member) => {
    if (!task.members) {
      task.members = [member];
    } else {
      const alreadyMember = task.members.find((m) => m._id === member._id);
      if (alreadyMember) return;
      task.members.push(member);
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              members: task.members || [],
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
    <div className="action-modal-content">
      <input type="text" placeholder="Search members" className="search-members-input" />
      <ul className="action-member-list">
        <h4>Board members</h4>
        {board.members.map((member) => (
          <li key={member._id}>
            <button
              className="action-member"
              onClick={() => {
                addMember(member);
              }}
            >
              <img src={`${member.imgUrl}`} alt="picture" />
              {member.fullname}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LabelsContent({ board, group, task }) {
  const dispatch = useDispatch();
  const addLabel = (label) => {
    if (!task.labels) {
      task.labels = [label];
    } else {
      const alreadyLabeled = task.labels.find((l) => l.id === label.id);
      if (alreadyLabeled) return;
      task.labels.push(label);
    }

    const updatedGroups = board.groups.map((g) => {
      console.log(g.id, group.id);
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
    <div>
      <input type="text" placeholder="Search members" className="search-labels-input" />
      <div>
        {board.labels.map((label) => (
          <div className="action-label-container">
            <input
              type="checkbox"
              onClick={() => {
                addLabel(label);
              }}
            />
            <div key={label.id} style={{ backgroundColor: label.color }}>
              {label.title}
            </div>
            <PenIcon />
          </div>
        ))}
      </div>
      <button>Create a new label</button>
    </div>
  );
}

function DateContent({ task, group, board }) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const dispatch = useDispatch();

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleSave = () => {
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              dates: {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
              },
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
    <div>
      <DateRange ranges={[dateRange]} onChange={handleSelect} className="date-range" />
      <button onClick={handleSave}>Save</button>
      <button>Remove</button>
    </div>
  );
}

function AttachmentsContent({ task, group, board }) {
  const dispatch = useDispatch();
  const handleAddAttachment = (attachment) => {
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              attachments: [...(t.attachments || []), attachment],
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
    <div>
      <ImgUploader onUploaded={handleAddAttachment} />
    </div>
  );
}

function ActionContent({ action, board, task, group }) {
  let contentComponent = null;

  if (action === 'Members') {
    contentComponent = <MemberContent board={board} task={task} group={group} />;
  } else if (action === 'Labels') {
    contentComponent = <LabelsContent board={board} task={task} group={group} />;
  } else if (action === 'Dates') {
    contentComponent = <DateContent board={board} task={task} group={group} />;
  } else if (action === 'Attachments') {
    contentComponent = <AttachmentsContent board={board} task={task} group={group} />;
  } else {
    contentComponent = <div>Invalid action.</div>;
  }

  return contentComponent;
}

export function ActionModal({ action, onClose, board, task, group }) {
  return (
    <div className="action-modal">
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent action={action} board={board} task={task} group={group} />
    </div>
  );
}
