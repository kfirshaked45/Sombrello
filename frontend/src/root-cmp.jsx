import React from 'react'
import { Routes, Route, useMatch } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/general/app-header'
import { AppFooter } from './cmps/general/app-footer'
import { UserDetails } from './pages/user-details'
import { BoardDetails } from './pages/board-details'
import { HomePage } from './pages/home-page'
import { Workspace } from './pages/workspace'
import { TaskDetails } from './cmps/task/task-details'
import { loadBoards } from './store/board.actions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Loader } from './cmps/general/loader'
import { LoginSignup } from './pages/login-signup'

export function RootCmp() {
  const match = useMatch('/board/:boardId')
  const boards = useSelector((state) => state.boardModule.boards)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadBoards())
  }, [dispatch])
  if (!boards) return <Loader />
  return (
    <div className="root-div">
      <AppHeader boardId={match?.params?.boardId} />
      <main className="main-root">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<Workspace />} />
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route path="user/:status" element={<LoginSignup />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="board/:boardId" element={<BoardDetails />} />
          <Route
            path="board/:boardId/:groupId/:taskId"
            element={<TaskDetails />}
          />
        </Routes>
      </main>
      {/* <AppFooter /> */}
    </div>
  )
}
