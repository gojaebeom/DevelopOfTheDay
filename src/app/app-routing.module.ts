import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryManagerPage } from './pages/admin/manager/category-manager/category-manager.page';
import { ManagerPage } from './pages/admin/manager/manager.page';
import { PostManagerPage } from './pages/admin/manager/post-manager/post-manager.page';
import { PostRegisterPage } from './pages/admin/post-register/post-register.page';
import { CategoryPage } from './pages/category/category.page';
import { NotFoundPage } from './pages/error/not-found/not-found.page';
import { HomePage } from './pages/home/home.page';
import { PostPage } from './pages/post/post.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'categories/:id',
    component: CategoryPage
  },
  {
    path: 'posts/:id',
    component: PostPage
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then((c) => c.AdminPage),
    data: { ssr: false },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manager',
      },
      {
        path: 'manager',
        component: ManagerPage,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'posts'
          },
          {
            path: 'posts',
            component: PostManagerPage
          },
          {
            path: 'categories',
            component: CategoryManagerPage
          },
        ]
      },
      {
        path: 'post-register',
        component: PostRegisterPage
      },
      {
        path: 'post-register/:id',
        component: PostRegisterPage
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
