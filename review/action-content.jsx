const actionComponents = {
  Members: MemberContent,
  Labels: LabelsContent,
  Checklist: ChecklistContent,
  Dates: DateContent,
  Attachments: AttachmentsContent,
  Group: GroupsContent,
  Cover: CoverContent
}

export function ActionContent({ action, board, task, group,  onClose,  modalRef }) {
  const dispatch = useDispatch()
  const ContentComponent = actionComponents[action] || null;

  return ContentComponent ? (
    <ContentComponent
      board={board}
      task={task}
      group={group}
      dispatch={dispatch}
      onClose={onClose}
      modalRef={modalRef}
    />
  ) : null
}
