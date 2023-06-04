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

export function RootCmp() {
  const match = useMatch('/board/:boardId')

  return (
    <div>
      <AppHeader boardId={match?.params?.boardId} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="workspace" element={<Workspace />} />
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
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
