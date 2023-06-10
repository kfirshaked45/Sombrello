import { Link, NavLink, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import routes from '../../routes'
import sombrelloLogo from '../../assets/img/sombrello-logo.jpg'
import { login, logout, signup } from '../../store/user.actions.js'
import { LoginSignup } from '../login-signup.jsx'
import { useSelector } from 'react-redux'
// import { ActionModal } from './action-modal';
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Fragment } from 'react'

export const AppHeader = ({ boardId }) => {
  const [headerStatus, setHeaderStatus] = useState()
  const [actionModal, setActionModal] = useState(null)
  const boards = useSelector((state) => state.boardModule.boards)
  const board = boards.find((b) => b._id === boardId)
  const user = useSelector((state) => state.userModule.user)

  const location = useLocation()
  const userImgRef = useRef()
  const boardsRef = useRef()
  const starredRef = useRef()

  useEffect(() => {
    let status
    if (location.pathname === '/') status = 'home'
    else if (
      location.pathname === '/user/login' ||
      location.pathname === '/user/signup'
    )
      status = 'auth'
    else if (location.pathname.includes('/board')) status = 'board'
    setHeaderStatus(status)
  }, [location.pathname])

  const getHeaderStyleClass = () => {
    let styleClass = ''

    switch (headerStatus) {
      case 'home':
        styleClass = 'home-header fixed'
        break

      case 'auth':
        styleClass = 'login-header'
        break

      default:
        break
    }
    return styleClass
  }

  const getStyleColor = () => {
    if (headerStatus === 'board') {
      const backgroundColor = board?.style?.backgroundColor
      return backgroundColor ? { backgroundColor } : {}
    }
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal?.type === type) return setActionModal(null)
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
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

  const styleClass = getHeaderStyleClass()
  const isUserImgDisplayed = user?.fullname !== 'Guest'
  const fontColor = getFontColor()

  return (
    <header className={`app-header ${styleClass}`} style={getStyleColor()}>
      <section className="left">
        <Link to="/">
          <div
            className={`shared-logo ${fontColor === 'dark' ? 'dark' : 'light'}`}
          >
            <img src={sombrelloLogo} alt="" />
            <h1>Sombrello</h1>
          </div>
        </Link>

        <Link to="/workspace">
          <div
            className={`shared-logo ${fontColor === 'dark' ? 'dark' : 'light'}`}
          >
            <p>Workspace</p>
          </div>
        </Link>

        {headerStatus === 'board' && (
          <Fragment>
            <div
              className={`boards ${fontColor === 'dark' ? 'dark' : 'light'}`}
              onClick={() => onOpenActionModal('Boards', boardsRef)}
              ref={boardsRef}
            ></div>
            <div
              className={`boards ${fontColor}`}
              onClick={() => onOpenActionModal('Starred boards', starredRef)}
              ref={starredRef}
            ></div>
          </Fragment>
        )}
      </section>
      <nav className={`home-nav ${styleClass ? '' : 'none'}`}>
        <Link className="login" to={'/user/login'}>
          Log in
        </Link>
        <Link className="signup" to={'/user/signup'}>
          Get Sombrello for free
        </Link>
      </nav>
      {!styleClass && user && isUserImgDisplayed && (
        <div className="user-img">
          <img
            referrerPolicy="no-referrer"
            src={user.imgUrl}
            alt=""
            ref={userImgRef}
            onClick={() => {
              onOpenActionModal('Account', userImgRef)
            }}
          />
        </div>
      )}
    </header>
  )
}
