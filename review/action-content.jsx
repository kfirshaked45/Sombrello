const actionComponents = {
  Members: MemberContent,
  Labels: LabelsContent,
  Checklist: ChecklistContent,
  Dates: DateContent,
  Attachments: AttachmentsContent,
  Group: GroupsContent,
  Cover: CoverContent,
};

export function ActionContent({ action, board, task, group, attachmentId, onClose, labelId, modalRef }) {
  const dispatch = useDispatch();
  const ContentComponent = actionComponents[action] || null;
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  function createActivity(text) {
    return {
      id: utilService.makeId(),
      text,
      createdAt: Date.now(),
      byMember: loggedInUser,
    };
  }

  return ContentComponent ? (
    <ContentComponent
      board={board}
      task={task}
      group={group}
      dispatch={dispatch}
      attachmentId={attachmentId}
      onClose={onClose}
      labelId={labelId}
      modalRef={modalRef}
      createActivity={createActivity}
    />
  ) : null;
}
