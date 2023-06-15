export function ActionModal({ action, onClose, board, task, group, triggerRef }) {
  const [modalTopPos, setModalTopPos] = useState(null)
  const modalRef = useRef(null)

  useLayoutEffect(() => {
    if (triggerRef.current && triggerRef) {
      const { top, left, marginLeft } = utilService.getModalPosition(action, triggerRef)
      setModalTopPos({ top, left, marginLeft })
    }
  }, [action, triggerRef])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [onClose])

  return (
    <div className="action-modal" style={modalTopPos} ref={modalRef} onClick={(ev) => ev.stopPropagation()}>
      <div className="action-header">
        <div>{action}</div>
        <XIcon onClick={onClose} className="action-modal-x" />
      </div>
      <ActionContent
        action={action}
        board={board}
        task={task}
        group={group}
        onClose={onClose}
        modalRef={modalRef}
      />
    </div>
  )
}
