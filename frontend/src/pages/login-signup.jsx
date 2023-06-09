import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { login, signup } from '../store/user.actions'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import leftHero from '../assets/img/left-loginsignup-hero.svg'
import rightHero from '../assets/img/right-loginsignup-hero.svg'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import sombrelloLogo from '../assets/img/sombrello-logo.jpg'

export function LoginSignup() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(params.status)
  const [wrongCredentialsDiv, setWrongCredentialsDiv] = useState()

  useEffect(() => {
    setStatus(params.status)
    setWrongCredentialsDiv('not-visible')
  }, [params.status])

  const handleGoogleAuth = (credentialResponse) => {
    var decoded = jwt_decode(credentialResponse.credential)
    const user = {
      fullname: decoded.name,
      username: decoded.email,
      imgUrl: decoded.picture,
    }

    if (status === 'signup') {
      ;(async () => {
        try {
          await dispatch(signup(user, true))
          navigate('/workspace')
        } catch (err) {
          console.log(err, 'cannot signup')
        }
      })()
    } else if (status === 'login') {
      ;(async () => {
        try {
          await dispatch(login(user, true))
          navigate('/workspace')
        } catch (err) {
          console.log(err, 'cannot login')
        }
      })()
    }
  }

  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(15, 'Must be 15 characters or less'),
      username: Yup.string().max(20, 'Must be 20 characters or less'),
      password: Yup.string()
        .required('No password provided.')
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    }),
    onSubmit: (values) => {
      if (status === 'signup') {
        ;(async () => {
          try {
            await dispatch(signup(values))
            navigate('/workspace')
          } catch (err) {
            console.log(err, 'cannot signup')
          }
        })()
      }
      if (status === 'login') {
        ;(async () => {
          try {
            await dispatch(login(values))
            navigate('/workspace')
          } catch (err) {
            console.log(err, 'cannot login')
            setWrongCredentialsDiv('')
          }
        })()
      }
    },
  })

  const handleFocus = (ev) => {
    ev.target.classList.add('focus')
  }

  const formTxt =
    status === 'login' ? 'Log in to Sombrello' : 'Sign up for your account'

  return (
    <section className="form-container">
      <div className="form-logo">
        <img src={sombrelloLogo} alt="" />
        <h1>Sombrello</h1>
      </div>
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <h5>{formTxt}</h5>
        <div className={`wrong-credentials ${wrongCredentialsDiv}`}>
          Incorrect email address and / or password.
        </div>
        {status === 'signup' && (
          <React.Fragment>
            <input
              id="fullname"
              name="fullname"
              type="text"
              onChange={formik.handleChange}
              onFocus={handleFocus}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              placeholder="Enter full name"
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <span className="error">{formik.errors.fullname}</span>
            ) : (
              <span>&nbsp;</span>
            )}
          </React.Fragment>
        )}
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder="Enter username"
        />
        {formik.touched.username && formik.errors.username ? (
          <span className="error">{formik.errors.username}</span>
        ) : (
          <span>&nbsp;</span>
        )}
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Enter password"
        />
        {formik.touched.password && formik.errors.password ? (
          <span className="error">{formik.errors.password}</span>
        ) : (
          <span>&nbsp;</span>
        )}
        <button type="submit">{formTxt}</button>
        <p className="or">OR</p>
        <GoogleOAuthProvider clientId="807968955333-jqhe58f70lpk01unah71s8gotjf0ikpo.apps.googleusercontent.com">
          <div className="google-btn-container">
            <GoogleLogin
              onSuccess={handleGoogleAuth}
              onError={() => {
                console.log('Login Failed')
              }}
            />
          </div>
        </GoogleOAuthProvider>
        <div className="seperator"></div>
        {status === 'login' && (
          <NavLink className="already-have-account" to={'/user/signup'}>
            Sign up for an account
          </NavLink>
        )}
        {status === 'signup' && (
          <NavLink className="already-have-account" to={'/user/login'}>
            Already have an account? Log In
          </NavLink>
        )}
      </form>
      <img src={leftHero} alt="leftHero" className="left-hero" />
      <img src={rightHero} alt="rightHero" className="right-hero" />
    </section>
  )
}
