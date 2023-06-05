import { useEffect, useState, Fragment, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { boardService } from '../../services/board.service.local';
import { TaskCover } from './task-cover';
import { TaskAttachments } from './task-attachments';
import { TaskSidebar } from './task-sidebar';
import { MemberModal } from '../modal/member-modal';

import { IoIosCard } from 'react-icons/io';
import { TfiAlignLeft } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { BsPlus } from 'react-icons/bs';
import { RxActivityLog } from 'react-icons/rx';
import { TaskLabels } from './task-labels';
import { TaskDescription } from './task-description';
import { loadBoards } from '../../store/board.actions';
import { BoardDetails } from '../../pages/board-details';
import { TaskDates } from './task-dates';

export function TaskDetails() {
  const { boardId, groupId, taskId } = useParams();
  const boards = useSelector((state) => state.boardModule.boards);
  const board = boards.find((b) => b._id === boardId);
  const group = board.groups.find((g) => g.id === groupId);
  const task = group.tasks.find((t) => t.id === taskId);

  const members = task?.members ?? null;
  const screenRef = useRef();

  const [selectedMember, setSelectedMember] = useState(null);

  const onGoBack = (ev) => {
    Navigate(-1);
  };

  return (
    <Fragment>
      <BoardDetails />
      <section className="screen">
        <div onClick={onGoBack} className="backdrop"></div>
        <section className="task-details">
          <section ref={screenRef} className="task-details" onClick={(ev) => ev.stopPropagation()}>
            <TaskCover className="cover-component" />
            <section className="task-props">
              {members && (
                <div className="members-wrapper">
                  <h5>Members</h5>
                  <div className="members">
                    <div className="members-img">
                      {members.map((member) => (
                        <div key={member._id}>
                          <img src={member.imgUrl} alt="Member" />
                        </div>
                      ))}
                    </div>
                    {selectedMember && <MemberModal member={selectedMember} />}
                    <button className="add-member">
                      <BsPlus />
                    </button>
                  </div>
                </div>
              )}

              <div className="labels-wrapper">
                <h5>Labels</h5>
                <div className="labels">
                  <TaskLabels labels={task?.labels} />
                  <button className="add-label">
                    <BsPlus />
                  </button>
                </div>
              </div>
              <div className="dates-wrapper">
                <div className="dates">
                  <TaskDates dates={task?.dates} />
                </div>
              </div>
            </section>

            <div className="task-grid">
              <div className="task-column">
                <header className="div-task-title">
                  <IoIosCard className="icon-title" />
                  {task ? <h2 className="task title">{task.title}</h2> : 'Loading'}
                  <div className="group-id">
                    <p>in list: {group.title}</p>
                  </div>
                </header>

                <TaskDescription description={task?.description} />

                <div className="attachments-section">
                  <TaskAttachments />
                </div>
                <div className="attachments-section">
                  <TaskAttachments attachments={task.attachments} />
                </div>

                <div className="div-activity">
                  <RxActivityLog />
                  <h2>Activity</h2>
                  <input className="input-task-activity" placeholder="Write a comment..." />
                </div>
              </div>
              <div className="task-sidebar">
                <TaskSidebar board={board} group={group} task={task} />
              </div>
            </div>
          </section>
        </section>
      </section>
    </Fragment>
  );
}
