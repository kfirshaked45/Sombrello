import React from 'react';
import { MemberContent } from './member-content';
import { LabelsContent } from './labels-content';
import { DateContent } from './date-content';
import { AttachmentsContent } from './attachments-content';
import { GroupsContent } from './groups-content';
import { useDispatch } from 'react-redux';

export function ActionContent({ action, board, task, group }) {
  let contentComponent = null;
  const dispatch = useDispatch();

  if (action === 'Members') {
    contentComponent = <MemberContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else if (action === 'Labels') {
    contentComponent = <LabelsContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else if (action === 'Labels ') {
    contentComponent = <LabelsContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else if (action === 'Dates') {
    contentComponent = <DateContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else if (action === 'Attachments') {
    contentComponent = <AttachmentsContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else if (action === 'Group') {
    contentComponent = <GroupsContent board={board} task={task} group={group} dispatch={dispatch} />;
  } else {
    contentComponent = <div>Invalid action.</div>;
  }

  return contentComponent;
}
