import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as XIcon } from '../../assets/img/board/x-icon.svg';
import { ReactComponent as PenIcon } from '../../assets/img/board/pen-icon.svg';
import { useDispatch } from 'react-redux';
import { Calendar, DateRange } from 'react-date-range';
import { utilService } from '../../services/util.service';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ImgUploader } from '../img-uploader';
import { updateBoard } from '../../store/board.actions';

function MemberContent({ board, task, group }) {
  const dispatch = useDispatch()
  const addMember = (member) => {
    if (!task.members) {
      task.members = [member]
    } else {
      const alreadyMemberIndex = task.members.findIndex(
        (m) => m._id === member._id
      )
      if (alreadyMemberIndex !== -1) {
        task.members.splice(alreadyMemberIndex, 1)
      } else {
        task.members.push(member)
      }
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              members: task.members || [],
            }
          }
          return t
        })

        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })
    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))
  }
  return (
    <div className="action-modal-content">
      <input
        type="text"
        placeholder="Search members"
        className="search-members-input"
      />
      <ul className="action-member-list">
        <h4>Board members</h4>
        {board.members.map((member) => (
          <li key={member._id}>
            <button
              className="action-member"
              onClick={() => {
                addMember(member)
              }}
            >
              <img src={`${member.imgUrl}`} alt="picture" />
              {member.fullname}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LabelsContent({ board, group, task }) {
  const dispatch = useDispatch()
  const addLabel = (label) => {
    if (!task.labels) {
      task.labels = [label]
    } else {
      const alreadyLabeledIndex = task.labels.findIndex(
        (l) => l.id === label.id
      )
      if (alreadyLabeledIndex !== -1) {
        task.labels.splice(alreadyLabeledIndex, 1)
      } else {
        task.labels.push(label)
      }
    }

    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              labels: task.labels || [],
            }
          }
          return t
        })

        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })

    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search members"
        className="search-labels-input"
      />
      <div>
        {board.labels.map((label) => (
          <div className="action-label-container">
            <input
              type="checkbox"
              onClick={() => {
                addLabel(label)
              }}
              className="action-checkbox-input"
            />
            <div
              key={label.id}
              style={{ backgroundColor: label.color }}
              className="label-color-container"
            >
              {label.title}
            </div>
            <PenIcon />
          </div>
        ))}
      </div>
      <button>Create a new label</button>
    </div>
  )
}

function DateContent({ task, group, board }) {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  })

  const dispatch = useDispatch()

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection)
  }

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
            }
          }
          return t
        })

        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })

    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))
  }

  return (
    <div>
      <DateRange
        ranges={[dateRange]}
        onChange={handleSelect}
        className="date-range"
      />
      <button onClick={handleSave}>Save</button>
      <button>Remove</button>
    </div>
  )
}

function AttachmentsContent({ task, group, board }) {
  const dispatch = useDispatch()
  const handleAddAttachment = (attachment) => {
    const updatedGroups = board.groups.map((g) => {
      if (g.id === group.id) {
        const updatedTasks = g.tasks.map((t) => {
          if (t.id === task.id) {
            return {
              ...t,
              attachments: [...(t.attachments || []), attachment],
            }
          }
          return t
        })

        return {
          ...g,
          tasks: updatedTasks,
        }
      }
      return g
    })

    const updatedBoard = { ...board, groups: updatedGroups }
    dispatch(updateBoard(updatedBoard))
  }

  return (
    <div>
      <ImgUploader onUploaded={handleAddAttachment} />
    </div>
  )
}

function GroupsContent({ group, board }) {
  const dispatch = useDispatch()

  async function deleteGroup() {
    const updatedGroups = board.groups.filter((g) => g.id !== group.id)
    const updatedBoard = { ...board, groups: updatedGroups }

    await dispatch(updateBoard(updatedBoard))
  }

  return (
    <div className="group-edit-modal">
      <div className="group-modal-top">
        <button>Copy list...</button>
        <button>Add card...</button>
        <button>Move list...</button>
        <button>Watch</button>
      </div>
      {/* <div> */}

      <button>Sort by</button>
      {/* </div> */}
      <button onClick={deleteGroup}>Delete this list</button>
      <button>Add card...</button>
    </div>
  )
}

function ActionContent({ action, board, task, group }) {
  let contentComponent = null

  if (action === 'Members') {
    contentComponent = <MemberContent board={board} task={task} group={group} />
  } else if (action === 'Labels') {
    contentComponent = <LabelsContent board={board} task={task} group={group} />
  } else if (action === 'Dates') {
    contentComponent = <DateContent board={board} task={task} group={group} />
  } else if (action === 'Attachments') {
    contentComponent = (
      <AttachmentsContent board={board} task={task} group={group} />
    )
  } else if (action === 'Group') {
    contentComponent = <GroupsContent board={board} task={task} group={group} />
  } else {
    contentComponent = <div>Invalid action.</div>
  }

  return contentComponent
}

export function ActionModal({ action, onClose, board, task, group, triggerRef }) {
  const modalRef = useRef(null);
  const modalTopPos = useRef({ top: '', left: '', marginLeft: '' });

  useEffect(() => {
    if (triggerRef.current && modalRef.current) {
      modalTopPos.current = utilService.getModalPosition(action, triggerRef);
      console.log(modalTopPos);
      modalRef.current.style.top = modalTopPos.current.top;
      modalRef.current.style.left = modalTopPos.current.left;
      modalRef.current.style.marginLeft = modalTopPos.current.marginLeft;
    }
  }, [action, triggerRef]);

  return (
    <div className="action-modal" ref={modalRef} style={{ top: modalTopPos.current.top }}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent action={action} board={board} task={task} group={group} />
    </div>
  )
}
