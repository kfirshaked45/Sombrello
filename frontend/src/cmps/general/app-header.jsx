import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../../routes'
import { useEffect, useRef, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { login, logout, signup } from '../../store/user.actions.js'
import { LoginSignup } from '../login-signup.jsx'
import Sombrellologo from '../../assets/img/sombrello-logo.jpg'

export function AppHeader() {
  const [headerStatus, setHeaderStatus] = useState()

  const user = useSelector((storeState) => storeState.userModule.user)

  const location = useLocation()

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
    let styleClass

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

  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className="app-header">
      <nav>
        {routes.map((route) => (
          <NavLink key={route.path} to={route.path}>
            {route.label}
          </NavLink>
        ))}

        {user && (
          <span className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>Logout</button>
          </span>
        )}
        {!user && (
          <section className="user-info">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} />
          </section>
        )}
      </nav>
      <div className="main-logo">
        <div className="main-img-container">
          <img className="main-img" src={Sombrellologo} alt="" />
        </div>
        <h1>Sombrello</h1>
      </div>
    </header>
  )
}
