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
  console.log(group);
  const dispatch = useDispatch();
  const addMember = (member) => {
    if (task && task.members) {
      // Check if task.members exists
      if (!task.members.includes(member)) {
        // Add member to the task.members array if it doesn't already exist
        task.members.push(member);
      }
    } else {
      // Create task.members array and add the member
      task.members = [member];
    }
    const updatedGroups = board.groups.map((g) => {
      console.log(g.id, group.id);
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              title: task.title,
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
    // Save the updated task to the board or perform any necessary actions
    // You can replace the console.log with the actual code to save the changes to the board

    console.log(board.members, task.members);
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

function LabelsContent({ board }) {
  return (
    <div>
      <input type="text" placeholder="Search members" className="search-labels-input" />
      <div>
        {board.labels.map((label) => (
          <div className="action-label-container">
            <input type="checkbox" />
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

function DateContent() {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };

  return (
    <div>
      <DateRange ranges={[dateRange]} onChange={handleSelect} className="date-range" />
      <button>Save</button>
      <button>Remove</button>
    </div>
  );
}

function AttachmentsContent() {
  return (
    <div>
      <ImgUploader />
    </div>
  );
}

function ActionContent({ action, board, task, group }) {
  let contentComponent = null;

  if (action === 'Members') {
    contentComponent = <MemberContent board={board} task={task} group={group} />;
  } else if (action === 'Labels') {
    contentComponent = <LabelsContent board={board} />;
  } else if (action === 'Dates') {
    contentComponent = <DateContent />;
  } else if (action === 'Attachments') {
    contentComponent = <AttachmentsContent />;
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
