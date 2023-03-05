import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPage } from './pages/admin/admin.page';
import { HomePage } from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'menu',
    component: MenuPage
  },
  {
    path: 'admin',
    component: AdminPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
