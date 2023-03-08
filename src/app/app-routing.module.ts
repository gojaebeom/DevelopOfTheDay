import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryManagerPage } from './pages/admin/category-manager/category-manager.page';
import { PostManagerPage } from './pages/admin/post-manager/post-manager.page';
import { PostRegisterPage } from './pages/admin/post-register/post-register.page';
import { HomePage } from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'menu',
    component: MenuPage,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    redirectTo: 'admin/category-manager',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then((c) => c.AdminPage),
    data: { ssr: false },
    children: [
      {
        path: 'category-manager',
        component: CategoryManagerPage,
        data: { ssr: false },
      },
      {
        path: 'post-manager',
        component: PostManagerPage,
        data: { ssr: false },
      },
      {
        path: 'post-register',
        component: PostRegisterPage,
        data: { ssr: false },
      },
    ],
  },
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
