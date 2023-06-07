import { useState, useEffect, useRef } from 'react'
import { ReactComponent as BoardIcon } from '../../assets/img/board/board-icon.svg'
import { useLocation } from 'react-router-dom'
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { ReactComponent as FilterIcon } from '../../assets/img/board/filter-icon.svg'
import { BsThreeDots } from 'react-icons/bs'
import { updateBoard } from '../../store/board.actions'
import { ReactComponent as EmptyStarIcon } from '../../assets/img/board/empty-star.svg'
import { ReactComponent as Member } from '../../assets/img/board/member-icon.svg'
import { ReactComponent as MembersIcon } from '../../assets/img/board/members-icon.svg'
import { ReactComponent as Pen } from '../../assets/img/board/pen-icon.svg'
import { ReactComponent as ShareIcon } from '../../assets/img/board/share-icon.svg'
import { MemberModal } from '../modal/member-modal'
import { BoardSideMenu } from './side-menu/board-side-menu'
import { utilService } from '../../services/util.service'

export function BoardHeader({ board, changeBackground }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const members = board.members
  const [selectedMember, setSelectedMember] = useState(null)
  const [sideMenuClass, setSideMenuClass] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState(board.title)
  const [headerStatus, setHeaderStatus] = useState()
  const textAreaInput = useRef(null)

  useEffect(() => {
    let status
    if (location.pathname.includes('/board')) status = 'board'
    setHeaderStatus(status)
  }, [location.pathname])

  const openModal = (member) => {
    setSelectedMember(member)
  }

  const renderSideMenu = () => {
    setSideMenuClass(sideMenuClass === '' ? 'open' : '')
  }

  function handleHeaderClick() {
    setIsEditingTitle(true)
    textAreaInput.current.focus()
    textAreaInput.current.select()
  }

  const toggleStarBoard = () => {
    board.isStarred = !board.isStarred
    dispatch(updateBoard(board))
  }

  function resizeInput() {
    const input = textAreaInput.current
    input.style.width = input.scrollWidth + 'px'
    input.style.height = input.scrollHeight + 'px'
  }

  const closeModal = () => {
    setSelectedMember(null)
  }

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value)
    resizeInput()
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)

    const updatedBoard = { ...board, title: editedTitle }
    dispatch(updateBoard(updatedBoard))
  }

  const getFontColor = () => {
    if (headerStatus === 'board') {
      const isDarkBackground = utilService.isBackgroundDark(
        board?.style?.backgroundColor
      )
      return isDarkBackground ? 'light' : 'dark'
    }
    return ''
  }

  function handleExitKeys(ev) {
    if (ev.key === 'Escape' || ev.key === 'Enter') {
      textAreaInput.current.blur()
    }
  }

  const fontColor = getFontColor()

  return (
    <div className="board-header">
      <div
        className={`board-header-left ${
          fontColor === 'dark' ? 'dark' : 'light'
        }`}
      >
        {isEditingTitle ? (
          <input
            className="board-title-input"
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
            onKeyDown={handleExitKeys}
            ref={textAreaInput}
          />
        ) : (
          <span
            className="group-list-header"
            onClick={handleHeaderClick}
            tabIndex={0}
          >
            {editedTitle}
          </span>
        )}
        <span className={`star-container`} onClick={toggleStarBoard}>
          {!board.isStarred && <TiStarOutline />}
          {board.isStarred && <TiStarFullOutline className="yellow-star" />}
        </span>
        <button>
          <MembersIcon />
        </button>
        <button>
          <BoardIcon /> Board
        </button>
      </div>
      <div
        className={`board-header-right-container ${
          fontColor === 'dark' ? 'dark' : 'light'
        }`}
      >
        <button className="filter-button">
          <FilterIcon />
          <span>Filter</span>
        </button>
        <div className="members-img">
          {members &&
            members.map((member) => (
              <div key={member._id} onClick={() => openModal(member)}>
                <img src={member.imgUrl} alt="Member" />
              </div>
            ))}
        </div>
        {selectedMember && (
          <MemberModal member={selectedMember} onClose={closeModal} />
        )}
        <button className="share-btn">
          <ShareIcon />
          Share
        </button>
        {!sideMenuClass && (
          <button onClick={renderSideMenu}>
            <BsThreeDots style={{ fontSize: '16px' }} />
          </button>
        )}
        <BoardSideMenu
          isOpen={sideMenuClass}
          onCloseSideMenu={renderSideMenu}
          changeBackground={changeBackground}
        />
      </div>
    </div>
  )
}
