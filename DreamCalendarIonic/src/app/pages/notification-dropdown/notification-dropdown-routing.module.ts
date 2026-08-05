import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationDropdownPage } from './notification-dropdown.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationDropdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationDropdownPageRoutingModule {}
