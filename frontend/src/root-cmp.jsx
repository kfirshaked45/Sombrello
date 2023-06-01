import React from 'react';
import { Routes, Route } from 'react-router';

import routes from './routes';

import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { UserDetails } from './pages/user-details';
import { BoardDetails } from './pages/board-details';
import { HomePage } from './pages/home-page';
import { Workspace } from './pages/workspace';
import { TaskDetails } from './cmps/task/task-details';

export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="workspace" element={<Workspace />} />
          {routes.map((route) => (
            <Route key={route.path} exact={true} element={route.component} path={route.path} />
          ))}
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="board/:boardId" element={<BoardDetails />} />
          <Route path="board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}
